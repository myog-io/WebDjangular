import {Injectable} from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';
import {CartService} from "../../../../../store/src/lib/data/services/cart.service";

@Injectable({
  providedIn: 'root',
})
export class ProviderCheckoutService {

  public internet_plan_collapsed: boolean = false;
  public tv_plan_collapsed: boolean = false;
  public telephone_plan_collapsed: boolean = false;

  public selected_internet_plan: any = false;
  public selected_tv_plan: any = false;
  public selected_telephone_plan: any = false;

  public selected_internet_optionals = [];
  public selected_tv_optionals = [];
  public selected_telephone_optionals = [];



  constructor(private scrollToService: ScrollToService) {

  }

  toggleCollapse($event, plan) {
    if(plan == 'internet') {
      this.internet_plan_collapsed ? this.closeTabInternetPlan() : this.openTabInternetPlan();
    } else if(plan == 'tv') {
      this.tv_plan_collapsed ? this.closeTabTVPlan() : this.openTabTVPlan();
    } else if(plan == 'telephone') {
      this.telephone_plan_collapsed ? this.closeTabTelephonePlan() : this.openTabTelephonePlan();
    }
  }

  openTabInternetPlan(){
    this.internet_plan_collapsed = true;

    this.tv_plan_collapsed = false;
    this.telephone_plan_collapsed = false;

    // const scrollToConfigOptions: ScrollToConfigOptions = {
    //   target: 'collapseProviderCheckoutPlanInternet'
    // };
    // this.scrollToService.scrollTo(scrollToConfigOptions);
  }

  openTabTVPlan(){
    this.tv_plan_collapsed = true;

    this.internet_plan_collapsed = false;
    this.telephone_plan_collapsed = false;

    //const scrollToConfigOptions: ScrollToConfigOptions = {
    //  target: 'collapseProviderCheckoutPlanTV'
    //};
    //this.scrollToService.scrollTo(scrollToConfigOptions);
  }

  openTabTelephonePlan(){
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










}
