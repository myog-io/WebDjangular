import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CoreDynamicPageLoaderResolver} from "@core/dynamic-page-loader/src/lib/core-dynamic-page-loader.resolver";


const routes: Routes = [

    /*
    {
      path: '',
      loadChildren: () => CoreDynamicPageLoaderModule
    }*/
    {
        path: '',
        loadChildren: "@themes/providerfy/src/lib/providerfy.module.ts#ThemeProviderfyModule",
        resolve: {page: CoreDynamicPageLoaderResolver}
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled', anchorScrolling: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
