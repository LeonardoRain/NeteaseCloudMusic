import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NePlayerComponent } from './ne-player.component';
import { NeSliderModule } from '../ne-slider/ne-slider.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [NePlayerComponent],
  imports: [CommonModule, FormsModule, NeSliderModule],
  exports: [NePlayerComponent],
})
export class NePlayerModule {}
