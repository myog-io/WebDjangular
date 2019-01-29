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
import {Subscriber} from 'rxjs';
import {CondoModel} from '../models/Condo.model';
import "rxjs-compat/add/operator/map";
import {ActivatedRoute, Router} from "@angular/router";
import {CartItemModel} from "@plugins/store/src/lib/data/models/CartItem.model";
import {CartTermModel} from "@plugins/store/src/lib/data/models/CartTerm.model";
import {PlanTypeModel} from '../models/PlanType.model';

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

  private _plan_type: PlanTypeModel;


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

  get plan_type(): PlanTypeModel {
    return this._plan_type;
  }

  set plan_type(pt: PlanTypeModel) {
    this._plan_type = pt;
  }

  get condo(): CondoModel {
    return this._condo;
  }

  set condo(cn: CondoModel) {
    this._condo = cn;
  }

  public internet_plan_collapsed: boolean = false;
  public tv_plan_collapsed: boolean = false;
  public telephone_plan_collapsed: boolean = false;

  public selectingInternetPlan: boolean = false;
  public selectingTVPlan: boolean = false;
  public selectingTelephonePlan: boolean = false;


  public pre_select_plans = {
    has_pre_selected_plans: false,
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
    qty: 0,
    cartItem: null,
  };


  public selected_internet_optionals = [];
  public selected_tv_optionals = [];
  public selected_telephone_optionals = [];

  public formBeforeCheckout: FormGroup;
  public formBeforeCheckoutSubmitted: boolean = false;
  public formBeforeCheckoutLoading: boolean = false;

  public copying: boolean = false;

  private _condo: CondoModel;

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

    this.activatedRoute.queryParams.subscribe((params => {
        this.checkPreSelectedPlans(params);
      })
    );
  }

  restartProviderCheckout() {
    this.cartService.clearCart().then(
      (res) => {
        // TODO: maybe improve, maybe not
        location.reload();
        // console.log('restart cart deleted',res );
        // this.current_step = ProviderCheckoutSteps.beforeCheckout;
        // this.current_wizard_step = 1;
        // this.formBeforeCheckoutSubmitted = false;
//
        // this.formBeforeCheckout.reset();
        // console.log(this.formBeforeCheckout.get('typeOfAccess').errors);
      }, (error) => {
        // console.log('restart cart error: ', error)
      })
  }

  checkPreSelectedPlans(params) {
    if (params.hasOwnProperty('token')) {
      const url: string = this.router.createUrlTree([], {
        relativeTo: this.activatedRoute,
        queryParams: {}
      }).toString();
      this.location.go(url);
      this.cartService.setCartToken(params['token'],params['city_id']);
    }
    if (params.hasOwnProperty('net')) {
      this.pre_select_plans.internet = params['net'];
      this.pre_select_plans.has_pre_selected_plans = true;
    }
    if (params.hasOwnProperty('net_op')) {
      this.pre_select_plans.internet_optionals = params['net_op'].split(',');
      this.pre_select_plans.has_pre_selected_plans = true;
    }

    if (params.hasOwnProperty('phone')) {
      this.pre_select_plans.telephone = params['phone'];
      this.pre_select_plans.has_pre_selected_plans = true;
    }
    if (params.hasOwnProperty('phone_op')) {
      this.pre_select_plans.telephone_optionals = params['phone_op'].split(',');
      this.pre_select_plans.has_pre_selected_plans = true;
    }

    if (params.hasOwnProperty('tv')) {
      this.pre_select_plans.tv = params['tv'];
      this.pre_select_plans.has_pre_selected_plans = true;
    }
    if (params.hasOwnProperty('tv_op')) {
      this.pre_select_plans.tv_optionals = params['tv_op'].split(',');
      this.pre_select_plans.has_pre_selected_plans = true;
    }
  }

  arrayRemove(arr, value) {
    return arr.filter((ele) => ele !== value);
  }

  loadedCart() {
    if (this.loading_cart) {
      if (this.listener_cart_changes) {
        this.listener_cart_changes.unsubscribe();
      }

      // Set City Information
      let cart = this.cartService.cart;
      if (!cart.id) {
        this.loading_cart = false;
        return;
      }
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
          typeOfAccess: cart.extra_data.plan_type_id || '',
          typeOfCustomer: cart.extra_data.customer_type || '',
        });
      }

      this.updateSelectedItems();

      if (this.cartService.cart.extra_data.hasOwnProperty('current_step')) {
         this.current_step = this.cartService.cart.extra_data['current_step'];
         if (this.current_step == ProviderCheckoutSteps.buildingPlan ||
           this.current_step == ProviderCheckoutSteps.wizard) {
           if (this.plan_type) {
             this.loadPlans();
           } else {
             this.datastore.findRecord(PlanTypeModel, this.cartService.cart.extra_data.plan_type_id).subscribe((plan_type) => {
               this.plan_type = plan_type;
               if (this.cartService.cart.extra_data.hasOwnProperty('condo')) {
                 this.datastore.findRecord(CondoModel, this.cartService.cart.extra_data.condo, {fields: 'name,id'}).subscribe(
                   (condo) => {
                     this.condo = condo;
                     this.loadPlans();
                   }, (error) => {
                     this.loadPlans();
                   }
                 )
               } else {
                 this.loadPlans();
               }
             })
           }
         }
       }
      if (this.cartService.cart.extra_data.hasOwnProperty('current_step')) {
        this.current_step = this.cartService.cart.extra_data['current_step'];
      }
      if (this.cartService.cart.extra_data.hasOwnProperty('current_wizard_step')) {
        this.current_wizard_step = this.cartService.cart.extra_data['current_wizard_step'];
      }
      this.loading_cart = false;
    }
    this.cartService.cart_changes.subscribe(() => {

      this.checkDisabledByCategories(this.cartService.cart);
    })

  }

  checkDisabledByCategories(cart) {
    let categories_ids = {};
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i];
      if (item.product) {
        if (item.product.categories) {
          for (let j = 0; j < item.product.categories.length; j++) {
            const category = item.product.categories[j];
            categories_ids[category.slug] = category.id;
          }
        }
      }
    }
    for (const type in this.plans_optionals) {
      if (this.plans_optionals.hasOwnProperty(type)) {
        const plans = this.plans_optionals[type];
        if (plans) {
          for (let i = 0; i < plans.length; i++) {
            const plan = plans[i];
            plan.disabled = false;
            if (plan.categories) {
              for (let j = 0; j < plan.categories.length; j++) {
                const category = plan.categories[j];
                if (categories_ids.hasOwnProperty(category.slug)) {
                  plan.disabled = true;
                  break;
                }
              }
            }
          }
        }
      }
    }
    this.selectingTelephonePlan = false;
    this.selectingTVPlan = false;
    this.selectingInternetPlan = false;
  }

  updateSelectedItems() {
    let url_params: object = {};
    let promises = [];
    let items = this.cartService.cart.items;

    if (this.pre_select_plans.has_pre_selected_plans) {

      if (items) {
        this.cartService.clearCartItems().then(() => {
          this.addPreSelectedPlans();
        })
      } else {
        this.addPreSelectedPlans();
      }
    } else if (items) {
      // TODO: Improve This Function
      let optionals = items.filter((item) => item.product && item.product.product_type.code);
      /* Searching For Internet Plans on Cart */
      this.selected_internet_plan = items.find((item) => item.product &&
        this.plan_type_codes_internet.indexOf(item.product.product_type.code) !== -1);
      if (this.selected_internet_plan) {
        url_params['net'] = this.selected_internet_plan.product.sku;
        promises.push(
          new Promise((resolve, reject) => {
            this.selected_internet_plan.product.load_addons(this.datastore,
              {include: `product_type,categories`}).subscribe(
              (query: JsonApiQueryData<ProductModel>) => {
                this.plans_optionals.internet = query.getModels();
                this.selected_internet_optionals = optionals.filter(
                  (item) => this.plans_optionals.internet.find(
                    (plan) => plan.sku == item.product.sku));
                resolve(true);
              }, (error) => {
                reject(error);
              });
          })
        );
      }
      /* Searching For TV Plans on Cart */
      this.selected_tv_plan = items.find((item) => item.product && this.plan_type_codes_tv.indexOf(item.product.product_type.code) !== -1);
      if (this.selected_tv_plan) {
        url_params['tv'] = this.selected_tv_plan.product.sku;
        promises.push(
          new Promise((resolve, reject) => {
            this.selected_tv_plan.product.load_addons(this.datastore, {include: `product_type,categories`}).subscribe((query: JsonApiQueryData<ProductModel>) => {
              this.plans_optionals.tv = query.getModels();
              this.selected_tv_optionals = optionals.filter((item) => this.plans_optionals.tv.find((plan) => plan.sku == item.product.sku));

              // Loading Decoder
              let decoder_plan = this.plans_optionals.tv.find((p) => p.sku === this.sku_extra_tv_decoder);

              this.plans_optionals.tv = this.arrayRemove(this.plans_optionals.tv, decoder_plan);

              let decoder_plan_cart_item: CartItemModel = this.selected_tv_optionals.find((item) => (item.sku == this.sku_extra_tv_decoder));
              this.selected_tv_optionals = this.arrayRemove(this.selected_tv_optionals, decoder_plan_cart_item);


              this.selected_extra_tv_decoder = {
                plan: decoder_plan,
                qty: decoder_plan_cart_item ? decoder_plan_cart_item.quantity : 0,
                cartItem: decoder_plan_cart_item ? decoder_plan_cart_item : null
              };

              resolve(true);
            }, (error) => {
              reject(error);
            });
          })
        );
      }

      /* Searching For Phone Plans on Cart */
      this.selected_telephone_plan = items.find((item) => item.product && this.plan_type_codes_phone.indexOf(item.product.product_type.code) !== -1);
      if (this.selected_telephone_plan) {
        url_params['phone'] = this.selected_telephone_plan.product.sku;
        promises.push(
          new Promise((resolve, reject) => {
            this.selected_telephone_plan.product.load_addons(this.datastore, {include: `product_type,categories`}).subscribe((query: JsonApiQueryData<ProductModel>) => {
              this.plans_optionals.telephone = query.getModels();
              this.selected_telephone_optionals = optionals.filter((item) => this.plans_optionals.telephone.find((plan) => plan.sku == item.product.sku));
              resolve(true);
            }, (error) => {
              reject(error);
            });
          })
        );
      }
      Promise.all(promises).then((values) => {
        //if (this.selected_extra_tv_decoder && this.selected_extra_tv_decoder.qty > 0) {
        //  url_params['tv_decoder'] = this.selected_extra_tv_decoder.qty;
        //}
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
        this.checkDisabledByCategories(this.cartService.cart);
      });

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

  addPreSelectedPlans() {
    // Adding Pre Selected Internet Plans to Cart and it's addons
    if (this.pre_select_plans.internet) {
      let internet_plan = this.plans.internet.find((data) => data.sku === this.pre_select_plans.internet);
      if (internet_plan) {
        this.selectInternetPlan(internet_plan).then((cartItem) => {
          let optionals = this.plans_optionals.internet.filter(
            (data) => this.pre_select_plans.internet_optionals.indexOf(data.sku) !== -1);
          for (let i = 0; i < optionals.length; i++) {
            const element = optionals[i];
            this.addInternetOptional(element);
          }
        });
      }
    }
    // Adding Pre Selectect Tv Plans To cart and it's addons
    if (this.pre_select_plans.tv) {
      let tv_plan = this.plans.tv.find((data) => data.sku == this.pre_select_plans.tv);
      if (tv_plan) {
        this.selectTVPlan(tv_plan).then((cartItem) => {
          let optionals = this.plans_optionals.internet.filter((data) => this.pre_select_plans.tv_optionals.indexOf(data.sku) !== -1)
          for (let i = 0; i < optionals.length; i++) {
            const element = optionals[i];
            this.addTVOptional(element);
          }
        });
      }
    }
    // Adding Pre Selectect Phone Plans To cart and it's addons
    if (this.pre_select_plans.telephone) {
      let tv_phone = this.plans.telephone.find((data) => data.sku == this.pre_select_plans.telephone);
      if (tv_phone) {
        this.selectTelephonePlan(tv_phone).then((cartItem) => {
          let optionals = this.plans_optionals.internet.filter((data) => this.pre_select_plans.telephone_optionals.indexOf(data.sku) !== -1)
          for (let i = 0; i < optionals.length; i++) {
            const element = optionals[i];
            this.addTelephoneOptional(element);
          }
        });
      }
    }
    const url = this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
    }).toString();
    this.location.go(url);
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
      if (this.condo) {
        condoNumber = this.formBeforeCheckout.get('condoNumber').value || null;
        this.address.street_address_3 = `${this.condo.name} APTO ${condoNumber}`;
      }
    }

    this.address.city = city.name;
    this.address.number = number;
    this.address.street_address_1 = `${city.street}`;
    this.address.street_address_3 = city.neighborhood;
    this.address.state = city.state;
    this.address.postal_code = city.postal_code;
    this.address.country = 'BR';
    this.address.country_area = 'BR';
    //if (this.condos) {
    //  this.findCondos();
    //}
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


  loadPlans() {
    let options = {};
    options['page'] = {number: 1, size: 100};
    //options['include'] = `${ProductModel.include}`;
    options['include'] = `product_type`;
    options['plan_types__id'] = this.plan_type.id;

    if (this.condo) {
      options['condos__id'] = this.condo.id;
    } else {
      options['city__id'] = this.city.id;
    }
    //const url = `/api/provider/city/${this.city.id}/products/`;
    
    this.loading_plans = true;
    this.datastore.findAll(ProductModel,
      options,
      new HttpHeaders({'Authorization': 'none'}),
      null).subscribe((query: JsonApiQueryData<ProductModel>) => {
      const plans = query.getModels();
      this.plans.internet = plans.filter((pm) => this.plan_type_codes_internet.indexOf(pm.product_type.code) !== -1);
      this.plans.telephone = plans.filter((pm) => this.plan_type_codes_phone.indexOf(pm.product_type.code) !== -1);
      this.plans.tv = plans.filter((pm) => this.plan_type_codes_tv.indexOf(pm.product_type.code) !== -1);
      this.loading_plans = false;

      this.updateSelectedItems();
    }, (error) => {
      // TODO: do something
      this.loading_plans = false;
    });
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

  selectInternetPlan(plan: ProductModel): Promise<CartItemModel> {
    return new Promise((resolve, reject) => {
      this.selectingInternetPlan = true;
      this.cartService.addToCart({product: plan}).then(
        (cartItem: CartItemModel) => {
          this.selectingInternetPlan = false;
          this.selected_internet_plan = cartItem;
          this.plans_optionals.internet = cartItem.product.addons;
          resolve(cartItem);
        }, (error: ErrorResponse) => {
          this.selectingInternetPlan = false;
          reject(error);
        });
    })

  }

  selectTVPlan(plan: ProductModel): Promise<CartItemModel> {
    return new Promise((resolve, reject) => {
      this.selectingTVPlan = true;
      this.cartService.addToCart({product: plan}).then(
        (cartItem: CartItemModel) => {

          this.selectingTVPlan = false;

          this.selected_tv_plan = cartItem;
          this.plans_optionals.tv = cartItem.product.addons;
          if (this.plans_optionals.tv) {
            let decoder_plan = this.plans_optionals.tv.find((p) => p.sku === this.sku_extra_tv_decoder);

            this.plans_optionals.tv = this.arrayRemove(this.plans_optionals.tv, decoder_plan);

            this.selected_extra_tv_decoder = {
              plan: decoder_plan,
              qty: 0,
              cartItem: null
            };
            resolve(cartItem);
          }
        },
        (error: ErrorResponse) => {
          this.selectingTVPlan = false;
          reject(error)
        });
    });
  }

  selectTelephonePlan(plan: ProductModel): Promise<CartItemModel> {
    return new Promise((resolve, reject) => {
      this.selectingTelephonePlan = true;
      this.cartService.addToCart({product: plan}).then(
        (cartItem: CartItemModel) => {
          this.selectingTelephonePlan = false;
          this.selected_telephone_plan = cartItem;
          this.plans_optionals.telephone = cartItem.product.addons;
          resolve(cartItem)
        }, (error: ErrorResponse) => {
          this.selectingTelephonePlan = false;
          reject(error)
        });
    });
  }

  deselectInternetPlan() {
    this.selectingInternetPlan = true;
    this.cartService.removeFromCart(this.selected_internet_plan, false).then(
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
    this.cartService.removeFromCart(this.selected_tv_plan, false).then(
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
    this.cartService.removeFromCart(this.selected_telephone_plan, false).then(
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
    this.selectingInternetPlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_internet_optionals.push(cartItem);
      }, (error: ErrorResponse) => {
      });
  }

  addTVOptional(plan) {
    this.selectingTVPlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_tv_optionals.push(cartItem);
      }, (error: ErrorResponse) => {
      });
  }

  addTelephoneOptional(plan) {
    this.selectingTelephonePlan = true;
    this.cartService.addToCart({product: plan}).then(
      (cartItem: CartItemModel) => {
        this.selected_telephone_optionals.push(cartItem);
      }, (error: ErrorResponse) => {

      });
  }

  checkCartItemInternetOptional(plan) {
    return this.selected_internet_optionals.find(
      (data) => data.product.id === plan.id);
  }

  removeInternetOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if (plan instanceof ProductModel) {
      cartItem = this.checkCartItemInternetOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_internet_optionals = this.arrayRemove(this.selected_internet_optionals, cartItem);
      }, (error: ErrorResponse) => {
      });
  }

  removeAllPlansFromType(type_list: CartItemModel[]) {
    let promises: Promise<boolean>[] = [];
    while (type_list.length) {
      let op = type_list.pop();
      promises.push(
        this.cartService.removeFromCart(op, false)
      );
    }
    Promise.all(promises).then((responses) => {
      this.cartService.updateCart();
    })
  }

  removeAllInternetOptionals() {
    this.removeAllPlansFromType(this.selected_internet_optionals);
  }

  checkCartItemTVOptional(plan) {
    return this.selected_tv_optionals.find((data) => data.product.id === plan.id);
  }


  removeTVOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if (plan instanceof ProductModel) {
      cartItem = this.checkCartItemTVOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_tv_optionals = this.arrayRemove(this.selected_tv_optionals, cartItem);
      }, (error: ErrorResponse) => {
      });
  }

  removeAllTVOptionals() {
    this.removeAllPlansFromType(this.selected_tv_optionals);
    this.removeExtraTVDecoder();
  }

  checkCartItemTelephoneOptional(plan) {
    return this.selected_telephone_optionals.find(
      (data) => data.product.id === plan.id);
  }

  removeTelephoneOptional(plan: CartItemModel | ProductModel) {
    let cartItem: CartItemModel = null;
    if (plan instanceof ProductModel) {
      cartItem = this.checkCartItemTelephoneOptional(plan);
    } else {
      cartItem = plan;
    }
    this.cartService.removeFromCart(cartItem).then(
      () => {
        this.selected_telephone_optionals = this.arrayRemove(this.selected_telephone_optionals, cartItem)
      }, (error: ErrorResponse) => {
      });
  }

  removeAllTelephoneOptionals() {
    this.removeAllPlansFromType(this.selected_telephone_optionals);
  }


  get priceExtraTVDecoder(): string {
    let price: number = 0;
    if (this.selected_extra_tv_decoder.plan && this.selected_extra_tv_decoder.cartItem) {
      price = this.selected_extra_tv_decoder.plan.pricing_list * this.selected_extra_tv_decoder.cartItem.quantity;
    }
    return price.toFixed(2);
  }

  addExtraTVDecoder(qty) {
    this.selectingTVPlan = true;
    this.cartService.addToCart({
      product: this.selected_extra_tv_decoder.plan,
      qty: (qty)
    }).then(
      (cartItem: CartItemModel) => {
        this.selectingTVPlan = false;
        this.selected_extra_tv_decoder.cartItem = cartItem;
        this.selected_extra_tv_decoder.qty = cartItem.quantity;
      }, (error: ErrorResponse) => {
        this.selectingTVPlan = false;
      });
  }

  updateTVDecoderQty(event) {
    let new_qty = event.target.value;
    if (new_qty == 0) {
      this.removeExtraTVDecoder();
    } else {
      if (this.selected_extra_tv_decoder.cartItem) {
        this.selectingTVPlan = true;
        this.selected_extra_tv_decoder.cartItem.quantity = new_qty;
        this.cartService.updateCartItem(this.selected_extra_tv_decoder.cartItem).then(
          (cartItem: CartItemModel) => {
            this.selected_extra_tv_decoder.cartItem = cartItem;
            this.selected_extra_tv_decoder.qty = cartItem.quantity;
            this.selectingTVPlan = false;
          },(error)=>{
            this.selectingTVPlan = false;
          }
        );
      } else {
        // Don't have on cart we need to create
        this.addExtraTVDecoder(new_qty);
      }
    }
  }

  removeExtraTVDecoder() {
    if (this.selected_extra_tv_decoder.cartItem) {
      this.selectingTVPlan = true;
      this.cartService.removeFromCart(this.selected_extra_tv_decoder.cartItem).then(
        () => {
          this.selectingTVPlan = false;
          this.selected_extra_tv_decoder.cartItem = null;
          this.selected_extra_tv_decoder.qty = 0;
        }, (error: ErrorResponse) => {
          this.selectingTVPlan = false;
        });
    }
  }

  get subtotal() {
    return this.cartService.cart.subtotal;
  }


  get currentStep() {
    //return ProviderCheckoutSteps.buildingPlan;
    return this.current_step;

  }

  get currentWizardStep() {
    return this.current_wizard_step
  }

  setWizardStep(number: number) {
    if (this.current_wizard_step < 3 && number < 3 && this.current_wizard_step > number) {
      this.current_wizard_step = number;
      this.updateCartExtraData();
    }
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
    extra_data.current_wizard_step = this.current_wizard_step.toString();
    extra_data.condo = this.formBeforeCheckout.get('condo').value;
    extra_data.condo_number = this.formBeforeCheckout.get('condoNumber').value;
    extra_data.plan_type_id = this.formBeforeCheckout.get('typeOfAccess').value;
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
          this.saveAddress().then((address: AddressModel) => {
            this.setAddressAndNextSetp();
          });
        })

      } else {
        this.addressFromCity(this.city);
        this.saveAddress().then((address: AddressModel) => {
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
          console.log("error saving address ", error);
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

  onWizardStep02Submit() {
    this.nextStep();
  }

  confirmCheckout() {
    this.nextStep();
  }


  getFees() {
    if (this.cartService.cart) {
      if (this.cartService.cart.items) {
        return this.cartService.cart.items.filter((data) => !data.product)
      }
    }
    return [];
  }

  getTerms() {
    this.cartService.getCartTerms().then((terms: CartTermModel) => {
      return terms;
    })
  }

  getTokenFullURL() {
    const url: string = window.location.origin + this.router.createUrlTree([], {
      relativeTo: this.activatedRoute,
      queryParams: {token: this.cartService.cart.token, city_id: this.cartService.cart.extra_data.city_id}
    }).toString();
    return url;
  }

  onCopyTokenFullURL(event) {
    this.copyInputMessage(document.getElementById('token-full-url'));
  }

  copyInputMessage(inputElement) {
    this.copying = true;
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    setTimeout(() => {
      this.copying = false;
    }, 3000)
  }

  showLoadingCart(): boolean {
    if(!this.loading_cart){
      if(this.current_step == ProviderCheckoutSteps.beforeCheckout ) {
        return false;
      } else if(this.current_step == ProviderCheckoutSteps.buildingPlan ||
                this.current_step == ProviderCheckoutSteps.wizard) {
        if(!this.loading_plans) return false;
      }
    }
    return true;
  }

}

