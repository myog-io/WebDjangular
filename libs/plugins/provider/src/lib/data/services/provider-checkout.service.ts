import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import {WebAngularDataStore} from "@webdjangular/core/services";
import {ProductModel} from "../../../../../store/src/lib/data/models/Product.model";
import {JsonApiQueryData} from "angular2-jsonapi";
import { CartService } from 'libs/plugins/store/src';

@Injectable({
  providedIn: 'root',
})
export class ProviderCheckoutService {

  private skus = {
    internet: "60mb,120mb,180mb",
    tv: "hd-top,hd-plus,hd-pop,hd-super",
    telephone: "local-economico,local-ilimitado,brasil-ilimitado"
  };

  public plans = {
    internet: [],
    tv: [],
    telephone: []
  };

  public internet_plan_collapsed: boolean = false;
  public tv_plan_collapsed: boolean = false;
  public telephone_plan_collapsed: boolean = false;

  public selected_internet_plan: any = false;
  public selected_tv_plan: any = false;
  public selected_telephone_plan: any = false;

  public selected_internet_optionals = [];
  public selected_tv_optionals = [];
  public selected_telephone_optionals = [];



  constructor(private scrollToService: ScrollToService,
              private datastore: WebAngularDataStore,
              private cartService: CartService) {
    

    this.loadPlans('internet');
    this.loadPlans('tv');
    this.loadPlans('telephone');

  }

  loadPlans(type){

    let options = {};
    let order:string[] = null;
    options['page'] = { number: 1, size: 10 };
    if (this.skus[type]) {
      options['sku__in'] = this.skus[type];
      order = this.skus[type].split(",");
    }
    if (order) {
      options['page']['size'] = order.length

      this.datastore.findAll(ProductModel, options).subscribe((query: JsonApiQueryData<ProductModel>) => {
        let entries = query.getModels();
        this.plans[type] = entries;
      });
    }

  }


  toggleCollapse($event, plan) {
    if (plan == 'internet') {
      this.internet_plan_collapsed ? this.closeTabInternetPlan() : this.openTabInternetPlan();
    } else if (plan == 'tv') {
      this.tv_plan_collapsed ? this.closeTabTVPlan() : this.openTabTVPlan();
    } else if (plan == 'telephone') {
      this.telephone_plan_collapsed ? this.closeTabTelephonePlan() : this.openTabTelephonePlan();
    }
  }

  openTabInternetPlan() {
    this.internet_plan_collapsed = true;

    this.tv_plan_collapsed = false;
    this.telephone_plan_collapsed = false;

    // const scrollToConfigOptions: ScrollToConfigOptions = {
    //   target: 'collapseProviderCheckoutPlanInternet'
    // };
    // this.scrollToService.scrollTo(scrollToConfigOptions);
  }

  openTabTVPlan() {
    this.tv_plan_collapsed = true;

    this.internet_plan_collapsed = false;
    this.telephone_plan_collapsed = false;

    //const scrollToConfigOptions: ScrollToConfigOptions = {
    //  target: 'collapseProviderCheckoutPlanTV'
    //};
    //this.scrollToService.scrollTo(scrollToConfigOptions);
  }

  openTabTelephonePlan() {
    this.telephone_plan_collapsed = true;

    this.internet_plan_collapsed = false;
    this.tv_plan_collapsed = false;

    //const scrollToConfigOptions: ScrollToConfigOptions = {
    //  target: 'MyOG',
    //  duration: 300,
    //  offset: 0
    //};
    //this.scrollToService.scrollTo(scrollToConfigOptions);
  }

  closeTabInternetPlan() {
    this.internet_plan_collapsed = false;
  }

  closeTabTVPlan() {
    this.tv_plan_collapsed = false;
  }

  closeTabTelephonePlan() {
    this.telephone_plan_collapsed = false;
  }


  deselectInternetPlan() {
    this.selected_internet_plan = false;
  }

  deselectTVPlan() {
    this.selected_tv_plan = false;
  }

  deselectTelephonePlan() {
    this.selected_telephone_plan = false;
  }

  addInternetOptional() {

  }

  addTVOptional() {

  }

  addTelephoneOptional() {

  }

  removeInternetOptional() {

  }

  removeTVOptional() {

  }

  removeTelephoneOptional() {

  }



  selectInternetPlan(plan) {
    this.selected_internet_plan = plan;
  }

  selectTVPlan(plan) {
    this.selected_tv_plan = plan;
  }

  selectTelephonePlan(plan) {
    this.selected_telephone_plan = plan;
  }



  // selectPlan() {
  //   this.providerCheckout.selected_internet_plan = {
  //     name: "40 MEGA",
  //     price: "104,90",
  //   }
  // }


}
