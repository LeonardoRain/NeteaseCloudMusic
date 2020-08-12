import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeSliderComponent } from './ne-slider.component';
import { NeSliderTrackComponent } from './ne-slider-track.component';
import { NeSliderHandleComponent } from './ne-slider-handle.component';

@NgModule({
  declarations: [
    NeSliderComponent,
    NeSliderTrackComponent,
    NeSliderHandleComponent,
  ],
  imports: [CommonModule],
  exports: [NeSliderComponent],
})
export class NeSliderModule {}
