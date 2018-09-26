import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {PudimComponent} from "./pudim.component";


const routes: Routes = [
    {
        path: '',
        component: PudimComponent,
        children: [
        ],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PudimRoutingModule {
}
