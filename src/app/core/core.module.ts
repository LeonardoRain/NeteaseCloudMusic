import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PagesModule } from '../pages/pages.module';
import { ServicesModule } from '../services/services.module';
import { SharedModule } from '../shared/shared.module';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd/i18n';

registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PagesModule,
    ServicesModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [SharedModule, AppRoutingModule],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被 AppModule 引入');
    }
  }
}
