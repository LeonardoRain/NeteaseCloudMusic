import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

import { NeUiModule } from './ne-ui/ne-ui.module';

import { IconDefinition } from '@ant-design/icons-angular';
import { NzIconModule } from 'ng-zorro-antd/icon';
// 引入你需要的图标，比如你需要 fill 主题的 AccountBook Alert 和 outline 主题的 Alert，推荐 ✔️
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
  SearchOutline,
  DownOutline,
  MobileOutline,
  UserAddOutline,
  ArrowRightOutline,
} from '@ant-design/icons-angular/icons';
import { PlayCountPipe } from './play-count.pipe';

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  SearchOutline,
  DownOutline,
  MobileOutline,
  UserAddOutline,
  ArrowRightOutline,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    NzIconModule.forRoot(icons),
    NeUiModule,
  ],
  exports: [CommonModule, NgZorroAntdModule, FormsModule, NeUiModule],
})
export class SharedModule {}
