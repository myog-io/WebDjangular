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

  constructor(private modalService: NgbModal,
              private clientUserService: ClientUserService) {

    if (this.clientUserService.clientUser.data.hasOwnProperty('city')) {
      this.city_name = this.city_name = this.clientUserService.clientUser.data['city']['name'];
    } else {
      this.openModalChooseCity();
    }
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

}
