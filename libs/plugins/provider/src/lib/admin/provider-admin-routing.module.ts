import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ScaffoldModule } from "@webdjangular/core/builder";
import { CityModel } from "../data";
import { PageRedirectModel } from "../data/models/PageRedirect.model";

const routes: Routes = [
  {
    path: 'provider',
    children: [
      {
        path: 'cities',
        loadChildren: () => ScaffoldModule,
        data: {
          model: CityModel,
          title: 'Cities',
          path: 'provider/cities'
        }
      },
      {
        path: 'page-redirect',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageRedirectModel,
          title: 'Redirects',
          path: 'provider/page-redirect'
        }
      },
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluginProviderAdminRoutingModule {
}
