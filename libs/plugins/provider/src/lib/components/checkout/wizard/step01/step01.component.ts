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
      if (this.providerCheckout.address.first_name)
        name += this.providerCheckout.address.first_name;
      if (this.providerCheckout.address.last_name)
        name += this.providerCheckout.address.last_name;
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
    if (this.cart.extra_data.hasOwnProperty('cpf'))
      cpf = this.cart.extra_data['cpf'];
    if (this.cart.extra_data.hasOwnProperty('rg'))
      rg = this.cart.extra_data['rg'];
    if (this.cart.extra_data.hasOwnProperty('mobile'))
      mobile = this.cart.extra_data['mobile'];
    if (this.cart.extra_data.hasOwnProperty('telephone'))
      telephone = this.cart.extra_data['telephone'];
    if (this.cart.extra_data.hasOwnProperty('dob'))
      dob = this.cart.extra_data['dob'];

    this.formWizardStep01 = this.formBuilder.group({
      name: [name, [Validators.required, Validators.minLength(2)]],
      email: [email, [Validators.required, Validators.email]],
      mobile: [mobile, [Validators.required, Validators.minLength(11)]],
      telephone: [telephone],
      cpf: [cpf, [Validators.required, this.CPFValidator()]],
      rg: [rg, [Validators.required, this.RGValidator()]],
      dob: [
        dob,
        [
          Validators.required,
          Validators.minLength(10),
          this.DateValidator(),
          this.Over18Validator()
        ]
      ],
      //file_document: ['', [Validators.required]],
      postal_code: [postal_code, [Validators.required]],
      city: [city, [Validators.required]],
      state: [state, [Validators.required]],
      number: [number, [Validators.required]],
      street_address_1: [street_address_1, [Validators.required]],
      street_address_2: [street_address_2, []],
      street_address_3: [street_address_3, [Validators.required]]
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
          this.CNPJValidator()
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

  DateValidator(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const date = control.value;
      if (date.length < 10) {
        return null;
      }
      const m = moment(date, 'DD/MM/YYYY');
      if (!m.isValid()) {
        return { invalidDate: true };
      }
      return null;
    };
  }

  Over18Validator(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const date = control.value;
      if (date.length < 10) {
        return null;
      }
      const birthday = moment(date, 'DD/MM/YYYY');
      const age = moment().diff(birthday, 'years');
      if (age <= 18) {
        return { notOver18: true };
      }
      return null;
    };
  }

  CPFValidator(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const cpf = control.value;
      if (cpf) {
        let numbers, digits, sum, i, result, equalDigits;
        equalDigits = 1;

        if (cpf.length < 11) {
          return { invalidCPF: true };
        }

        for (i = 0; i < cpf.length - 1; i++) {
          if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
            equalDigits = 0;
            break;
          }
        }

        if (!equalDigits) {
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for (i = 10; i > 1; i--) {
            sum += numbers.charAt(10 - i) * i;
          }

          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(0))) {
            return { invalidCPF: true };
          }
          numbers = cpf.substring(0, 10);
          sum = 0;

          for (i = 11; i > 1; i--) {
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if (result !== Number(digits.charAt(1))) {
            return { invalidCPF: true };
          }
          return null;
        } else {
          return { invalidCPF: true };
        }
      }
      return null;
    };
  }

  RGValidator(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const rg = control.value;
      if (rg) {
        if (rg.length < 8) {
          return { invalidRG: true };
        }
      }
      return null;
    };
  }

  CNPJValidator(): ValidatorFn {
    return (control: AbstractControl): Validators => {
      const cnpj = control.value;
      if (cnpj) {
        if (cnpj.length != 14) return { invalidCNPJ: true };

        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(0)) return { invalidCNPJ: true };

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2) pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
        if (resultado != digitos.charAt(1)) {
          return { invalidCNPJ: true };
        }
        return null;
      }
      return null;
    };
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
      cart_extra_data['telephone'] = this.formWizardStep01.get(
        'telephone'
      ).value;
      cart_extra_data['dob'] = this.formWizardStep01.get('dob').value;

      if (this.providerCheckout.plan_type.is_business) {
        this.providerCheckout.address.company_name = this.formWizardStep01.get(
          'company_name'
        ).value;
        cart_extra_data['cnpj'] = this.formWizardStep01.get('cnpj').value;
        cart_extra_data['state_registration'] = this.formWizardStep01.get(
          'state_registration'
        ).value;
      }

      if (this.providerCheckout.selected_telephone_plan) {
        cart_extra_data['portability_number'] = this.formWizardStep01.get(
          'portability_number'
        ).value;
        cart_extra_data['portability_provider'] = this.formWizardStep01.get(
          'portability_provider'
        ).value;
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
        console.log(control, control.errors)
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
