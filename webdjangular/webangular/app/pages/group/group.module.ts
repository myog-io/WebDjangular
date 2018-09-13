import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';

import { GroupComponent } from './group.component';
import { GroupEditComponent } from './edit/group-edit.component';
import { GroupRoutingModule } from './group-routing.module';



const COMPONENTS = [
	GroupComponent,
  GroupEditComponent,
];

@NgModule({
  imports: [
  	ThemeModule,
    GroupRoutingModule,
    Ng2SmartTableModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
})
export class GroupModule {

}

