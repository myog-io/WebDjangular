import {Inject, Injectable} from '@angular/core';
import {JsonApiQueryData} from "angular2-jsonapi";
import {DOCUMENT} from '@angular/common';
import {PageScrollInstance, PageScrollService} from 'ngx-page-scroll';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebAngularDataStore} from '@core/services/src/lib/WebAngularDataStore.service';
import {CartService} from '@plugins/store/src/lib/data/services/cart.service';
import {ProductModel} from '@plugins/store/src/lib/data/models/Product.model';
import {CityModel} from '../models/City.model';
import {ClientUserService} from '@core/services/src/lib/client-user.service';
import {AddressModel} from '@core/data/src/lib/models';
import {HttpHeaders} from '@angular/common/http';
import {Observable, Subscriber} from 'rxjs';
import {CondoModel} from '../models/Condo.model';
import "rxjs-compat/add/operator/map";


export enum ProviderCheckoutSteps {
  beforeCheckout = 0,
  buildingPlan = 1,
  wizard = 2
}

@Injectable({
  providedIn: 'root',
})
export class ProviderCheckoutService {
  public address: AddressModel;
  public city: CityModel;

  //private skus = {
  //  internet: ["60mb", "120mb", "180mb"],
  //  tv: ["hd-top", "hd-plus", "hd-pop", "hd-super"],
  //  telephone: ["local-economico", "local-ilimitado", "brasil-ilimitado"]
  //};

  private sku_extra_tv_decoder = "aluguel-ponto-adicional";

  //private skus_optionals = {
  //  internet: ["ip-fixo", "aluguel-roteador", "pacote-premium-plus"],
  //  tv: [
  //    "telecine-light", "telecine-full", "telecine-full-hd", "hbo-hd", "internacionais", "premiere-basico",
  //    "premiere-total", "combate", "sexhot-playboy-tv", "playboy-tv-venus", "venus-sexhot", "sexhot", "playboy-tv",
  //    "venus", "sexprive",
  //    this.sku_extra_tv_decoder
  //  ],
  //  telephone: ["movel-local-50", "movel-local-100", "movel-local-500",
  //    "movel-brasil-50", "movel-brasil-100", "movel-brasil-500", "linha-extra"]
  //};

  public loading_cart: boolean = true;

  private current_step: ProviderCheckoutSteps = ProviderCheckoutSteps.beforeCheckout;
  //private current_step: ProviderCheckoutSteps = ProviderCheckoutSteps.buildingPlan;
  public current_wizard_step: number = 1;
  // TODO: Make a Core Config Dynamic
  private plan_type_codes_internet = ['radio', 'fiber'];
  private plan_type_codes_tv = ['tv'];
  private plan_type_codes_phone = ['phone'];
  //private plan_type_codes_addon = ['opcionais'];
  public loading_plans: boolean = true;
  public plans = {
    internet: [],
    tv: [],
    telephone: []
  };

  public plans_optionals = {
    internet: [],
    tv: [],
    telephone: []
  };


  public internet_plan_collapsed: boolean = false;
  public tv_plan_collapsed: boolean = false;
  public telephone_plan_collapsed: boolean = false;

  public pre_selected_internet_sku: string = '';
  public pre_selected_tv_sku: string = '';
  public pre_selected_telephone_sku: string = '';

  public selected_internet_plan: any = false;
  public selected_tv_plan: any = false;
  public selected_telephone_plan: any = false;

  public listener_cart_changes: Subscriber<any> = null;

  public selected_extra_tv_decoder = {
    plan: null,
    qty: 0
  };


  public selected_internet_optionals = [];
  public selected_tv_optionals = [];
  public selected_telephone_optionals = [];

  public formBeforeCheckout: FormGroup;
  public formBeforeCheckoutSubmitted: boolean = false;
  public formBeforeCheckoutLoading: boolean = false;


  public formWizardStep01: FormGroup;
  public formWizardStep01Submitted: boolean = false;

  public condos: Observable<CondoModel[]>;

