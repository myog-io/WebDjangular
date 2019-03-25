import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import { CartTermModel } from '@plugins/store/src/lib/data/models/CartTerm.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'plugin-provider-checkout-wizard-step02',
  templateUrl: './step02.component.html',
  styleUrls: ['./step02.component.scss']
})
export class PluginProviderCheckoutWizardStep02Component
  implements OnInit, OnDestroy {
  public terms: CartTermModel[];
  public formWizardStep02: FormGroup;
  public formWizardStep02Submitted: boolean = false;
  public cart: CartModel;
  public showMigration: boolean = false;
  public ptSub: Subscription;
  public ctSub: Subscription;
  public mgSub: Subscription;
  constructor(
    public providerCheckout: ProviderCheckoutService,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formWizardStep02Submitted = false;

    this.cart = this.providerCheckout.cartService.cart;
    let paymentType: string = '';
    let contractTime: string = '2';

    if (this.cart.extra_data.hasOwnProperty('paymentType')) paymentType = this.cart.extra_data['paymentType'];
    if (this.cart.extra_data.hasOwnProperty('contractTime')) contractTime = this.cart.extra_data['contractTime'];
    // Checking if we have a migation of speed, has to have internetplan,
    if (this.providerCheckout.selected_internet_plan) {
      if (
        (this.providerCheckout.plan_type_fiber.indexOf(this.providerCheckout.selected_internet_plan.product.product_type.code) !== -1
          && this.providerCheckout.cartService.cart.extra_data.customer_type == 'internet_fibra')
        ||
        this.providerCheckout.plan_type_radio.indexOf(this.providerCheckout.selected_internet_plan.product.product_type.code) !== -1
        && this.providerCheckout.cartService.cart.extra_data.customer_type == 'internet_radio') {
        // This case is a migration of Speed
        this.showMigration = true;
      }
    }

    this.formWizardStep02 = this.formBuilder.group({
      paymentType: [paymentType, [Validators.required]],
      contractTime: [contractTime, []],
      isUpgrade: [this.providerCheckout.migration_type, this.showMigration ? [Validators.required] : []],
    });
    //this.config.forEach(control => group.addControl(control.name, this.fb.control()));
    // group;

    this.providerCheckout.cartService
      .getCartTerms()
      .then((terms: CartTermModel[]) => {
        this.terms = terms;
        this.terms.forEach(term => {
          term.content = term.content.replace(
            '{{user.first_name}}',
            this.providerCheckout.address.first_name
          );

          this.formWizardStep02.addControl(
            `term-${term.id}`,
            this.formBuilder.control('', [Validators.requiredTrue])
          );
        });
      });
    // Checking if Payment Type Changes
    this.ptSub = this.formWizardStep02.get('paymentType').valueChanges.subscribe(value => {
      this.updateCartExtraData('paymentType', value);
    });
    // Checking if Contract time is changing
    this.ctSub = this.formWizardStep02.get('contractTime').valueChanges.subscribe(value => {
      this.updateCartExtraData('contractTime', value);
    });
    // Checking if the Migration Form is chaning
    this.mgSub = this.formWizardStep02.get('isUpgrade').valueChanges.subscribe(value => {
      this.updateCartExtraData('migration_type', value);
    })
  }
  updateCartExtraData(key, value) {
    let cart_extra_data: object = this.providerCheckout.cartService.getExtraData();
    cart_extra_data[key] = value;
    this.providerCheckout.updating_cart = true;
    this.providerCheckout.cartService.updateCart().then(
      (cart: CartModel) => {
        this.providerCheckout.updating_cart = false;
      },
      () => {
        this.providerCheckout.updating_cart = false;
      }
    );
  }
  ngOnDestroy(): void {
    if (this.ctSub) {
      this.ctSub.unsubscribe();
      this.ctSub = null;
    }
    if (this.ptSub) {
      this.ptSub.unsubscribe();
      this.ptSub = null;
    }
    if (this.mgSub) {
      this.mgSub.unsubscribe();
      this.mgSub = null;
    }
  }

  onSubmit() {
    if (this.formWizardStep02.valid) {
      this.formWizardStep02Submitted = true;
      this.providerCheckout.onWizardStep02Submit().then(
        () => {
          this.formWizardStep02Submitted = false;
        },
        () => {
          this.formWizardStep02Submitted = false;
        }
      );
    } else {
      Object.keys(this.formWizardStep02.controls).forEach(field => {
        const control = this.formWizardStep02.get(field);
        console.log(control, control.errors)
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
