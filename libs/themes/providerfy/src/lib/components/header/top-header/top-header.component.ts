import {Component, OnInit} from '@angular/core';
import {ThemeProviderfyComponent} from "../../../providerfy.component";
import {ThemeProviderfyModalChoosecityComponent} from "../../modal/choosecity/choosecity.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CookieService} from "ngx-cookie-service";
import {ClientUserService} from "@webdjangular/core/services";

@Component({
  selector: 'theme-providerfy-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss']
})
export class ThemeProviderfyTopHeaderComponent implements OnInit {

  private city_name: string;
  private plan_type: string;
  private plan_type_default: string = 'personal';

  constructor(private modalService: NgbModal,
              private clientUserService: ClientUserService) {

    if (this.clientUserService.clientUser.data.hasOwnProperty('city')) {
      this.city_name = this.clientUserService.clientUser.data['city']['name'];
    } else {
      this.openModalChooseCity();
    }

    if (this.clientUserService.clientUser.data.hasOwnProperty('plan_type')) {
      this.plan_type = this.clientUserService.clientUser.data['plan_type'];
    } else {
      this.plan_type = this.plan_type_default;
      this.clientUserService.clientUser.data['plan_type'] = this.plan_type_default;
      this.clientUserService.updateCookie();
    }
    console.log(this.plan_type);

  }

  ngOnInit() {
  }

  openModalChooseCity() {
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

  onChangePlanType(value: string) {
    console.log(value);
    // TODO: change plans based on the plan type (personal/business)
    this.plan_type = value;
    this.clientUserService.clientUser.data['plan_type'] = value;
    this.clientUserService.updateCookie();
  }

}
