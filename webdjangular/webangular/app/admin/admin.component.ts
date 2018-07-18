import {Component, ViewEncapsulation} from '@angular/core';

import {MENU_ITEMS} from './admin-menu';

@Component({
    selector: 'ngx-admin',
    styleUrls: ["./admin.component.scss"],
    templateUrl: './admin.component.html',

})
export class AdminComponent{

    menu = MENU_ITEMS;

}
