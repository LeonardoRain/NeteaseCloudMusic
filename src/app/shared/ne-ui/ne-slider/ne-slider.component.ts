import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
  Input,
  Inject,
  ChangeDetectorRef,
  OnDestroy,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { fromEvent, merge, Observable, Subscription } from 'rxjs';
import {
  filter,
  tap,
  pluck,
  map,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/internal/operators';
import { SliderEventObserverConfig, sliderValue } from './ne-slider-types';
import { DOCUMENT } from '@angular/common';
import { sliderEvent, getElementOffset } from './ne-slider-helper';
import { inArray } from '../../../utils/array';
import { limitNumberInRange, getPercent } from '../../../utils/number';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-ne-slider',
  templateUrl: './ne-slider.component.html',
  styleUrls: ['./ne-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NeSliderComponent),
      multi: true,
    },
  ],
})
export class NeSliderComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() neVertical = false;
  @Input() neMin = 0;
  @Input() neMax = 100;
  @Input() bufferOffset: sliderValue = 0;

  @Output() neOnAfterChange = new EventEmitter<sliderValue>();

  private sliderDom: HTMLDivElement;

  @ViewChild('neSlider', { static: true }) private neSlider: ElementRef;

  private dragStart$: Observable<number>;
  private dragMove$: Observable<number>;
  private dragEnd$: Observable<Event>;
  private dragStart_: Subscription | null;
  private dragMove_: Subscription | null;
  private dragEnd_: Subscription | null;

  private isDragging = false;

  value: sliderValue = null;
  offset: sliderValue = null;

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sliderDom = this.neSlider.nativeElement;
    this.createDraggingObservables();
    this.subscribeDrag(['start']);
  }

  ngOnDestroy(): void {
    this.unSubscribeDrag();
  }

  private onValueChange(value: sliderValue): void {}

  private onTouched(): void {}

  writeValue(value: sliderValue): void {
    this.setValue(value, true);
  }

  registerOnChange(fn: (value: sliderValue) => void): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  private createDraggingObservables() {
    const orientField = this.neVertical ? 'pageY' : 'pageX';
    const mouse: SliderEventObserverConfig = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filt: (e: MouseEvent) => e instanceof MouseEvent,
      pluckKey: [orientField],
    };
    const touch: SliderEventObserverConfig = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filt: (e: TouchEvent) => e instanceof TouchEvent,
      pluckKey: ['touchs', '0', orientField],
    };

    [mouse, touch].forEach((source) => {
      const { start, move, end, filt, pluckKey } = source;

      source.startPlucked$ = fromEvent(this.sliderDom, start).pipe(
        filter(filt),
        tap(sliderEvent),
        pluck(...pluckKey),
        map((position: number) => this.findCloseValue(position))
      );

      source.end$ = fromEvent(this.doc, end);

      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filt),
        tap(sliderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position: number) => this.findCloseValue(position)),
        takeUntil(source.end$)
      );
    });

    this.dragStart$ = merge(mouse.startPlucked$, touch.startPlucked$);
    this.dragMove$ = merge(mouse.moveResolved$, touch.moveResolved$);
    this.dragEnd$ = merge(mouse.end$, touch.end$);
  }

  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(this.onDragStart.bind(this));
    }
    if (inArray(events, 'move') && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  private unSubscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value);
  }

  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value);
      this.cdr.markForCheck();
    }
  }

  private onDragEnd() {
    this.neOnAfterChange.emit(this.value);
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }

  private setValue(value: sliderValue, needCheck = false) {
    if (needCheck) {
      if (this.isDragging) return;
      this.value = this.formatValue(value);
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value, value)) {
      this.value = value;
      this.updateTrackAndHandles();
      this.onValueChange(this.value);
    }
  }

  private formatValue(value: sliderValue): sliderValue {
    let res = value;
    if (this.assertValueValid(value)) {
      res = this.neMin;
    } else {
      res = limitNumberInRange(value, this.neMin, this.neMax);
    }
    return res;
  }

  private assertValueValid(value: sliderValue): boolean {
    return isNaN(typeof value !== 'number' ? parseFloat(value) : value);
  }

  private valuesEqual(valA: sliderValue, valB: sliderValue): boolean {
    if (typeof valA !== typeof valB) {
      return false;
    } else {
      return valA === valB;
    }
  }

  private updateTrackAndHandles() {
    this.offset = this.getValueToOffset(this.value);
    this.cdr.markForCheck();
  }

  private getValueToOffset(value: sliderValue): sliderValue {
    return getPercent(this.neMin, this.neMax, value);
  }

  private toggleDragMoving(movable: boolean) {
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unSubscribeDrag(['move', 'end']);
    }
  }

  private findCloseValue(position: number): number {
    const sliderLength = this.getSliderLength();
    const sliderStart = this.getSliderPosition();
    const ratio = limitNumberInRange(
      (position - sliderStart) / sliderLength,
      0,
      1
    );
    const ratioTrue = this.neVertical ? 1 - ratio : ratio;
    return ratioTrue * (this.neMax - this.neMin) + this.neMin;
  }

  private getSliderLength(): number {
    return this.neVertical
      ? this.sliderDom.clientHeight
      : this.sliderDom.clientWidth;
  }

  private getSliderPosition(): number {
    const offset = getElementOffset(this.sliderDom);
    return this.neVertical ? offset.top : offset.left;
  }
}
