import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { StoreProductComponent } from "./product/store-product-admin.component";
import { ShippingMethodModel } from "../data/models/ShippingMethod.model";
import { SaleModel } from "../data/models/Sale.model";
import { VoucherModel } from "../data/models/Voucher.model";
import { OrderModel } from "../data/models/Order.model";
import { CategoryModel } from "../data/models/Category.model";
import { ProductTypeModel } from "../data/models/ProductType.model";
import { ProductModel } from "../data/models/Product.model";
import { ScaffoldModule } from "@webdjangular/core/builder";

const routes: Routes = [
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

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreAdminRoutingModule {
}
