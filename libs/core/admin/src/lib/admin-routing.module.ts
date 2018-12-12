import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageModel } from '@webdjangular/core/cms-models';
import { FormModel } from '@webdjangular/core/forms-models'


import { PermissionGuard } from '@webdjangular/core/services';
import { ThemeModel, CoreWebsiteModel } from '@webdjangular/core/data-models';
import { PluginModel } from '@webdjangular/core/data-models';
import { ScaffoldModule } from './scaffold/scaffold.module';
import { CoreMediaModule } from '@webdjangular/core/media';

import { CoreConfigGroupModule } from './core-config-group/core-config-group.module';
import { CityModel } from '@webdjangular/plugins/provider-data';
import { ProductModel } from "../../../../plugins/store/src/lib/data/models/Product.model";
import { OrderModel } from "../../../../plugins/store/src/lib/data/models/Order.model";
import { VoucherModel } from "../../../../plugins/store/src/lib/data/models/Voucher.model";
import { SaleModel } from "../../../../plugins/store/src/lib/data/models/Sale.model";
import { ShippingMethodModel } from "../../../../plugins/store/src/lib/data/models/ShippingMethod.model";
import { CategoryModel } from "../../../../plugins/store/src/lib/data/models/Category.model";
import { PageRedirectModel } from 'libs/plugins/provider/src/lib/data/models/PageRedirect.model';
import { UserModel, GroupModel } from '@webdjangular/core/users-models';
import {ProductTypeModel} from "../../../../plugins/store/src/lib/data/models/ProductType.model";


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'user',
        loadChildren: () => ScaffoldModule,
        data: {
          model: UserModel,
          title: "Users",
          path: 'user'
        }
      },
      {
        path: 'group',
        loadChildren: () => ScaffoldModule,
        data: {
          model: GroupModel,
          title: "Groups",
          path: 'group'
        }
      },
      {
        path: 'media',
        loadChildren: () => CoreMediaModule,
      },
      {
        path: 'pages',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PageModel,
          title: "Page",
          path: 'pages'
        }
      },
      {
        path: 'forms',
        loadChildren: () => ScaffoldModule,
        data: {
          model: FormModel,
          title: "Form",
          path: 'forms'
        }
      },
      {
        path: 'core_themes',
        loadChildren: () => ScaffoldModule,
        data: {
          model: ThemeModel,
          title: "Theme",
          path: 'core_themes'
        }
      },
      {
        path: 'core_plugins',
        loadChildren: () => ScaffoldModule,
        data: {
          model: PluginModel,
          title: "Plugin",
          path: 'core_plugins'
        }
      },
      {
        path: 'core_websites',
        loadChildren: () => ScaffoldModule,
        data: {
          model: CoreWebsiteModel,
          title: 'Websites',
          path: 'core_websites'
        }
      },
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

      {
        path: 'store',
        children: [
          {
            path: 'catalog',
            children: [
              {
                path: 'products',
                loadChildren: () => ScaffoldModule,
                data: {
                  model: ProductModel,
                  title: 'Products',
                  path: 'store/catalog/products'
                }
              },
              {
                path: 'categories',
                loadChildren: () => ScaffoldModule,
                data: {
                  model: CategoryModel,
                  title: 'Categories',
                  path: 'store/catalog/categories'
                }
              },
              {
                path: 'product-types',
                loadChildren: () => ScaffoldModule,
                data: {
                  model: ProductTypeModel,
                  title: 'Product Type',
                  path: 'store/catalog/product-types'
                }
              },
            ]
          },
          {
            path: 'orders',
            loadChildren: () => ScaffoldModule,
            data: {
              model: OrderModel,
              title: 'Orders',
              path: 'store/orders'
            }
          },
          {
            path: 'vouchers',
            loadChildren: () => ScaffoldModule,
            data: {
              model: VoucherModel,
              title: 'Vouchers',
              path: 'store/vouchers'
            }
          },
          {
            path: 'sales',
            loadChildren: () => ScaffoldModule,
            data: {
              model: SaleModel,
              title: 'Sales',
              path: 'store/sales'
            },
          },
          {
            path: 'shipping-methods',
            loadChildren: () => ScaffoldModule,
            data: {
              model: ShippingMethodModel,
              title: 'Shipping methods',
              path: 'store/shipping-methods'
            }
          },
        ]
      },
      {
        path: 'core_config_group/:id',
        loadChildren: () => CoreConfigGroupModule
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
