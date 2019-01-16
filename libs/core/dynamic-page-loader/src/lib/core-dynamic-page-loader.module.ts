
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CoreDynamicPageLoaderComponent } from './core-dynamic-page-loader.component';
import { CoreDynamicComponentLoaderModule } from '@core/dynamic-component-loader/src/lib/core-dynamic-component-loader.module';


@NgModule({
  imports: [
    CommonModule,
    CoreDynamicComponentLoaderModule.forRoot(),
    RouterModule.forChild([

      //{path: 'themes-clean', loadChildren: '@themes/clean#ThemesCleanModule'},
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
