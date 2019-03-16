import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { DashboardComponent } from './dashboard.component';
import { ThemeModule } from '../@theme';

@NgModule({
  imports: [ThemeModule, NgxEchartsModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
