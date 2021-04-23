import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonComponent } from './ofmodules/common/common.component';
import { AppCommonModule } from './ofmodules/common/common.module';
import { AppRouterModule } from './router-config/index';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, CommonComponent, HeaderComponent],
  imports: [
    RouterModule,
    AppRouterModule,
    AppCommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzModalModule,
    ReactiveFormsModule,
    NzDropDownModule,
    NzAvatarModule,
    NzBadgeModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
