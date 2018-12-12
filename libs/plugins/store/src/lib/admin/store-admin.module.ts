import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { StoreAdminRoutingModule } from './store-admin-routing.module';
import { StoreProductComponent } from './product/store-product-admin.component';
import { NbCardModule, NbButtonModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { EditProductComponent } from './product/edit/edit-product.component';
import { FormsModule } from '@webdjangular/core/forms';
import { ReactiveFormsModule } from '@angular/forms';



const MODULES = [
  CommonModule,
  StoreAdminRoutingModule,
  NbCardModule,
  Ng2SmartTableModule,
  ReactiveFormsModule,
  NbButtonModule,

];

const COMPONENTS = [
  StoreProductComponent,
  EditProductComponent

];


@NgModule({
  imports: [...MODULES],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ],
  declarations: [...COMPONENTS]
})
export class PluginStoreAdminModule {
}
