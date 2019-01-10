import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal, NgbModalOptions} from "@ng-bootstrap/ng-bootstrap";
import {ThemeProviderfyModalWecallyouComponent} from "../../modal/wecallyou/wecallyou.component";
import {ThemeProviderfyModalChannelsComponent} from "../../modal/channels/channels.component";
import {CookieService} from 'ngx-cookie-service';
import {ClientUserService} from "@webdjangular/core/services";


@Component({
  selector: 'theme-providerfy-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeProviderfyHeaderMenuComponent implements OnInit {
  closeResult: string;
  isNavbarCollapsed: boolean = false;
  //name
  //url
  //alt
  //target
  //position
  //parent
  //menu

  items: any[] = [

    {
      name: 'Internet',
      children: [
        {name: 'Fibra Óptica', url: '/planos-de-internet', fragment: "fibra", icon: "icon icon-fiber"},
        {name: 'Via Rádio', url: '/planos-de-internet', fragment: "radio", icon: "icon icon-radio"}
      ]
    },
    {
      name: 'Telefone',
      url: '/planos-de-telefone'
    },
    {
      name: 'HDTV',
      children: [
        {name: 'Planos', url: '/planos-de-tv', icon: 'icon icon-plans'},
        {name: 'Ponto Extra', url: '/Ponto Extra', icon: 'icon icon-extra-point'},
      ]
    },
    {
      name: 'Combo',
      url: '/combos',
    },
    {
      name: 'Cobertura',
      url: '/cobertura',
    },
    {
      name: 'Contato',
      children: [
        {name: 'Chat Online', url: '/contato', icon: 'icon icon-chat'},
        {name: 'Formuário de Contato', url: '/contato', icon: 'icon icon-form'},
        {name: 'Escritórios', url: '/contato', icon: 'icon icon-offices'},
        {name: 'Emails', url: '/contato', icon: 'icon icon-email'},
        {name: 'Telefones', url: '/contato', icon: 'icon icon-telephone'},
      ]
    },
    {
      name: 'Assine Já',
      class: 'featured btn-enroll-now',
      children: [
        {name: 'Planos', url: '/assine'},
        {name: 'Assine Pelo Chat', url: '/assine'},
        {name: 'Nós ligamos pra você', click: 'openModalWeCallYou()'},
      ]
    }
  ];

  constructor(private modalService: NgbModal, private cookieService: CookieService,
              private clientUserService: ClientUserService) {


  }


  action(item: any) {
    if (item.click) {
      // Run item.click
    }
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  openModalWeCallYou() {
    this.modalService.open(ThemeProviderfyModalWecallyouComponent);

  }


  ngOnInit() {
    const ModalTVOptions: NgbModalOptions = {
      windowClass: 'tv-channel',
    };

    //this.modalService.open(ThemeProviderfyModalWecallyouComponent);

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






