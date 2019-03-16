import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CityModel } from '../data';
import { PageRedirectModel } from '../data/models/PageRedirect.model';
import { CondoModel } from '../data/models/Condo.model';
import { ResellerModel } from '../data/models/Reseller.model';
import { ChannelModel } from '../data/models/Channel.model';
import { ScaffoldModule } from '@core/builder/src/lib/scaffold/scaffold.module';
import { PlanTypeModel } from '../data/models/PlanType.model';
import { OrderModel } from '@plugins/store/src/lib/data/models/Order.model';
import { PluginProviderAdminOrdersComponent } from '@plugins/provider/src/lib/admin/components/orders.component';
import { ScaffoldComponent } from '@core/builder/src/lib/scaffold/scaffold.component';

const routes: Routes = [
  {
    path: 'provider',
    children: [
      {
        path: 'cities',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: CityModel,
          title: 'Cities',
          path: 'provider/cities'
        }
      },
      {
        path: 'page-redirect',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PageRedirectModel,
          title: 'Redirects',
          path: 'provider/page-redirect'
        }
      },
      {
        path: 'condo',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: CondoModel,
          title: 'Condos',
          path: 'provider/condo'
        }
      },
      {
        path: 'plan-type',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: PlanTypeModel,
          title: 'Plan Types',
          path: 'provider/plan-type'
        }
      },
      {
        path: 'order',
        component: ScaffoldComponent,
        data: {
          model: OrderModel,
          title: 'Orders',
          path: 'provider/order'
        }
      },
      {
        path: 'order/edit/:id',
        component: PluginProviderAdminOrdersComponent,
        data: {
          model: OrderModel,
          title: 'Orders',
          path: 'provider/order'
        }
      },
      {
        path: 'reseller',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: ResellerModel,
          title: 'Resellers',
          path: 'provider/reseller'
        }
      },
      {
        path: 'channel',
        loadChildren:
          '@core/builder/src/lib/scaffold/scaffold.module#ScaffoldModule',
        data: {
          model: ChannelModel,
          title: 'Channels',
          path: 'provider/channel'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PluginProviderAdminRoutingModule {}
