import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ScaffoldComponent } from './scaffold.component';
import { ScaffoldEditComponent } from './edit/scaffold-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ScaffoldComponent
  },

  {
    path: 'new',
    component: ScaffoldEditComponent
  },
  {
    path: 'edit/:id',
    component: ScaffoldEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaffoldRoutingModule { }
