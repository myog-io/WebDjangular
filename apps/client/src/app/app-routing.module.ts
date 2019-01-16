import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

    /*
    {
      path: '',
      loadChildren: () => CoreDynamicPageLoaderModule
    }*/
    {
        path: '',
        loadChildren: "@themes/providerfy/src/lib/providerfy.module#ThemeProviderfyModule"
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {initialNavigation: 'enabled', anchorScrolling: 'enabled'})],
    exports: [RouterModule]
})
export class AppRoutingModule { }