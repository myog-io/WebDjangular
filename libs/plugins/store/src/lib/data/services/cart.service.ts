import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WebAngularDataStore} from "@core/services/src/lib/WebAngularDataStore.service";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";
import {AddressModel} from "@core/data/src/lib/models";
import {CookieService} from "ngx-cookie-service";
import {ErrorResponse, JsonApiQueryData} from "angular2-jsonapi";
import {CartItemModel} from "@plugins/store/src/lib/data/models/CartItem.model";



export interface CookieCart {
  token?: string;
}


@Injectable({
  providedIn: 'root',
})
export class CartService {


  private _cart: CartModel = null;
  private cart_cookie_name: string = '_cart';
  public cart_changes: EventEmitter<null> = new EventEmitter();

  constructor(private http: HttpClient,
              private cookieService: CookieService,
              private datastore: WebAngularDataStore) {

    const cartExists: boolean = cookieService.check(this.cart_cookie_name);
    if (cartExists) {
      const cartCookie = JSON.parse(cookieService.get(this.cart_cookie_name));
      if (cartCookie['token']) {
        this.datastore.findAll(CartModel, {token: cartCookie['token'], page: {size: 1, number: 1}, include:"billing_address,shipping_address"}).subscribe(
          (queryData: JsonApiQueryData<CartModel>) => {
            
            const carts = queryData.getModels();
            if (carts.length > 0) {
              this.cart = carts[0];
            }
          },
          (error:any) => {
            console.log(error);
            // TODO: do something
          })
      }
    } else {
      this.cart = datastore.createRecord(CartModel, {
        extra_data: {}
      });
    }
  }

  get cart(): CartModel {
    return this._cart;
  }

  set cart(value: CartModel) {
    this._cart = value;
    this.cart_changes.emit();
  }

  public updateCookie() {
   if (this._cart.token) {
      const cartCookie: CookieCart = {
        token: this._cart.token,
      };
      this.cookieService.set(this.cart_cookie_name, JSON.stringify(cartCookie), 30);
    }
  }

  public updateCart(): Promise<CartModel> {
    
    return new Promise((resolve, reject) => {
      
      this.cart.save().subscribe(
        (cart: CartModel) => {
          this.cart = cart;
          this.updateCookie();
          resolve(cart);
        },
        (error: ErrorResponse) => {
          reject(error);
        });
    });
  }

  public addToCart() {

    let cartItem: CartItemModel;

    //his.cart = datastore.createRecord(CartModel, {});


  }

  public clearCart(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this._cart.id) {
        this.datastore.deleteRecord(CartModel, this._cart.id).subscribe(
          (response) => {
            this.cookieService.delete(this.cart_cookie_name);
            resolve(response);
          },
          (error: ErrorResponse) => {
            reject(error);
          })
      } else {
        reject("Cart does not exists");
      }
    });
  }

  public searchAddressByPostalCode(postal_code: string, country: string): Promise<AddressModel> {
    // fake search xD
    return new Promise((resolve, reject) => {

      let address: AddressModel = this.datastore.createRecord(AddressModel, {
        street_address_1: 'R. Sete de Setembro',
        street_address_2: '',
        street_address_3: 'Jardim Morumbi',
        postal_code: postal_code,
        state: 'São Paulo',
        city: 'Lençõis Paulista',
        country: 'BR',
        country_area: 'BR'
      });
      resolve(address);
    });
  }

  public setAddress(address: AddressModel, type: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (address.hasDirtyAttributes) {
        address.save().subscribe(
          (address: AddressModel) => {
            if (type === 'billing') this.setBillingAddress(address);
            else if (type === 'shipping') this.setShippingAddress(address);
            else { // TODO: raise an error
            }
            // Commenting because right after we update the Address we also update the checkout Step and Save
            //this.updateCart();
          },
          (error: ErrorResponse) => {
            // TODO: do something
          });
      }
    });
  }

  private setBillingAddress(address: AddressModel) {
    this._cart.billing_address = address;
  }

  private setShippingAddress(address: AddressModel) {
    this._cart.shipping_address = address;
  }

  public getExtraData(): object {
    return this._cart.extra_data;
  }

  public setExtraData(value: any): void {
    this.cart.extra_data = Object.assign(this.cart.extra_data,value);
    this.updateCart().then((cart: CartModel)=>{});
  }
}

