import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import { CartTermModel } from '@plugins/store/src/lib/data/models/CartTerm.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import { Subscription } from 'rxjs';
import { OrderModel } from '@plugins/store/src/lib/data/models/Order.model';

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
  public error: string = null;
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
        (this.providerCheckout.plan_type_fiber === this.providerCheckout.selected_internet_plan.product.product_type.code
          && this.providerCheckout.cartService.cart.extra_data.customer_type == 'internet_fibra')
        ||
        (this.providerCheckout.plan_type_radio === this.providerCheckout.selected_internet_plan.product.product_type.code
          && this.providerCheckout.cartService.cart.extra_data.customer_type == 'internet_radio')) {
        // This case is a migration of Speed
        this.showMigration = true;

      } else {
        this.providerCheckout.migration_type = null;
      }
    } else {
      this.providerCheckout.migration_type = null;
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
      this.providerCheckout.migration_type = value;
      this.updateCartExtraData('migration_type', value);
    })
  }
  updateCartExtraData(key, value) {
    this.providerCheckout.updating_cart = true;
    this.providerCheckout.updateCartExtraData(key, value).then(
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
    this.error = null;
    if (!this.providerCheckout.address.first_name.trim() || !this.providerCheckout.address.last_name.trim()) {
      this.error = `Por favor, volte ao passo "Dados de Assinatura" e preencha seu <b>Nome Completo</b>, caso o erro persista copie o link do carrinho e envie para nosso email de suporte`
      return;
    }

    if (this.formWizardStep02.valid) {
      this.formWizardStep02Submitted = true;
      // Extra Cart Update Just to get the New Fees
      this.providerCheckout.updateCartExtraData().then(
        (cart: CartModel) => {
          this.providerCheckout.onWizardStep02Submit().then(
            (order: OrderModel) => {
              this.formWizardStep02Submitted = false;
            },
            (error: any) => {
              // We Got an error, could be varius things
              this.formWizardStep02Submitted = false;
              if (error.errors) {
                for (let i = 0; i < error.errors.length; i++) {
                  const cur_error = error.errors[i];
                  if (cur_error.detail === 'Missing Email') {
                    this.error = `Por favor, volte ao passo "Dados de Assinatura" e preencha um <b>Email Válido</b>, caso o erro persista copie o link do carrinho e envie para nosso email de suporte`;
                  } else if (cur_error.detail === 'Missing Name') {
                    this.error = `Por favor, volte ao passo "Dados de Assinatura" e preencha seu <b>Nome Completo</b>, caso o erro persista copie o link do carrinho e envie para nosso email de suporte`;
                  }
                }
              }
              if (!this.error) {
                this.error = `Encontramos um erro não identificado, 
                um alerta com detalhes do erro ja foi enviado para nossa equipe!<br>
                Por favor começe novamente sua assinatura!`
              }
            }
          );
        },
        () => {
          this.providerCheckout.updating_cart = false;
        }
      );

    } else {
      Object.keys(this.formWizardStep02.controls).forEach(field => {
        const control = this.formWizardStep02.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }
}
