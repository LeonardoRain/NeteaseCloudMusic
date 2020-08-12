import {
  Component,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/internal/operators';

@Component({
  selector: 'app-ne-slider',
  templateUrl: './ne-slider.component.html',
  styleUrls: ['./ne-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class NeSliderComponent implements OnInit {
  private sliderDom: HTMLDivElement;

  @ViewChild('neSlider', { static: true }) private neSlider: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.sliderDom = this.neSlider.nativeElement;
    this.createDraggingObservables();
  }

  private createDraggingObservables() {
    const mouse = {
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter: (e: MouseEvent) => e instanceof MouseEvent,
    };
    const touch = {
      start: 'touchstart',
      move: 'touchmove',
      end: 'touchend',
      filter: (e: TouchEvent) => e instanceof TouchEvent,
    };

    [mouse, touch].forEach((source) => {
      const { start, move, end, filter } = source;
      fromEvent(this.sliderDom, start).pipe(
        // filter(filter),
        tap((e: Event) => {
          e.stopPropagation();
          e.preventDefault();
        })
      );
    });
  }
}
