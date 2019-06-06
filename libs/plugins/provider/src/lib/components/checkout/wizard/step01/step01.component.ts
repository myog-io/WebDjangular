import { Component, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import * as moment from 'moment';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@Component({
  selector: 'plugin-provider-checkout-wizard-step01',
  templateUrl: './step01.component.html',
  styleUrls: ['./step01.component.scss']
})
export class PluginProviderCheckoutWizardStep01Component implements OnInit {
  public formWizardStep01: FormGroup;
  public formWizardStep01Submitted: boolean = false;
  public cart: CartModel;

  constructor(
    public datastore: WebAngularDataStore,
    public providerCheckout: ProviderCheckoutService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formWizardStep01Submitted = false;
    this.cart = this.providerCheckout.cartService.cart;
    let email: string = '';
    let name: string = '';
    let cpf: string = '';
    let rg: string = '';
    let mobile: string = '';
    let mobile_extra: string = '';
    let telephone: string = '';
    let dob: string = '';
    let message: string = '';

    let postal_code: string = '';
    let city: string = '';
    let state: string = '';
    let number: string = '';
    let street_address_1: string = '';
    let street_address_2: string = '';
    let street_address_3: string = '';



    if (this.providerCheckout.address) {
      if (this.providerCheckout.address.first_name)
        name += this.providerCheckout.address.first_name;
      if (this.providerCheckout.address.last_name)
        name += ' ' + this.providerCheckout.address.last_name;
      if (this.providerCheckout.address.postal_code)
        postal_code = this.providerCheckout.address.postal_code;
      if (this.providerCheckout.address.city)
        city = this.providerCheckout.address.city;
      if (this.providerCheckout.address.state)
        state = this.providerCheckout.address.state;
      if (this.providerCheckout.address.number)
        number = this.providerCheckout.address.number;
      if (this.providerCheckout.address.street_address_1)
        street_address_1 = this.providerCheckout.address.street_address_1;
      if (this.providerCheckout.address.street_address_2)
        street_address_2 = this.providerCheckout.address.street_address_2;
      if (this.providerCheckout.address.street_address_3)
        street_address_3 = this.providerCheckout.address.street_address_3;
    }
    email = this.cart.email;
    if (this.cart.extra_data.hasOwnProperty('cpf'))
      cpf = this.cart.extra_data['cpf'];
    if (this.cart.extra_data.hasOwnProperty('rg'))
      rg = this.cart.extra_data['rg'];
    if (this.cart.extra_data.hasOwnProperty('mobile'))
      mobile = this.cart.extra_data['mobile'];
    if (this.cart.extra_data.hasOwnProperty('mobile_extra'))
      mobile_extra = this.cart.extra_data['mobile_extra'];
    if (this.cart.extra_data.hasOwnProperty('telephone'))
      telephone = this.cart.extra_data['telephone'];
    if (this.cart.extra_data.hasOwnProperty('dob'))
      dob = this.cart.extra_data['dob'];
    if (this.cart.extra_data.hasOwnProperty('message'))
      message = this.cart.extra_data['message'];


    this.formWizardStep01 = this.formBuilder.group({
      name: [name, [Validators.required, WDAValidators.fullName()]],
      email: [email, [Validators.required, Validators.email]],
      mobile: [mobile, [Validators.required, Validators.minLength(11)]],
      mobile_extra: [mobile_extra],
      telephone: [telephone],
      cpf: [cpf, [Validators.required, WDAValidators.cpf()]],
      rg: [rg, [Validators.required, Validators.minLength(4)]],
      dob: [
        dob,
        [
          Validators.required,
          Validators.minLength(10),
          WDAValidators.date(),
          WDAValidators.over18()
        ]
      ],
      //file_document: ['', [Validators.required]],
      postal_code: [postal_code, [Validators.required]],
      city: [city, [Validators.required]],
      state: [state, [Validators.required]],
      number: [number, [Validators.required]],
      street_address_1: [street_address_1, [Validators.required]],
      street_address_2: [street_address_2, []],
      street_address_3: [street_address_3, [Validators.required]],
      message: [message, []]
    });

    if (this.providerCheckout.plan_type.is_business) {
      let company_name: string = '';
      let cnpj: string = '';
      let state_registration: string = '';

      if (this.providerCheckout.address.company_name)
        company_name = this.providerCheckout.address.company_name;

      if (this.cart.extra_data.hasOwnProperty('cnpj'))
        cnpj = this.cart.extra_data['cnpj'];
      if (this.cart.extra_data.hasOwnProperty('state_registration'))
        state_registration = this.cart.extra_data['state_registration'];

      this.formWizardStep01.addControl(
        'company_name',
        this.formBuilder.control(company_name, [Validators.required])
      );
      this.formWizardStep01.addControl(
        'cnpj',
        this.formBuilder.control(cnpj, [
          Validators.required,
          WDAValidators.cnpj()
        ])
      );
      this.formWizardStep01.addControl(
        'state_registration',
        this.formBuilder.control(state_registration, [])
      );
    }

    if (this.providerCheckout.selected_telephone_plan) {
      let portability_number: string = '';
      let portability_provider: string = '';

      if (this.cart.extra_data.hasOwnProperty('portability_number'))
        portability_number = this.cart.extra_data['portability_number'];
      if (this.cart.extra_data.hasOwnProperty('portability_provider'))
        portability_provider = this.cart.extra_data['portability_provider'];

      this.formWizardStep01.addControl(
        'portability_number',
        this.formBuilder.control(portability_number, [])
      );
      this.formWizardStep01.addControl(
        'portability_provider',
        this.formBuilder.control(portability_provider, [])
      );

      this.formWizardStep01
        .get('portability_number')
        .valueChanges.subscribe(value => {
          if (value) {
            this.formWizardStep01
              .get('portability_provider')
              .setValidators([Validators.required]);
          } else {
            this.formWizardStep01.get('portability_provider').setValidators([]);
          }
          this.formWizardStep01
            .get('portability_provider')
            .updateValueAndValidity({ emitEvent: false });
        });
      this.formWizardStep01
        .get('portability_provider')
        .valueChanges.subscribe(value => {
          if (value) {
            this.formWizardStep01
              .get('portability_number')
              .setValidators([Validators.required]);
          } else {
            this.formWizardStep01.get('portability_number').setValidators([]);
          }
          this.formWizardStep01
            .get('portability_number')
            .updateValueAndValidity({ emitEvent: false });
        });
    }

    //this.formWizardStep01.get('file_document').valueChanges.subscribe((value) => {
    //  console.log(value);
    //}, (error) => {
    //  console.log(error);
    //});
  }

  getFormValidationErrors() {
    Object.keys(this.formWizardStep01.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.formWizardStep01.get(key)
        .errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(
            'Key control: ' + key + ', keyError: ' + keyError + ', err value: ',
            controlErrors[keyError]
          );
        });
      }
    });
    return 'ERRORS?';
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

      this.cart.email = this.formWizardStep01.get('email').value;
      let cart_extra_data: object = this.providerCheckout.cartService.getExtraData();
      cart_extra_data['cpf'] = this.formWizardStep01.get('cpf').value;
      cart_extra_data['rg'] = this.formWizardStep01.get('rg').value;
      cart_extra_data['mobile'] = this.formWizardStep01.get('mobile').value;
      cart_extra_data['mobile_extra'] = this.formWizardStep01.get('mobile_extra').value;
      cart_extra_data['telephone'] = this.formWizardStep01.get('telephone').value;
      cart_extra_data['dob'] = this.formWizardStep01.get('dob').value;
      cart_extra_data['message'] = this.formWizardStep01.get('message').value;

      if (this.providerCheckout.plan_type.is_business) {
        this.providerCheckout.address.company_name = this.formWizardStep01.get('company_name').value;
        cart_extra_data['cnpj'] = this.formWizardStep01.get('cnpj').value;
        cart_extra_data['state_registration'] = this.formWizardStep01.get('state_registration').value;
      }

      if (this.providerCheckout.selected_telephone_plan) {
        cart_extra_data['portability_number'] = this.formWizardStep01.get('portability_number').value;
        cart_extra_data['portability_provider'] = this.formWizardStep01.get('portability_provider').value;
      }

      this.providerCheckout.saveAddress().then();
      this.providerCheckout.cartService.setExtraData(cart_extra_data);
      this.providerCheckout.cartService.updateCart().then(
        (cart: CartModel) => {
          this.providerCheckout.onWizardStep01Submit();
        },
        () => {
          this.formWizardStep01Submitted = false;
        }
      );
    } else {
      Object.keys(this.formWizardStep01.controls).forEach(field => {
        const control = this.formWizardStep01.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
