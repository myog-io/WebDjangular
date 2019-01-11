
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreDynamicPageLoaderComponent } from './core-dynamic-page-loader.component';
import { CoreDynamicComponentLoaderModule } from '@webdjangular/core/dynamic-component-loader';

@NgModule({
  imports: [
    CommonModule,
    CoreDynamicComponentLoaderModule.forRoot(),
    RouterModule.forChild([

      //{path: 'themes-clean', loadChildren: '@webdjangular/themes/clean#ThemesCleanModule'},
      //{path: '**', pathMatch: 'full', component: CoreDynamicPageLoaderComponent}

    ])
  ],
  declarations: [
    CoreDynamicPageLoaderComponent
  ],
  entryComponents: [
    CoreDynamicPageLoaderComponent
  ]
})
export class CoreDynamicPageLoaderModule { }
