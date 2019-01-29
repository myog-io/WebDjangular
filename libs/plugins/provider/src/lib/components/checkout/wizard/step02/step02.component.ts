import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProviderCheckoutService} from "../../../../data/services/provider-checkout.service";
import {CartTermModel} from "@plugins/store/src/lib/data/models/CartTerm.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CartModel} from "@plugins/store/src/lib/data/models/Cart.model";

@Component({
  selector: 'plugin-provider-checkout-wizard-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss'],
})
export class PluginProviderCheckoutWizardStep02Component implements OnInit, OnDestroy {

  public terms: CartTermModel[];
  public formWizardStep02: FormGroup;
  public formWizardStep02Submitted: boolean = false;
  public cart: CartModel;

  constructor(public providerCheckout: ProviderCheckoutService,
              public formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.formWizardStep02Submitted = false;

    this.cart = this.providerCheckout.cartService.cart;
    let paymentType: string = '';
    let contractTime: string = '2';

    if (this.cart.extra_data.hasOwnProperty('paymentType')) paymentType = this.cart.extra_data['paymentType'];
    if (this.cart.extra_data.hasOwnProperty('contractTime')) contractTime = this.cart.extra_data['contractTime'];

    this.formWizardStep02 = this.formBuilder.group({
      paymentType: [paymentType, [Validators.required]],
      contractTime: [contractTime, []]
    });
    //this.config.forEach(control => group.addControl(control.name, this.fb.control()));
    // group;

    this.providerCheckout.cartService.getCartTerms().then((terms:CartTermModel[])=>{
      this.terms = terms;
      this.terms.forEach((term) => {

        term.content = term.content.replace("{{user.first_name}}",
          this.providerCheckout.address.first_name);

        this.formWizardStep02.addControl( `term-${term.id}`,
          this.formBuilder.control('', [Validators.requiredTrue]));
      });
    });

    this.formWizardStep02.get('paymentType').valueChanges.subscribe(
      (value)=>{
        let cart_extra_data: object = this.providerCheckout.cartService.getExtraData();
        cart_extra_data['paymentType'] = this.formWizardStep02.get('paymentType').value;
        this.providerCheckout.cartService.updateCart().then((cart: CartModel) => {

        }, () => {

        })
    });
    this.formWizardStep02.get('contractTime').valueChanges.subscribe(
      (value)=>{
        let cart_extra_data: object = this.providerCheckout.cartService.getExtraData();
        cart_extra_data['contractTime'] = this.formWizardStep02.get('contractTime').value;
        this.providerCheckout.cartService.updateCart().then((cart: CartModel) => {

        }, () => {

        })
    });
  }

  ngOnDestroy(): void {

  }

  onSubmit() {
    this.formWizardStep02Submitted = true;
    if (this.formWizardStep02.valid) {
      this.providerCheckout.onWizardStep02Submit()
    }
  }



}
