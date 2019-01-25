import { Inject, Injectable } from '@angular/core';
import { JsonApiQueryData } from "angular2-jsonapi";
import { DOCUMENT, Location } from '@angular/common';
import { PageScrollInstance, PageScrollService } from 'ngx-page-scroll';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { CartService } from '@plugins/store/src/lib/data/services/cart.service';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { CityModel } from '../models/City.model';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { AddressModel } from '@core/data/src/lib/models';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { CondoModel } from '../models/Condo.model';
import "rxjs-compat/add/operator/map";
import { ActivatedRoute, Router } from "@angular/router";

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
  public customer_types = {
    new: 'Não sou cliente',
    internet_fibra: 'Sou cliente Fibra',
    internet_radio: 'Sou cliente Rádio',
  }
  public access_types = {
    residencial: 'Residencial',
    condominio_residencial: 'Condomínio Residencia',
    empresarial: 'Empresarial',
    condominio_empresarial: 'Condomínio Empresarial',
  }



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
    public cartService: CartService,
    public clientUserService: ClientUserService,
    private pageScrollService: PageScrollService,
    private formBuilder: FormBuilder,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public location: Location,
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
      name: ['', [Validators.required, Validators.minLength(2)] ],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.minLength(11)]],
      telephone: ['', [Validators.minLength(10)]],
      cpf: ['', [Validators.required]],
      rg: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      
    });


    if (this.cartService.cart) {
      this.loadedCart();
    } else {
      this.listener_cart_changes = this.cartService.cart_changes.subscribe(
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


      // Set City Information
      let cart = this.cartService.cart;
      if (!cart.id) return;
      this.address = cart.billing_address;
      this.city.id = cart.extra_data.city_id;
      this.city.name = this.address.city;

      // Set Form Information
      this.formBeforeCheckout.setValue({
        postalCode: this.address.postal_code,
        numberOfAddress: cart.extra_data.address_number || '',
        condo: cart.extra_data.condo || '',
        condoNumber: cart.extra_data.condo_number || '',
        typeOfAccess: cart.extra_data.access_type || '',
        typeOfCustomer: cart.extra_data.customer_type || '',
      })




      if (this.cartService.cart.extra_data.hasOwnProperty('current_step')) {
        this.current_step = this.cartService.cart.extra_data['current_step'];
        if (this.current_step == ProviderCheckoutSteps.buildingPlan) {
          this.loadPlans();
        }
      }
      if (this.cartService.cart.extra_data.hasOwnProperty('current_wizard_step')) {
        this.current_wizard_step = this.cartService.cart.extra_data['current_wizard_step'];
      }
    }
  }

  addressFromCity(city: CityModel) {
    if (!city) return null;
    if (!this.address) {
      this.address = new AddressModel(this.datastore, {});
    }
    let number = null;
    let condo = null;
    let condoNumber = null;
    if (this.formBeforeCheckout) {
      number = this.formBeforeCheckout.get('numberOfAddress').value || 'N/A';
      condo = this.formBeforeCheckout.get('condo').value || null;
      condoNumber = this.formBeforeCheckout.get('condoNumber').value || null;
    }
    this.address.city = city.name;
    this.address.street_address_1 = `${city.street}, ${number}`;
    if (condo) {
      this.address.street_address_3 = `${condo} APTO ${condoNumber}`;
    }
    this.address.street_address_3 = city.neighborhood;
    this.address.state = city.state;
    this.address.postal_code = city.postal_code;
    this.address.country = 'BR';
    this.address.country_area = 'BR';
    if (this.condos) {
      this.findCondos();
    }
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
        new HttpHeaders({ 'Authorization': 'none' }),
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
      { city__id: this.city.id },
      new HttpHeaders({ 'Authorization': 'none' }),
    ).map((query: JsonApiQueryData<CondoModel>) => query.getModels())
  }

  checkPageLoad() {

  }


  loadPlans() {
    let options = {};
    options['page'] = { number: 1, size: 100 };
    options['include'] = ProductModel.include;

    const url = `/api/provider/city/${this.city.id}/products/`;
    this.loading_plans = true;
    this.datastore.findAll(ProductModel,
      options,
      new HttpHeaders({ 'Authorization': 'none' }),
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

  updateUrl() {
    let params: object = {};

    if (this.selected_internet_plan) params['net'] = this.selected_internet_plan.sku;
    if (this.selected_tv_plan) params['tv'] = this.selected_tv_plan.sku;
    if (this.selected_telephone_plan) params['phone'] = this.selected_telephone_plan.sku;
    if (this.selected_extra_tv_decoder && this.selected_extra_tv_decoder.qty > 0) {
      params['tv_decoder'] = this.selected_extra_tv_decoder.qty;
    }
    if (this.selected_internet_optionals.length > 0) {
      params['net_op'] = this.selected_internet_optionals.map((plan) => {
        return plan.sku
      }).join(',');
    }
    if (this.selected_tv_optionals.length > 0) {
      params['tv_op'] = this.selected_tv_optionals.map((plan) => {
        return plan.sku
      }).join(',');
    }
    if (this.selected_telephone_optionals.length > 0) {
      params['phone_op'] = this.selected_telephone_optionals.map((plan) => {
        return plan.sku
      }).join(',');
    }

    const url = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: params
    }).toString();
    this.location.go(url)
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

  get currentWizardStep() {
    return this.current_wizard_step
  }

  setWizardStep(number:number){
    // TOOD If Can!
    this.current_wizard_step = number;
  }
  backToBuildingPlanStep() {
    this.current_step = ProviderCheckoutSteps.buildingPlan;
    this.current_wizard_step = 1;
    
    if (this.plans.internet.length <= 0 || this.plans.telephone.length <= 0 || this.plans.tv.length <= 0) {
      console.log()
      this.loadPlans();
    }
    this.updateCartExtraData();
  }

  prevStep() {
    if (this.current_step == ProviderCheckoutSteps.wizard) {
      if (this.current_wizard_step > 1) {
        this.current_wizard_step--;
      } else {

        this.backToBuildingPlanStep();
      }
    } else if (this.current_step == ProviderCheckoutSteps.buildingPlan) {

      this.current_step = ProviderCheckoutSteps.beforeCheckout;
    }
    this.updateCartExtraData();
  }

  nextStep() {
    if (this.current_step == ProviderCheckoutSteps.beforeCheckout) {
      this.loadPlans();
      this.current_step = ProviderCheckoutSteps.buildingPlan;

    } else if (this.current_step == ProviderCheckoutSteps.buildingPlan) {
      this.current_step = ProviderCheckoutSteps.wizard;
    } else {
      this.current_wizard_step++;
    }
    this.updateCartExtraData();
  }

  private updateCartExtraData() {
    console.log(`CURENT STEP ${this.currentStep} WIZARD STEP ${this.currentWizardStep} `);
    let extra_data: any = {}
    extra_data.current_step = this.currentStep.toString();
    extra_data.current_wizard_step = this.currentStep.toString();
    extra_data.address_number = this.formBeforeCheckout.get('numberOfAddress').value;
    extra_data.condo = this.formBeforeCheckout.get('condo').value;
    extra_data.condo_number = this.formBeforeCheckout.get('condoNumber').value;
    extra_data.access_type = this.formBeforeCheckout.get('typeOfAccess').value;
    extra_data.customer_type = this.formBeforeCheckout.get('typeOfCustomer').value;
    extra_data.city_id = this.city.id;
    this.cartService.setExtraData(extra_data);
  }

  onBeforeCheckoutSubmit() {
    this.formBeforeCheckoutSubmitted = true;

    if (this.formBeforeCheckout.valid) {
      if (this.address && this.address.id && this.city) {
        this.setAddressAndNextSetp();
      } else {
        this.address.save().subscribe((address) => {
          this.address = address;
          this.setAddressAndNextSetp();
        },
          (error) => {
            console.log("error saving address ", error)
          })
      }
    }
  }
  setAddressAndNextSetp() {
    this.cartService.setAddress(this.address, 'billing');
    this.cartService.setAddress(this.address, 'shipping');
    this.nextStep();
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
