import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CityModel } from "../data";
import { PageRedirectModel } from "../data/models/PageRedirect.model";
import { CondoModel } from "../data/models/Condo.model";
import { ResellerModel } from "../data/models/Reseller.model";
import { ChannelModel } from "../data/models/Channel.model";
import { ScaffoldModule } from "@core/builder/src/lib/scaffold/scaffold.module";

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
      {
        path: 'condo',
        loadChildren: () => ScaffoldModule,
        data: {
          model: CondoModel,
          title: 'Condos',
          path: 'provider/condo'
        }
      },
      {
        path: 'reseller',
        loadChildren: () => ScaffoldModule,
        data: {
          model: ResellerModel,
          title: 'Resellers',
          path: 'provider/page-redirect'
        }
      },
      {
        path: 'channel',
        loadChildren: () => ScaffoldModule,
        data: {
          model: ChannelModel,
          title: 'Channels',
          path: 'provider/channel'
        }
      }
    ]
  },

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluginProviderAdminRoutingModule {
}
