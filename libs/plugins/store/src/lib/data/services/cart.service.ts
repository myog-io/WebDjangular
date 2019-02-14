import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WebAngularDataStore } from "@core/services/src/lib/WebAngularDataStore.service";
import { CartModel } from "@plugins/store/src/lib/data/models/Cart.model";
import { AddressModel } from "@core/data/src/lib/models";
import { CookieService } from "ngx-cookie-service";
import { ErrorResponse, JsonApiQueryData } from "angular2-jsonapi";
import { CartItemModel } from "@plugins/store/src/lib/data/models/CartItem.model";
import { ProductModel } from "@plugins/store/src/lib/data/models/Product.model";
import { CartTermModel } from "@plugins/store/src/lib/data/models/CartTerm.model";
import { UserModel } from "@core/users/src/lib/models";
import { ClientUserService } from "@core/services/src/lib/client-user.service";
import { CityModel } from "@plugins/provider/src/lib/data";
import {OrderModel} from "@plugins/store/src/lib/data/models/Order.model";

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
    private datastore: WebAngularDataStore,
    private clientUserService: ClientUserService,
  ) {
    const cartExists: boolean = cookieService.check(this.cart_cookie_name);
    if (cartExists) {
      const cartCookie = JSON.parse(cookieService.get(this.cart_cookie_name));
      if (cartCookie['token']) {
        this.datastore.findAll(CartModel, {
          token: cartCookie['token'],
          page: { size: 1, number: 1 },
          include: ["billing_address", "shipping_address",
            "items", "items.product", "items.product.product_type",
            "items.product.categories", "user"
          ].join(',')
        }).subscribe(
          (queryData: JsonApiQueryData<CartModel>) => {
            const carts = queryData.getModels();
            if (carts.length > 0) {
              this.cart = carts[0]
            }else{
              this.cookieService.delete(this.cart_cookie_name);
              this.cart = datastore.createRecord(CartModel, {
                extra_data: {}
              });
            }
          },
          (error: any) => {
            // TODO: do something
          }
        );
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

  public setCartToken(token: string, city_id: string) {
    const cartCookie: CookieCart = {
      token: token,
    };
    this.cookieService.set(this.cart_cookie_name, JSON.stringify(cartCookie), 30);
    this.datastore.findRecord(CityModel, city_id,{fields:'id,name'}).subscribe((city) => {
      this.clientUserService.clientUser.data['city'] = {
        id: city.id,
        name: city.name
      };
      this.clientUserService.updateCookie();
      location.reload()
    })


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

  public getCartTerms(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(CartTermModel, {
        carts: this.cart.id,
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
    let { product, qty = 1, data = {} } = parameters;
    return new Promise((resolve, reject) => {
      if (product) {
        let cartItem: CartItemModel = this.datastore.createRecord(CartItemModel, {
          quantity: qty,
          data: data
        });
        cartItem.product = product;
        cartItem.cart = this.cart;

        cartItem.save({ include: `product` }).subscribe(
          (cartItem: CartItemModel) => {
            cartItem.product.load_addons(this.datastore, { include: `product_type,categories` })
              .subscribe((query: JsonApiQueryData<ProductModel>) => {
                cartItem.product.addons = query.getModels();
                  this.updateCart().then(() => {
                });
                resolve(cartItem);
              }
            )
          },
          (error: ErrorResponse) => {
            reject(error);
          });
      } else {
        reject("Missing product parameter")
      }
    });
  }

  public completeCart(): Promise<OrderModel> {
    return new Promise( (resolve, reject) => {
      this.datastore.findRecord(OrderModel, null,
        null, null, `api/store/cart/${this.cart.id}/complete_order/`).subscribe(
          (order) =>
          {
            this.cookieService.delete(this.cart_cookie_name);
            resolve(order);
          },
          (error: ErrorResponse) => {
            reject(error);
          }
        );

    });
  }

  public updateCartItem(cartItem: CartItemModel): Promise<CartItemModel> {
    return new Promise((resolve, reject) => {
      cartItem.save().subscribe((cartItem: CartItemModel) => {
        console.log(this.cart.items)

      },
        () => {

        })

    });
  }

  public removeFromCart(cartItem: CartItemModel, updateCart = true): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.cart.items = this.cart.items.filter(function (ele) {
        return ele != cartItem;
      });
      this.datastore.deleteRecord(CartItemModel, cartItem.id).subscribe(
        (response) => {
          if (updateCart) {
            this.updateCart().then(() => {
            });
          }
          resolve(true);
        },
        (error: ErrorResponse) => {
          reject(false);
        })
    });
  }

  public clearCartItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      let promises = [];
      this.cart.items.forEach((item) => {
        this.cart.items = this.cart.items.filter((ele) => {
          return ele != item;
        });
        let promise = new Promise((resolve, reject) => {
          this.datastore.deleteRecord(CartItemModel, item.id).subscribe(
            (response) => {

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
      this.cookieService.delete(this.cart_cookie_name);
      if (this._cart.id) {
        this.datastore.deleteRecord(CartModel, this._cart.id).subscribe(
          (response) => {
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

