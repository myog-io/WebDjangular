import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ShippingMethodModel } from "../data/models/ShippingMethod.model";
import { CatalogRuleModel } from "../data/models/CatalogRule.model";
import { CartRuleModel } from "../data/models/CartRule.model";
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
        path: 'discount',
        children: [
          {
            path: 'cart-rules',
            loadChildren: () => ScaffoldModule,
            data: {
              model: CartRuleModel,
              title: 'Cart Rules',
              path: 'store/discount/cart-rules'
            }
          },
          {
            path: 'catalog-rules',
            loadChildren: () => ScaffoldModule,
            data: {
              model: CatalogRuleModel,
              title: 'Catalog Rules',
              path: 'store/discount/catalog-rules'
            },
          },
        ],
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
