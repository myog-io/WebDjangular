import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ThemeIspwebbyModalWecallyouComponent } from '../../modal/wecallyou/wecallyou.component';
import { MenuItemModel } from '@core/cms/src/lib/models';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { Subscription, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'theme-ispwebby-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThemeIspwebbyHeaderMenuComponent implements OnInit {
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
  private url_regex = new RegExp(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/);
  @Input() menu_id: string;
  private sub: Subscription;
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private datastore: WebAngularDataStore
  ) { }

  action($event, item: any) {
    if (!this.url_regex.test(item.url)) {
      $event.preventDefault();
      if (item.click) {
        // Run item.click
      } else {
        this.router.navigateByUrl(item.fragment ? `${item.url}#${item.fragment}` : item.url, { fragment: item.fragment });
      }
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    }
  }

  openModalWeCallYou() {
    this.modalService.open(ThemeIspwebbyModalWecallyouComponent);
  }

  ngOnInit() {
    this.items = this.datastore
      .findAll(
        MenuItemModel,
        {
          include: 'children,parent',
          parent__isnull: true,
          menu: this.menu_id,
          page: { size: 100 }
        },
        new HttpHeaders({ Authorizantion: 'none' })
      )
      .map((query, index) => {
        return query.getModels();
      });
    //const ModalTVOptions: NgbModalOptions = {
    //  windowClass: 'tv-channel',
    //};
  }
}
