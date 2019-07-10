import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuBuilderComponent } from './menu_builder.component';

const routes: Routes = [
  {
    path: '',
    component: MenuBuilderComponent,
    children: [
      {
        path: '',
        component: MenuBuilderComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuBuilderRoutingModule {}
