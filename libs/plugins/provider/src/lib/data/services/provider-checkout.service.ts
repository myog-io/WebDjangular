import {Inject, Injectable} from '@angular/core';
import {ErrorResponse, JsonApiQueryData} from "angular2-jsonapi";
import {DOCUMENT, Location} from '@angular/common';
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
import {ActivatedRoute, Router} from "@angular/router";
import {CartItemModel} from "@plugins/store/src/lib/data/models/CartItem.model";

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
  };

  public access_types = {
    residencial: 'Residencial',
    condominio_residencial: 'Condomínio Residencia',
    empresarial: 'Empresarial',
    condominio_empresarial: 'Condomínio Empresarial',
  };


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

  public selectingInternetPlan: boolean = false;
  public selectingTVPlan: boolean = false;
  public selectingTelephonePlan: boolean = false;


  public pre_select_plans = {
    internet: null,
    internet_optionals: [],
    tv: [],
    tv_optionals: [],
    telephone: null,
    telephone_optionals: []
  };

  public selected_internet_plan: CartItemModel = null;
  public selected_tv_plan: CartItemModel = null;
  public selected_telephone_plan: CartItemModel = null;

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




    if (this.cartService.cart) {
      this.loadedCart();
    } else {
      this.listener_cart_changes = this.cartService.cart_changes.subscribe(
        () => {
          this.loadedCart();
        });
    }

    this.activatedRoute.queryParams.subscribe(
      (params => {
        if (params.hasOwnProperty('net')) this.pre_select_plans.internet = params['net'];
        //if (params.hasOwnProperty('net_op'))
        //  this.pre_select_plans.internet_optionals = params['net_op'].slipt(',');

        if (params.hasOwnProperty('phone')) this.pre_select_plans.telephone = params['phone'];
        //if (params.hasOwnProperty('phone_op'))
        //  this.pre_select_plans.telephone_optionals = params['phone_op'].slipt(',');

        if (params.hasOwnProperty('tv')) this.pre_select_plans.tv = params['tv'];
        //if (params.hasOwnProperty('tv_op'))
        //  this.pre_select_plans.tv_optionals = params['tv_op'].slipt(',');
      })
    );

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
      if (this.address) {
        this.city.id = cart.extra_data.city_id;
        this.city.name = this.address.city;

        // Set Form Information
        this.formBeforeCheckout.setValue({
          postalCode: this.address.postal_code,
          condo: cart.extra_data.condo || '',
          numberOfAddress: this.address.number,
          condoNumber: cart.extra_data.condo_number || '',
          typeOfAccess: cart.extra_data.access_type || '',
          typeOfCustomer: cart.extra_data.customer_type || '',
        });
      }

      //this.updateSelectedItems();

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

  updateSelectedItems() {
    let url_params: object = {};

    let items = this.cartService.cart.items;
    if (items) {
      items.forEach(item => {
        if (item.product.product_type.code == 'fiber' || item.product.product_type.code == 'radio') {
          this.selected_internet_plan = item;
          let find_loaded_internet_plan = this.plans.internet.find((data) => data.sku == item.product.sku);
          if (find_loaded_internet_plan) this.plans_optionals.internet = find_loaded_internet_plan.addons;
          url_params['net'] = item.product.sku;
        } else if (item.product.product_type.code == 'tv') {
          this.selected_tv_plan = item;
          let find_loaded_tv_plan = this.plans.tv.find((data) => data.sku == item.product.sku);
          if (find_loaded_tv_plan) this.plans_optionals.tv = find_loaded_tv_plan.addons;
          url_params['tv'] = item.product.sku;
        } else if (item.product.product_type.code == 'phone') {
          this.selected_telephone_plan = item;
          let find_loaded_telephone_plan = this.plans.telephone.find((data) => data.sku == item.product.sku);
          if (find_loaded_telephone_plan) this.plans_optionals.telephone = find_loaded_telephone_plan.addons;
          url_params['phone'] = item.product.sku;
        }
      });

      items.forEach(item => {
        if (item.product.product_type.code == 'opcionais') {
          if (this.selected_internet_plan && this.plans_optionals.internet.find(
            (data) => data.sku == item.product.sku)) {
            this.selected_internet_optionals.push(item);
          } else if (this.selected_tv_plan && this.plans_optionals.tv.find(
            (data) => data.sku == item.product.sku)) {
            this.selected_tv_optionals.push(item);
          } else if (this.selected_telephone_plan && this.plans_optionals.telephone.find(
            (data) => data.sku == item.product.sku)) {
            this.selected_telephone_optionals.push(item);
          }
        }
      });

      //if (this.selected_extra_tv_decoder && this.selected_extra_tv_decoder.qty > 0) {
      //   params['tv_decoder'] = this.selected_extra_tv_decoder.qty;
      // }
      if (this.selected_internet_optionals.length > 0) {
        url_params['net_op'] = this.selected_internet_optionals.map((cartItem: CartItemModel) => {
          return cartItem.product.sku
        }).join(',');
      }
      if (this.selected_tv_optionals.length > 0) {
        url_params['tv_op'] = this.selected_tv_optionals.map((cartItem: CartItemModel) => {
          return cartItem.product.sku
        }).join(',');
      }
      if (this.selected_telephone_optionals.length > 0) {
        url_params['phone_op'] = this.selected_telephone_optionals.map((cartItem: CartItemModel) => {
          return cartItem.product.sku
        }).join(',');
      }

      //const url = this.router.createUrlTree([], {
      //  relativeTo: this.activatedRoute,
      //  queryParams: url_params
      //}).toString();
      //this.location.go(url);
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
    this.address.number = number;
    this.address.street_address_1 = `${city.street}`;
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

  getCurrentCity(): Promise<CityModel> {

    return new Promise((resolve, reject) => {
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
          resolve(this.city);
          // TODO: Create Address Baser on City
        })
      }
    });
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


      this.updateSelectedItems()

      this.preSelectedPlans();


    }, (error) => {
      // TODO: do something
      this.loading_plans = false;
    });
  }

  preSelectedPlans() {
    //    if (this.pre_select_plans.internet) {
    //      this.selectInternetPlan(this.plans.internet.find(
    //        (data) => data.sku == this.pre_select_plans.internet));
    //      if(this.selected_internet_plan) {
    //        if(this.pre_select_plans.internet_optionals) {
    //
    //        }
    //      }
    //    }
    //
    //    if (this.pre_select_plans.tv) {
    //      this.selectTVPlan(this.plans.tv.find(
    //        (data) => data.sku == this.pre_select_plans.tv));
    //    }
    //    if (this.pre_select_plans.telephone) {
    //      this.selectTelephonePlan(this.plans.internet.find(
    //        (data) => data.sku == this.pre_select_plans.telephone));
    //    }
  }

  addPreSelectPlans(type: string) {
    //// (type == 'internet' && this.pre_selected_internet_sku) {
    //  this.selectInternetPlan(this.plans.internet.find(
    //    (data) => data.sku == this.pre_selected_internet_sku));
    //}
    //if (type == 'tv' && this.pre_selected_tv_sku) {
    //  this.selectTVPlan(this.plans.tv.find(
    //    (data) => data.sku == this.pre_selected_tv_sku));
    //}
    //if (type == 'telephone' && this.pre_selected_telephone_sku) {
    //  this.selectTelephonePlan(this.plans.telephone.find(
    //    (data) => data.sku == this.pre_selected_telephone_sku));
    //}
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

  selectInternetPlan(plan: ProductModel) {
    this.selectingInternetPlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selectingInternetPlan = false;
        this.selected_internet_plan = cartItem;
        this.plans_optionals.internet = cartItem.product.addons;
      }, (error: ErrorResponse) => {
        this.selectingInternetPlan = false;
      });
  }

  selectTVPlan(plan: ProductModel) {
    this.selectingTVPlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selectingTVPlan = false;
        this.selected_tv_plan = cartItem;
        this.plans_optionals.tv = cartItem.product.addons;
        if (this.plans_optionals.tv) {
          let decoder_plan = this.plans_optionals.tv.find((p) => p.sku === this.sku_extra_tv_decoder);
          this.plans_optionals.tv.splice(this.plans_optionals.tv.indexOf(decoder_plan), 1);
          this.selected_extra_tv_decoder = {
            plan: decoder_plan,
            qty: this.selected_extra_tv_decoder ? this.selected_extra_tv_decoder.qty : 0
          }
        }
      }, (error: ErrorResponse) => {
        this.selectingTVPlan = false;
      });
  }

  selectTelephonePlan(plan: ProductModel) {
    this.selectingTelephonePlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selectingTelephonePlan = false;
        this.selected_telephone_plan = cartItem;
        this.plans_optionals.telephone = cartItem.product.addons;
      }, (error: ErrorResponse) => {
        this.selectingTelephonePlan = false;
      });
  }

  deselectInternetPlan() {
    this.selectingInternetPlan = true;
    this.cartService.removeFromCart(this.selected_internet_plan).then(
      () => {
        this.selectingInternetPlan = false;
        this.selected_internet_plan = null;
        this.plans_optionals.internet = [];
        this.removeAllInternetOptionals();
      }, (error: ErrorResponse) => {
        this.selectingInternetPlan = false;
      });
  }

  deselectTVPlan() {
    this.selectingTVPlan = true;
    this.cartService.removeFromCart(this.selected_tv_plan).then(
      () => {
        this.selectingTVPlan = false;
        this.selected_tv_plan = null;
        this.plans_optionals.tv = [];
        this.removeAllTVOptionals();
      }, (error: ErrorResponse) => {
        this.selectingTVPlan = false;
      });
  }

  deselectTelephonePlan() {
    this.selectingTelephonePlan = true;
    this.cartService.removeFromCart(this.selected_telephone_plan).then(
      () => {
        this.selectingTelephonePlan = false;
        this.selected_telephone_plan = null;
        this.plans_optionals.telephone = [];
        this.removeAllTelephoneOptionals();
      }, (error: ErrorResponse) => {
        this.selectingTelephonePlan = false;
      });
  }


  addInternetOptional(plan) {
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_internet_optionals.push(cartItem);
      }, (error: ErrorResponse) => {

      });
  }

  addTVOptional(plan) {
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_tv_optionals.push(cartItem);
      }, (error: ErrorResponse) => {

      });
  }

  addTelephoneOptional(plan) {
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_telephone_optionals.push(cartItem);
      }, (error: ErrorResponse) => {

      });
  }

  checkCartItemInternetOptional(plan) {
    return this.selected_internet_optionals.find(
      (data) => data.product == plan);
  }

  removeInternetOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if( plan instanceof  ProductModel ) {
      cartItem = this.checkCartItemInternetOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_internet_optionals.splice(
          this.selected_internet_optionals.indexOf(plan), 1
        );
      }, (error: ErrorResponse) => {
      });
  }

  removeAllInternetOptionals() {
    while (this.selected_internet_optionals.length) {
      let op = this.selected_internet_optionals.pop();
      this.cartService.removeFromCart(op).then();
    }
  }

  checkCartItemTVOptional(plan) {
    return this.selected_tv_optionals.find(
      (data) => data.product == plan);
  }


  removeTVOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if( plan instanceof  ProductModel ) {
      cartItem = this.checkCartItemTVOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_tv_optionals.splice(
          this.selected_tv_optionals.indexOf(plan), 1
        );
      }, (error: ErrorResponse) => {
      });
  }

  removeAllTVOptionals() {
    while (this.selected_tv_optionals.length) {
      let op = this.selected_tv_optionals.pop();
      this.cartService.removeFromCart(op).then();
    }
    this.removeExtraTVDecoder();
  }

  checkCartItemTelephoneOptional(plan) {
    return this.selected_telephone_optionals.find(
      (data) => data.product == plan);
  }

  removeTelephoneOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if( plan instanceof  ProductModel ) {
      cartItem = this.checkCartItemTelephoneOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_telephone_optionals.splice(
          this.selected_telephone_optionals.indexOf(plan), 1
        );
      }, (error: ErrorResponse) => {
      });
  }

  removeAllTelephoneOptionals() {
    while (this.selected_telephone_optionals.length) {
      let op = this.selected_telephone_optionals.pop();
      this.cartService.removeFromCart(op).then();
    }
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
    let subtotal: number = 55555;
//
//    if (this.selected_internet_plan) {
//      subtotal += parseFloat(this.selected_internet_plan.pricing_list);
//    }
//    if (this.selected_tv_plan) {
//      subtotal += parseFloat(this.selected_tv_plan.pricing_list);
//    }
//    if (this.selected_telephone_plan) {
//      subtotal += parseFloat(this.selected_telephone_plan.pricing_list);
//    }
//
//    for (let plan of this.selected_internet_optionals) {
//      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
//    }
//    for (let plan of this.selected_tv_optionals) {
//      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
//    }
//    for (let plan of this.selected_telephone_optionals) {
//      subtotal += plan.pricing_list ? parseFloat(plan.pricing_list) : 0;
//    }
//
//    subtotal += parseFloat(this.priceExtraTVDecoder);
    return subtotal.toFixed(2)
  }


  get currentStep() {
    //return ProviderCheckoutSteps.buildingPlan;
    return this.current_step;

  }

  get currentWizardStep() {
    return this.current_wizard_step
  }

  setWizardStep(number: number) {
    // TOOD If Can!
    this.current_wizard_step = number;
  }

  backToBuildingPlanStep() {
    this.current_step = ProviderCheckoutSteps.buildingPlan;
    this.current_wizard_step = 1;

    if (this.plans.internet.length <= 0 || this.plans.telephone.length <= 0 || this.plans.tv.length <= 0) {

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

    let extra_data: any = {};
    extra_data.current_step = this.currentStep.toString();
    extra_data.current_wizard_step = this.currentStep.toString();
    extra_data.condo = this.formBeforeCheckout.get('condo').value;
    extra_data.condo_number = this.formBeforeCheckout.get('condoNumber').value;
    extra_data.access_type = this.formBeforeCheckout.get('typeOfAccess').value;
    extra_data.customer_type = this.formBeforeCheckout.get('typeOfCustomer').value;
    extra_data.city_id = this.city.id;
    this.cartService.setExtraData(extra_data);
    this.cartService.updateCart().then();
  }

  onBeforeCheckoutSubmit() {
    this.formBeforeCheckoutLoading = true;
    if (this.formBeforeCheckout.valid) {
      if (!(this.city instanceof CityModel)) {
        this.getCurrentCity().then((city: CityModel) => {
          this.saveAddress().then((addres: AddressModel) => {
            this.setAddressAndNextSetp();
          });
        })

      } else {
        this.addressFromCity(this.city);
        this.saveAddress().then((addres: AddressModel) => {
          this.setAddressAndNextSetp();

        });
      }
    }
  }

  saveAddress(): Promise<AddressModel> {
    return new Promise((resolve, reject) => {
      this.address.save().subscribe((address) => {
          this.address = address;
          resolve(this.address);

        },
        (error) => {
          console.log("error saving address ", error)
          reject(error);
        })
    })
  }

  setAddressAndNextSetp() {
    this.cartService.setBillingAddress(this.address);
    this.cartService.setShippingAddress(this.address);
    this.nextStep();
    this.formBeforeCheckoutSubmitted = true;
    this.formBeforeCheckoutLoading = false;
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
    this.nextStep();
  }

  confirmCheckout() {
    this.nextStep();
  }


}
