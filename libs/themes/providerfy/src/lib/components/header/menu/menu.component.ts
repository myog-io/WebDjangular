import {Component, OnInit} from '@angular/core';
import {ThemeProviderfyComponent} from "../../../providerfy.component";
import {NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ThemeProviderfyModalWecallyouComponent} from "../../modal/wecallyou/wecallyou.component";
import {ThemeProviderfyModalChoosecityComponent} from "../../modal/choosecity/choosecity.component";
import {promise} from "selenium-webdriver";
import {ThemeProviderfyModalAdultContentComponent} from "../../modal/adult-content/adult-content.component";
import {ThemeProviderfyModalCombateComponent} from "../../modal/combate/combate.component";
import {ThemeProviderfyModalCrackleComponent} from "../../modal/crackle/crackle.component";
import {ThemeProviderfyModalHBOComponent} from "../../modal/hbo/hbo.component";
import {ThemeProviderfyModalPacoteInternacionalComponent} from "../../modal/pacote-internacional/pacote-internacional.component";
import {ThemeProviderfyModalPlayboytvComponent} from "../../modal/playboytv/playboytv.component";
import {ThemeProviderfyModalPremiereComponent} from "../../modal/premiere/premiere.component";
import {ThemeProviderfyModalSexpriveComponent} from "../../modal/sexprive/sexprive.component";
import {ThemeProviderfyModalSexyhotComponent} from "../../modal/sexyhot/sexyhot.component";
import {ThemeProviderfyModalTelecineComponent} from "../../modal/telecine/telecine.component";
import {ThemeProviderfyModalVenusComponent} from "../../modal/venus/venus.component";
import {ThemeProviderfyModalChannelsComponent} from "../../modal/channels/channels.component";
import {CookieService} from 'ngx-cookie-service';
import {ClientUserService} from "@webdjangular/core/services";


@Component({
  selector: 'theme-providerfy-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class ThemeProviderfyHeaderMenuComponent implements OnInit {
  closeResult: string;

  constructor(private modalService: NgbModal, private cookieService: CookieService,
              private clientUserService: ClientUserService) {


  }



  openModalWeCallYou() {
    this.modalService.open(ThemeProviderfyModalWecallyouComponent);
  }


  ngOnInit() {
    const ModalTVOptions: NgbModalOptions = {
      windowClass: 'tv-channel',
    };

    //this.modalService.open(ThemeProviderfyModalWecallyouComponent);

    //this.modalService.open(ThemeProviderfyModalChannelsComponent);

    /////this.modalService.open(ThemeProviderfyModalAdultContentComponent);
    /////this.modalService.open(ThemeProviderfyModalCombateComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalCrackleComponent, ModalTVOptions );
    /////this.modalService.open(ThemeProviderfyModalHBOComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalPacoteInternacionalComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalPlayboytvComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalPremiereComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalSexpriveComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalSexyhotComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalTelecineComponent, ModalTVOptions);
    /////this.modalService.open(ThemeProviderfyModalVenusComponent, ModalTVOptions);
  }
}






