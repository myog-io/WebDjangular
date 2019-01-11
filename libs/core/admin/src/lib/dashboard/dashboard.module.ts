import { NgModule } from '@angular/core';

import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '@webdjangular/core/admin-theme';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    ThemeModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
