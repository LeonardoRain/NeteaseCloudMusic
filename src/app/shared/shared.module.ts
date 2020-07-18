import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';

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
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  SearchOutline,
  DownOutline,
  MobileOutline,
  UserAddOutline,
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    NzIconModule.forRoot(icons),
  ],
  exports: [CommonModule, NgZorroAntdModule, FormsModule],
})
export class SharedModule {}
