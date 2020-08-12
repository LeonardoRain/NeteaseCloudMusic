import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NeSlierStyle } from './ne-slider-types';

@Component({
  selector: 'app-ne-slider-handle',
  template: `<div class="ne-slider-handle" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeSliderHandleComponent implements OnInit, OnChanges {
  @Input() neVertical = false;
  @Input() neOffset: number;

  style: NeSlierStyle = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['neOffset']) {
      this.style[this.neVertical ? 'bottom' : 'left'] = this.neOffset + '%';
    }
  }
}
