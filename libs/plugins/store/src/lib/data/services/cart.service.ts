import {EventEmitter, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {WebAngularDataStore} from "@core/services/src/lib/WebAngularDataStore.service";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";
import {AddressModel} from "@core/data/src/lib/models";
import {CookieService} from "ngx-cookie-service";
import {ErrorResponse, JsonApiQueryData} from "angular2-jsonapi";
import {CartItemModel} from "@plugins/store/src/lib/data/models/CartItem.model";
import {ProductModel} from "@plugins/store/src/lib/data/models/Product.model";
import {CartTermModel} from "@plugins/store/src/lib/data/models/CartTerm.model";
import {UserModel} from "@core/users/src/lib/models";


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
        this.datastore.findAll(CartModel, {
          token: cartCookie['token'],
          page: {size: 1, number: 1},
          include: ["billing_address", "shipping_address",
            "items", "items.product", "items.product.product_type",
            "items.product.categories", "user"
          ].join(',')
        }).subscribe(
          (queryData: JsonApiQueryData<CartModel>) => {
            const carts = queryData.getModels();
            if (carts.length > 0) {
              this.cart = carts[0]
            }
          },
          (error: any) => {
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

  public setCartToken(token: string) {
    const cartCookie: CookieCart = {
      token: token,
    };
    this.cookieService.set(this.cart_cookie_name, JSON.stringify(cartCookie), 30);
    // TODO: maybe improve, maybe not
    location.reload()
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
      this.cart.save({
        include: `${CartModel.include},items.product,items.product.categories`
      }).subscribe(
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

  public getCardTerms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(CartTermModel, {
        id: this._cart.id,
        fields: ["id", "content"].join(',')
      }).subscribe((query: JsonApiQueryData<CartTermModel>) => {
          let terms = query.getModels();
          //// this.cart.terms = terms;
          resolve(terms);
        },
        (error: ErrorResponse) => {
          // TODO: do something
        })
    });
  }

  public addToCart(parameters: { product: ProductModel, qty?: number, data?: object }): Promise<CartItemModel> {
    let {product, qty = 1, data = {}} = parameters;
    return new Promise((resolve, reject) => {
      if (product) {
        let cartItem: CartItemModel = this.datastore.createRecord(CartItemModel, {
          quantity: qty,
          data: data
        });
        cartItem.product = product;
        cartItem.cart = this.cart;

        cartItem.save({include: `product`}).subscribe(
          (cartItem: CartItemModel) => {
            cartItem.product.load_addons(this.datastore, {include: `product_type,categories`})
              .subscribe((query: JsonApiQueryData<ProductModel>) => {
                cartItem.product.addons = query.getModels();
                this.updateCart().then(() => {
                });
                resolve(cartItem);
              })


          },
          (error: ErrorResponse) => {
            reject(error);
          });
      } else {
        reject("Missing product parameter")
      }
    });
  }

  public updateCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    return new Promise((reject, resolver) => {
      cartItem.save().subscribe((cartItem: CartItemModel) => {
          console.log(this.cart.items)

        },
        () => {

        })

    });
  }

  public removeFromCart(cartItem: CartItemModel): Promise<void> {
    return new Promise((resolve, reject) => {
      this.datastore.deleteRecord(CartItemModel, cartItem.id).subscribe(
        (response) => {
          this.cart.items = this.cart.items.filter(function (ele) {
            return ele != cartItem;
          });
          this.updateCart().then(() => {
          });
          resolve();
        },
        (error: ErrorResponse) => {
          reject();
        })
    });
  }

  public clearCartItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      let promises = [];
      this.cart.items.forEach((item) => {
        let promise = new Promise((resolve, reject) => {
          this.datastore.deleteRecord(CartItemModel, item.id).subscribe(
            (response) => {
              this.cart.items = this.cart.items.filter((ele) => {
                return ele != item;
              });
              resolve(response);
            },
            (error) => {
              reject(error);
            });
        });
        promises.push(promise)
      });
      Promise.all(promises).then(
        (values) => {
          this.updateCart().then(() => {
            resolve(values);
          })
        },
        (error) => {
          reject(error)
        }
      )
    });
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

  public setBillingAddress(address: AddressModel) {
    this.cart.billing_address = address;
  }

  public setShippingAddress(address: AddressModel) {
    this.cart.shipping_address = address;
  }

  public getExtraData(): object {
    return this.cart.extra_data;
  }

  public setExtraData(value: any): void {
    this.cart.extra_data = Object.assign(this.cart.extra_data, value);
  }

}

