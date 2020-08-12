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
  selector: 'app-ne-slider-track',
  template: `<div class="ne-slider-track" [ngStyle]="style"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NeSliderTrackComponent implements OnInit, OnChanges {
  @Input() neVertical = false;
  @Input() neLength: number;

  style: NeSlierStyle = {};

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['neLength']) {
      if (this.neVertical) {
        this.style.height = this.neLength + '%';
        this.style.left = null;
        this.style.width = null;
      } else {
        this.style.width = this.neLength + '%';
        this.style.bottom = null;
        this.style.height = null;
      }
    }
  }
}
