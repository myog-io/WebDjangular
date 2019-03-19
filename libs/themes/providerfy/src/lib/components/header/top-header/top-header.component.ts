import {
  Component,
  OnInit,
  PLATFORM_ID,
  Inject,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';

import { ThemeProviderfyModalChoosecityComponent } from '../../modal/choosecity/choosecity.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'theme-providerfy-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeProviderfyTopHeaderComponent implements AfterViewInit {
  testBrowser: boolean;
  city_name: string;
  plan_type: string;
  plan_type_default: string = 'personal';

  constructor(
    private modalService: NgbModal,
    private clientUserService: ClientUserService,
    @Inject(PLATFORM_ID) platformId: string
  ) {
    this.testBrowser = isPlatformBrowser(platformId);

    if (this.clientUserService.clientUser.data.hasOwnProperty('plan_type')) {
      this.plan_type = this.clientUserService.clientUser.data['plan_type'];
    } else {
      this.plan_type = this.plan_type_default;
      this.clientUserService.clientUser.data[
        'plan_type'
      ] = this.plan_type_default;
      this.clientUserService.updateCookie();
    }
  }


  ngAfterViewInit() {
    setTimeout(() => {
      if (this.clientUserService.clientUser.data.hasOwnProperty('city')) {
        this.city_name = this.clientUserService.clientUser.data['city']['name'];
      } else {
        this.openModalChooseCity();
      }
    });
  }

  openModalChooseCity() {
    if (this.testBrowser) {
      this.modalService.open(ThemeProviderfyModalChoosecityComponent, {
        centered: true,
        backdropClass: 'backdrop-choosecity',
        windowClass: 'choosecity',
        keyboard: false, // ESC can NOT close the model
        beforeDismiss: () => {
          return false;
        }
      });
    }
  }

  onChangePlanType(value: string) {
    // TODO: change plans based on the plan type (personal/business)
    this.plan_type = value;
    this.clientUserService.clientUser.data['plan_type'] = value;
    this.clientUserService.updateCookie();
  }
}
