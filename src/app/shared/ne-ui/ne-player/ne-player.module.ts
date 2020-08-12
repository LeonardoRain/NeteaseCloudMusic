import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NePlayerComponent } from './ne-player.component';
import { NeSliderModule } from '../ne-slider/ne-slider.module';

@NgModule({
  declarations: [NePlayerComponent],
  imports: [CommonModule, NeSliderModule],
  exports: [NePlayerComponent],
})
export class NePlayerModule {}
