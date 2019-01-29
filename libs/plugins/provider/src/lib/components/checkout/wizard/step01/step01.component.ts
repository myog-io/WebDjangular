import {Component, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {WebAngularDataStore} from "@core/services/src/lib/WebAngularDataStore.service";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";

@Component({
  selector: 'plugin-provider-checkout-wizard-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class PluginProviderCheckoutWizardStep01Component implements OnInit {

  public formWizardStep01: FormGroup;
  public formWizardStep01Submitted: boolean = false;
  public cart: CartModel;

  constructor(public datastore: WebAngularDataStore,
              public providerCheckout: ProviderCheckoutService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.formWizardStep01Submitted = false;
    this.cart = this.providerCheckout.cartService.cart;
    let email: string = '';
    let name: string = '';
    let cpf: string = '';
    let rg: string = '';
    let mobile: string = '';
    let telephone: string = '';
    let dob: string = '';

    let postal_code: string = '';
    let city: string = '';
    let state: string = '';
    let number: string = '';
    let street_address_1: string = '';
    let street_address_2: string = '';
    let street_address_3: string = '';

    if (this.cart.email) email = this.cart.email;
    if (this.providerCheckout.address) {
      if (this.providerCheckout.address.first_name) name += this.providerCheckout.address.first_name;
      if (this.providerCheckout.address.last_name) name += this.providerCheckout.address.last_name;
      if (this.providerCheckout.address.postal_code) postal_code = this.providerCheckout.address.postal_code;
      if (this.providerCheckout.address.city) city = this.providerCheckout.address.city;
      if (this.providerCheckout.address.state) state = this.providerCheckout.address.state;
      if (this.providerCheckout.address.number) number = this.providerCheckout.address.number;
      if (this.providerCheckout.address.street_address_1)
        street_address_1 = this.providerCheckout.address.street_address_1;
      if (this.providerCheckout.address.street_address_2)
        street_address_2 = this.providerCheckout.address.street_address_2;
      if (this.providerCheckout.address.street_address_3)
        street_address_3 = this.providerCheckout.address.street_address_3;

    }
    if (this.cart.extra_data.hasOwnProperty('cpf')) cpf = this.cart.extra_data['cpf'];
    if (this.cart.extra_data.hasOwnProperty('rg')) rg = this.cart.extra_data['rg'];
    if (this.cart.extra_data.hasOwnProperty('mobile')) mobile = this.cart.extra_data['mobile'];
    if (this.cart.extra_data.hasOwnProperty('telephone')) telephone = this.cart.extra_data['telephone'];
    if (this.cart.extra_data.hasOwnProperty('dob')) dob = this.cart.extra_data['dob'];

    this.formWizardStep01 = this.formBuilder.group({
      name: [name, [Validators.required, Validators.minLength(2)]],
      email: [email, [Validators.required, Validators.email]],
      mobile: [mobile, [Validators.required, Validators.minLength(11)]],
      telephone: [telephone],
      cpf: [cpf, [Validators.required]],
      rg: [rg, [Validators.required]],
      dob: [dob, [Validators.required, Validators.minLength(8)]],

      postal_code: [postal_code],
      city: [city],
      state: [state],
      number: [number],
      street_address_1: [street_address_1],
      street_address_2: [street_address_2],
      street_address_3: [street_address_3],
    });
  }

  onSubmit() {
    if (this.formWizardStep01.valid) {
      this.formWizardStep01Submitted = true;
      const fullname: string = this.formWizardStep01.get('name').value;
      const first_name: string = fullname.split(' ').slice(0, -1).join(' ');
      const last_name: string = fullname.split(' ').slice(-1).join(' ');

      this.providerCheckout.address.first_name = first_name;
      this.providerCheckout.address.last_name = last_name;
      this.providerCheckout.address.number = this.formWizardStep01.get('number').value;
      this.providerCheckout.address.street_address_1 = this.formWizardStep01.get('street_address_1').value;
      this.providerCheckout.address.street_address_2 = this.formWizardStep01.get('street_address_2').value;
      this.providerCheckout.address.street_address_3 = this.formWizardStep01.get('street_address_3').value;

      this.providerCheckout.saveAddress().then();

      this.cart.email = this.formWizardStep01.get('email').value;
      let cart_extra_data: object = this.providerCheckout.cartService.getExtraData();
      cart_extra_data['cpf'] = this.formWizardStep01.get('cpf').value;
      cart_extra_data['rg'] = this.formWizardStep01.get('rg').value;
      cart_extra_data['mobile'] = this.formWizardStep01.get('mobile').value;
      cart_extra_data['telephone'] = this.formWizardStep01.get('telephone').value;
      cart_extra_data['dob'] = this.formWizardStep01.get('dob').value;
      this.providerCheckout.cartService.setExtraData(cart_extra_data);
      this.providerCheckout.cartService.updateCart().then((cart: CartModel) => {
        this.providerCheckout.onWizardStep01Submit()
      }, () => {
         this.formWizardStep01Submitted = false;
      })
    }
  }


}
