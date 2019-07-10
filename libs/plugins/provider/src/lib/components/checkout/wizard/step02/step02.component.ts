import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../../data/services/provider-checkout.service';
import { CartTermModel } from '@plugins/store/src/lib/data/models/CartTerm.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import { Subscription } from 'rxjs';
import { OrderModel } from '@plugins/store/src/lib/data/models/Order.model';
import { MediaModel } from '@core/media/src/lib/models/Media.model';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

import { MediaService } from '@core/media/src/lib/core-media.service';
import { ErrorResponse } from 'angular2-jsonapi';
import { HttpHeaders } from '@angular/common/http';
import { file } from '@babel/types';


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
  public showMigration = false;
  public showDueDate = false;
  public ptSub: Subscription;
  public ctSub: Subscription;
  public mgSub: Subscription;
  public dueSub: Subscription;
  public error: string = null;
  public possibleDueDates: any[] = null;
  public maxYearsContract: any = [
    'Sem Fidelidade',
    '1 Ano',
    '2 Anos',
  ];
  public photo_identity_array = [];

  public yearString = "Anos";
  constructor(
    public providerCheckout: ProviderCheckoutService,
    public formBuilder: FormBuilder,
    public mediaService: MediaService,
    private datastore: WebAngularDataStore,
  ) {
    this.generatingContractTime();
    //mediaService.options.additionalParameter.is_secure = true;
  }

  ngOnInit() {
    this.formWizardStep02Submitted = false;
    this.possibleDueDates = this.providerCheckout.providerConfig.due_date ? this.providerCheckout.providerConfig.due_date.split(',') : null;
    if (this.possibleDueDates && this.possibleDueDates.length > 0 && this.providerCheckout.cartService.cart.extra_data.customer_type === 'new') {
      // Only show if it's new customer, not migrations
      this.showDueDate = true;
    }
    this.cart = this.providerCheckout.cartService.cart;
    let paymentType: string = '';
    let dueDay: string = '';
    const contractTime = {
      value: this.providerCheckout.providerConfig.max_year_contract || 2,
      disabled: false,
    };

    if (this.cart.extra_data.hasOwnProperty('paymentType')) paymentType = this.cart.extra_data['paymentType'];
    if (this.cart.extra_data.hasOwnProperty('contractTime')) contractTime.value = this.cart.extra_data['contractTime'];
    if (this.cart.extra_data.hasOwnProperty('dueDay')) dueDay = this.cart.extra_data['dueDay'];
    if (this.cart.extra_data.hasOwnProperty('photo_identity_array')){
      console.log(this.cart.extra_data['photo_identity_array']);
      this.cart.extra_data['photo_identity_array'].forEach(photo_identity => {
        if(photo_identity.media_id){
          this.datastore
            .findRecord(MediaModel, photo_identity.media_id, {}, new HttpHeaders({ Authorization: 'none' }))
            .subscribe(
              (media: MediaModel) => {
                console.log(media);
                this.onAddedPhotoIdentity(media, false)
              },
              (error: ErrorResponse) => {
                this.onRemovedPhotoIdentity(photo_identity.media_id, false);
              }
            );
        }
       
      });

      /*
        */
    } 

    if (!this.providerCheckout.selected_internet_plan) {
      // Forcing Contract Time with 1 year
      // TODO: This also should be dynamic
      contractTime.value = '1';
      contractTime.disabled = true;
    }
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
      dueDay: [dueDay, this.showDueDate ? [Validators.required] : []],
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
    // Checking if the Migration Form is changing
    this.mgSub = this.formWizardStep02.get('isUpgrade').valueChanges.subscribe(value => {
      this.providerCheckout.migration_type = value;
      this.updateCartExtraData('migration_type', value);
    })
    // Checking if the DueDate form is changing
    this.dueSub = this.formWizardStep02.get('dueDay').valueChanges.subscribe(value => {
      this.updateCartExtraData('dueDay', value);
    })
  }
  /**
   * This function will make the logic behind the Contract Time
   */
  generatingContractTime() {
    // Starting the Value
    this.maxYearsContract = [
      'Sem Fidelidade',
      '1 Ano',
      '2 Anos',
    ];

    if (this.providerCheckout.providerConfig.max_year_contract && this.providerCheckout.providerConfig.max_year_contract != 2) {
      let contracts = [];

      for (let i = 0; i <= this.providerCheckout.providerConfig.max_year_contract; i++) {
        if (i > 1) {
          contracts[i] = `${i} ${this.yearString}`;
        } else {
          contracts[i] = this.maxYearsContract[i];
        }
      }

      this.maxYearsContract = contracts;
    }
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
    if (this.dueSub) {
      this.dueSub.unsubscribe();
      this.dueSub = null;
    }
  }

  onSubmit() {
    this.error = null;
    if(this.providerCheckout.has_reseller) {
      if(this.photo_identity_array.length == 0) {
        this.error = `Por favor, coloque um documento de identidade.`
        return;
      }
    }
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
  onPhotoIdentityUpdateFinished(event) {
    let file_photo_identity: MediaModel = new MediaModel(this.datastore, event['response']['data']);
    this.onAddedPhotoIdentity(file_photo_identity);
  }

  onPhotoIdentityUploadError(event) {
    // TODO: Feedback when error of upload
  }

  removePhotoIdentity(event, media_id) {
    console.log(media_id);
    this.datastore.deleteRecord(MediaModel, media_id, new HttpHeaders({ Authorization: 'none' }))
      .subscribe(
        response => {
          this.onRemovedPhotoIdentity(media_id);
        },
        error => {
          // TODO: show some error
        }
      );
    
  }

  private onAddedPhotoIdentity(file_photo_identity: MediaModel, updateCartExtraData: boolean = true){
    this.photo_identity_array.push({
      'media_id': file_photo_identity.id,
      'media_extension': file_photo_identity.file.split('.').pop(), //file_photo_identity.extension,
      'media_url': file_photo_identity.absoluteUrl
    });
    console.log(this.photo_identity_array);
    if(updateCartExtraData){
      this.providerCheckout.updateCartExtraData('photo_identity_array', this.photo_identity_array);
    }
  }

  private onRemovedPhotoIdentity(media_id, updateCartExtraData: boolean = true) {
    this.photo_identity_array =  this.photo_identity_array.filter(obj => {
      return obj.media_id !== media_id; 
    });
    if(updateCartExtraData){
      this.providerCheckout.updateCartExtraData('photo_identity_array', this.photo_identity_array);
    }
  }

}
