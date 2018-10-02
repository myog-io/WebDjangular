
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemesCleanComponent } from './themes-clean.component';
import { ThemesCleanFooterComponent } from './components/';
import { ThemesCleanHeaderComponent } from './components/';
import { CoreDynamicLazyLoadModule } from '@webdjangular/core/dynamic-component-loader';

const COMPONENTS = [
  ThemesCleanComponent,
  ThemesCleanFooterComponent,
  ThemesCleanHeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    CoreDynamicLazyLoadModule.forChild({component:ThemesCleanComponent}),
    RouterModule.forChild([
      {
        path: '',
        component: ThemesCleanComponent
      }
    ])
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
