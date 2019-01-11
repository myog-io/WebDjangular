
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemesCleanComponent } from './themes-clean.component';
import { ThemesCleanFooterComponent } from './components/';
import { ThemesCleanHeaderComponent } from './components/';

const COMPONENTS = [
  ThemesCleanComponent,
  ThemesCleanFooterComponent,
  ThemesCleanHeaderComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([])
  ],
  exports: [
    ...COMPONENTS,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class ThemesCleanModule {

}
