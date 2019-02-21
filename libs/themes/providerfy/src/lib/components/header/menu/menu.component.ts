import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ThemeProviderfyModalWecallyouComponent } from '../../modal/wecallyou/wecallyou.component';
import { MenuItemModel } from '@core/cms/src/lib/models';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { Subscription, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


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
  items: Observable<MenuItemModel[]>;
  /*
  items: any[] = [

    {
      name: 'Internet',
      children: [
        { name: 'Fibra Óptica', url: '/planos-de-internet', fragment: "fibra", icon: "icon icon-fiber" },
        { name: 'Via Rádio', url: '/planos-de-internet', fragment: "radio", icon: "icon icon-radio" }
      ]
    },
    {
      name: 'Telefone',
      url: '/planos-de-telefone'
    },
    {
      name: 'HDTV',
      children: [
        { name: 'Planos', url: '/planos-de-tv', icon: 'icon icon-plans' },
        { name: 'Ponto Extra', url: '/Ponto Extra', icon: 'icon icon-extra-point' },
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
        { name: 'Chat Online', url: '/contato', icon: 'icon icon-chat' },
        { name: 'Formuário de Contato', url: '/contato', icon: 'icon icon-form' },
        { name: 'Escritórios', url: '/contato', icon: 'icon icon-offices' },
        { name: 'Emails', url: '/contato', icon: 'icon icon-email' },
        { name: 'Telefones', url: '/contato', icon: 'icon icon-telephone' },
      ]
    },
    {
      name: 'Assine Já',
      class: 'featured btn-enroll-now',
      children: [
        { name: 'Planos', url: '/assine' },
        { name: 'Assine Pelo Chat', url: '/assine' },
        { name: 'Nós ligamos pra você', click: 'openModalWeCallYou()' },
      ]
    }
    
  ];
  */
  @Input() menu_id: string;
  private sub: Subscription;
  constructor(
    private modalService: NgbModal,
    private datastore: WebAngularDataStore,
  ) {


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
    this.items = this.datastore.findAll(
      MenuItemModel,
      { include: 'children,parent', parent__isnull: true, menu: this.menu_id, page: { size: 100 } },
      new HttpHeaders({ 'Authorizantion': 'none' }),
    ).map(
      (query, index) => {
        return query.getModels();
      }
    )
    //const ModalTVOptions: NgbModalOptions = {
    //  windowClass: 'tv-channel',
    //};


  }
}