  constructor(
    private datastore: WebAngularDataStore,
    public cart: CartService,
    public clientUserService: ClientUserService,
    private pageScrollService: PageScrollService,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private document: any
  ) {

    this.city = this.clientUserService.clientUser.data['city'];
    this.addressFromCity(this.city);

    this.formBeforeCheckout = this.formBuilder.group({
      postalCode: ['', [Validators.required]],
      numberOfAddress: ['', [Validators.required]],
      condo: ['', null],
      condoNumber: ['', null],
      typeOfAccess: ['', [Validators.required]],
      typeOfCustomer: ['', [Validators.required]]
    });

    this.formWizardStep01 = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
      telephone: ['', [Validators.minLength(10)]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      dob: ['', [Validators.required]]
    });

    if (this.cart.cart) {
      this.loadedCart();
    } else {
      this.listener_cart_changes = this.cart.cart_changes.subscribe(
        () => {
          this.loadedCart();
        });
    }
  }

  loadedCart() {
    if (this.loading_cart) {
      this.loading_cart = false;
      if (this.listener_cart_changes) {
        this.listener_cart_changes.unsubscribe();
      }

      console.log('loadedCart', this.cart.cart.extra_data);

      if (this.cart.cart.extra_data.hasOwnProperty('current_step')) {
        this.current_step = this.cart.cart.extra_data['current_step'];
      }
      if (this.cart.cart.extra_data.hasOwnProperty('current_wizard_step')) {
        this.current_wizard_step = this.cart.cart.extra_data['current_wizard_step'];
      }

      // HARDCORE TEST
      this.current_step = ProviderCheckoutSteps.wizard;
      this.current_wizard_step = 2

    }
  }

  addressFromCity(city: CityModel) {
    // if (!this.address) {
    //   this.address = new AddressModel(this.datastore, {});
    // }
    // this.address.city = city.name;
    // this.address.street_address_1 = city.street;
    // this.address.street_address_3 = city.neighborhood;
    // this.address.state = city.state;
    // this.address.postal_code = city.postal_code;
    // if (this.condos) {
    //   this.findCondos();
    // }
  }

  getCurrentCity() {
    const postalCode = this.formBeforeCheckout.get('postalCode').value;

    if (postalCode.length >= 8) {
      // Search The City
      const url = `/api/provider/city/${postalCode}/postal_code/`;
      this.datastore.findRecord(
        CityModel,
        null,
        null,
        new HttpHeaders({'Authorization': 'none'}),
        url
      ).subscribe((city: CityModel) => {
        this.city = city;
        this.addressFromCity(this.city);
        // TODO: Create Address Baser on City
      })
    }
  }

  public findCondos() {
    this.condos = this.datastore.findAll(
      CondoModel,
      {city__id: this.city.id},
      new HttpHeaders({'Authorization': 'none'}),
    ).map((query: JsonApiQueryData<CondoModel>) => query.getModels())
  }

  checkPageLoad() {

  }


  loadPlans() {
    let options = {};
    options['page'] = {number: 1, size: 100};
    options['include'] = ProductModel.include;
    const url = `/api/provider/city/${this.city.id}/products/`;
    this.loading_plans = true;
    this.datastore.findAll(ProductModel,
      options,
      new HttpHeaders({'Authorization': 'none'}),
      url).subscribe((query: JsonApiQueryData<ProductModel>) => {
      const plans = query.getModels();
      this.plans.internet = plans.filter((pm) => this.plan_type_codes_internet.indexOf(pm.product_type.code) !== -1);
      this.plans.telephone = plans.filter((pm) => this.plan_type_codes_phone.indexOf(pm.product_type.code) !== -1);
      this.plans.tv = plans.filter((pm) => this.plan_type_codes_tv.indexOf(pm.product_type.code) !== -1);
      this.loading_plans = false;
    }, (error) => {
      // TODO: do something
      this.loading_plans = false;
    });

    /*
    for (let i = 0; i < 2; i++) {
      // i = 0 == plan
      // i = 1 == the optionals

      let options = {};
      let plan: string[] = null;
      options['page'] = {number: 1, size: 10};

      if (i == 0) {
        if (this.skus[type]) {
          options['sku__in'] = this.skus[type].toString();
          plan = this.skus[type];
        }
      } else {
        if (this.skus_optionals[type]) {
          options['sku__in'] = this.skus_optionals[type].toString();
          plan = this.skus_optionals[type];
        }
      }
      if (plan) {
        options['page']['size'] = plan.length;
        this.datastore.findAll(ProductModel, options).subscribe((query: JsonApiQueryData<ProductModel>) => {
          if (i == 0) {
            this.plans[type] = query.getModels();
            this.addPreSelectPlans(type);
          } else {
            this.plans_optionals[type] = query.getModels();



            if (type === 'tv') {
              let plan = this.plans_optionals.tv[this.plans_optionals.tv.findIndex(
                (data) => data.sku === this.sku_extra_tv_decoder)];
              this.plans_optionals.tv.splice(this.plans_optionals.tv.indexOf(plan), 1);
              this.selected_extra_tv_decoder = {
                plan: plan,
                qty: 0
              }
            }
          }
        }, (error) => {
          // TODO: do something
        });
      }
    }
    */
  }

  addPreSelectPlans(type: string) {
    if (type == 'internet' && this.pre_selected_internet_sku) {
      this.selectInternetPlan(this.plans.internet.find(
        (data) => data.sku == this.pre_selected_internet_sku));
    }
    if (type == 'tv' && this.pre_selected_tv_sku) {
      this.selectTVPlan(this.plans.tv.find(
        (data) => data.sku == this.pre_selected_tv_sku));
    }
    if (type == 'telephone' && this.pre_selected_telephone_sku) {
      this.selectTelephonePlan(this.plans.telephone.find(
        (data) => data.sku == this.pre_selected_telephone_sku));
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

    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: `#ProviderCheckoutTabPlanInternet`,
      pageScrollDuration: 350,
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  openTabTVPlan() {
    this.tv_plan_collapsed = true;

    this.internet_plan_collapsed = false;
    this.telephone_plan_collapsed = false;

    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: `#ProviderCheckoutTabPlanTV`,
      pageScrollDuration: 350,
    });
    this.pageScrollService.start(pageScrollInstance);
  }

  openTabTelephonePlan() {
    this.telephone_plan_collapsed = true;

    this.internet_plan_collapsed = false;
    this.tv_plan_collapsed = false;

    let pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: `#ProviderCheckoutTabPlanTelephone`,
      pageScrollDuration: 350,
    });
    this.pageScrollService.start(pageScrollInstance);
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
    this.removeAllInternetOptionals();
  }

  deselectTVPlan() {
    this.selected_tv_plan = false;
    this.removeAllTVOptionals();
  }

  deselectTelephonePlan() {
    this.selected_telephone_plan = false;
    this.removeAllTelephoneOptionals();
  }

  addInternetOptional(plan) {
    this.selected_internet_optionals.push(plan);
  }

  addTVOptional(plan) {
    this.selected_tv_optionals.push(plan);
  }

  addTelephoneOptional(plan) {
    this.selected_telephone_optionals.push(plan);
  }

  removeInternetOptional(plan) {
    this.selected_internet_optionals.splice(
      this.selected_internet_optionals.indexOf(plan), 1
    );
  }

  removeAllInternetOptionals() {
    this.selected_internet_optionals = [];
  }

  removeTVOptional(plan) {
    this.selected_tv_optionals.splice(
      this.selected_tv_optionals.indexOf(plan), 1
    );
  }

  removeAllTVOptionals() {
    this.selected_tv_optionals = [];
    this.removeExtraTVDecoder();
  }

  removeTelephoneOptional(plan) {
    this.selected_telephone_optionals.splice(
      this.selected_telephone_optionals.indexOf(plan), 1
    );
  }

  removeAllTelephoneOptionals() {
    this.selected_telephone_optionals = [];
  }

  selectInternetPlan(plan: ProductModel) {
    this.selected_internet_plan = plan;
    this.plans_optionals.internet = plan.addons;

  }

  selectTVPlan(plan: ProductModel) {
    this.selected_tv_plan = plan;
    this.plans_optionals.tv = plan.addons;

    if (this.plans_optionals.tv) {
      let decoder_plan = this.plans_optionals.tv.find((p) => p.sku === this.sku_extra_tv_decoder);
      this.plans_optionals.tv.splice(this.plans_optionals.tv.indexOf(decoder_plan), 1);
      this.selected_extra_tv_decoder = {
        plan: decoder_plan,
        qty: this.selected_extra_tv_decoder ? this.selected_extra_tv_decoder.qty : 0
      }
    }

  }

  selectTelephonePlan(plan: ProductModel) {
    this.selected_telephone_plan = plan;
    this.plans_optionals.telephone = plan.addons;
  }

  get priceExtraTVDecoder(): string {
    let price: number = 0;
    if (this.selected_extra_tv_decoder.plan) {
      price = this.selected_extra_tv_decoder.plan.pricing_list * this.selected_extra_tv_decoder.qty;
    }
    return price.toFixed(2);
  }

  addExtraTVDecoder() {
    this.selected_extra_tv_decoder.qty += 1;
  }

  removeExtraTVDecoder() {
    this.selected_extra_tv_decoder.qty = 0;
  }

  get subtotal() {

    let subtotal: number = 0;

    if (this.selected_internet_plan) {
      subtotal += parseFloat(this.selected_internet_plan.pricing_list);
    }
    if (this.selected_tv_plan) {
      subtotal += parseFloat(this.selected_tv_plan.pricing_list);
    }
    if (this.selected_telephone_plan) {
      subtotal += parseFloat(this.selected_telephone_plan.pricing_list);
    }

    for (let plan of this.selected_internet_optionals) {
      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
    }
    for (let plan of this.selected_tv_optionals) {
      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
    }
    for (let plan of this.selected_telephone_optionals) {
      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
    }

    subtotal += parseFloat(this.priceExtraTVDecoder);
    return subtotal.toFixed(2)
  }


  get currentStep() {
    //return ProviderCheckoutSteps.buildingPlan;
    return this.current_step;

  }


  backToBuildingPlanStep() {
    this.current_step = ProviderCheckoutSteps.buildingPlan;
    this.current_wizard_step = 1;
    this.updateCartStep();
  }

  prevStep() {
    if (this.current_step == ProviderCheckoutSteps.wizard) {
      if (this.current_wizard_step > 1) {
        this.current_wizard_step--;
      } else {
        this.current_step = ProviderCheckoutSteps.buildingPlan;
      }
    } else if (this.current_step == ProviderCheckoutSteps.buildingPlan) {
      this.current_step = ProviderCheckoutSteps.beforeCheckout;
    }
    this.updateCartStep();
  }

  nextStep() {
    if (this.current_step == ProviderCheckoutSteps.beforeCheckout) {
      this.current_step = ProviderCheckoutSteps.buildingPlan;
    } else if (this.current_step == ProviderCheckoutSteps.buildingPlan) {
      this.current_step = ProviderCheckoutSteps.wizard;
    } else {
      this.current_wizard_step++;
    }
    this.updateCartStep();
  }

  private updateCartStep() {
    let extra_data: object = this.cart.getExtraData();
    extra_data['current_step'] = this.current_step.toString();
    extra_data['current_wizard_step'] = this.current_wizard_step.toString();
    this.cart.setExtraData(extra_data);
  }

  onBeforeCheckoutSubmit() {
    this.formBeforeCheckoutSubmitted = true;

    if (this.formBeforeCheckout.valid) {

      this.cart.searchAddressByPostalCode(
        this.formBeforeCheckout.get('postalCode').value, 'BR').then(
        (address: AddressModel) => {
          // TODO: checar CEP se é válido e se tem cobertura

          // postalCode
          // numberOfAddress
          // condo
          // condoNumber
          // typeOfAccess
          // typeOfCustomer

          // if( a porra toda valida)

          this.cart.setAddress(address, 'billing');
          this.nextStep();
        });
    }
  }

  isBuildingPlanValid() {
    return !!(this.selected_internet_plan || this.selected_tv_plan || this.selected_telephone_plan);
  }

  onBuildingPlanSubmit() {
    if (this.isBuildingPlanValid()) {
      this.nextStep();
    }
  }

  onWizardStep01Submit() {

  }

  confirmCheckout() {
    this.nextStep();
  }


}
