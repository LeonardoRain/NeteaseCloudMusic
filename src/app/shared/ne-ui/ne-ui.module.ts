import { NgModule } from '@angular/core';
import { SingleSheetComponent } from './single-sheet/single-sheet.component';
import { PlayCountPipe } from '../play-count.pipe';
import { NePlayerModule } from './ne-player/ne-player.module';

@NgModule({
  declarations: [SingleSheetComponent, PlayCountPipe],
  imports: [NePlayerModule],
  exports: [SingleSheetComponent, PlayCountPipe, NePlayerModule],
})
export class NeUiModule {}
