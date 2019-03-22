import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProviderCheckoutService } from '../../../data/services/provider-checkout.service';
import { Observable, Subscription } from 'rxjs';
import { CondoModel, ResellerModel } from '../../../data';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { AbstractControl, Validators } from '@angular/forms';
import { PlanTypeModel } from '../../../data/models/PlanType.model';
import { HttpHeaders } from '@angular/common/http';
import { JsonApiQueryData } from 'angular2-jsonapi';

@Component({
  selector: 'plugin-provider-checkout-before-checkout',
  templateUrl: './before-checkout.component.html',
  styleUrls: ['./before-checkout.component.scss']
})
export class PluginProviderCheckoutBeforeCheckoutComponent
  implements OnInit, OnDestroy {
  providerCheckout: ProviderCheckoutService;
  formSub: Subscription;
  condoSub: Subscription;
  subPostalCode: Subscription;
  condos: CondoModel[];
  show_condos = false;
  resellers: Observable<ResellerModel[]>;
  plan_types: Observable<PlanTypeModel[]>;
  plan_types_list: PlanTypeModel[];
  public cep_error: string | boolean = false;
  constructor(
    providerCheckout: ProviderCheckoutService,
    private datastore: WebAngularDataStore
  ) {
    this.providerCheckout = providerCheckout;
  }

  ngOnInit() {
    this.formSub = this.providerCheckout.formBeforeCheckout
      .get('typeOfAccess')
      .valueChanges.subscribe((type_id: string) => {
        this.checkCondos(this.plan_types_list.find(type => type.id == type_id));
      });
    this.condoSub = this.providerCheckout.formBeforeCheckout
      .get('condo')
      .valueChanges.subscribe((condo_id: string) => {
        if (this.condos) {
          this.providerCheckout.condo = this.condos.find(
            condo => condo.id == condo_id
          );
        }
      });
    this.subPostalCode = this.providerCheckout.formBeforeCheckout
      .get('postalCode')
      .valueChanges.subscribe((PostalCode: string) => {
        this.providerCheckout.getCurrentCity().then(
          (city) => {
            if (city) {
              this.cep_error = false;
            }
          },
          (error) => {
            if (error.errors) {
              for (let i = 0; i < error.errors.length; i++) {
                const element = error.errors[i];
                if (element.detail) {
                  this.cep_error = element.detail
                }
              }
            } else {
              this.cep_error = "Erro desconhecido, por favor digite o CEP novamente"
            }
          });
      });

    this.plan_types = this.datastore
      .findAll(PlanTypeModel, null, new HttpHeaders({ Authorization: 'none' }))
      .map(query => {
        this.plan_types_list = query.getModels();
        this.checkCondos(
          this.plan_types_list.find(
            type => type.id == this.providerCheckout.formBeforeCheckout.get('typeOfAccess').value
          )
        );
        return this.plan_types_list;
      });
    if (this.providerCheckout.has_reseller) {
      this.providerCheckout.formBeforeCheckout
        .get('reseller')
        .setValidators([Validators.required]);
      this.providerCheckout.formBeforeCheckout
        .get('reseller')
        .updateValueAndValidity({ emitEvent: false });
      this.resellers = this.datastore
        .findAll(
          ResellerModel,
          { active: true },
          new HttpHeaders({ Authorization: 'none' })
        )
        .map((query: JsonApiQueryData<ResellerModel>) => {
          return query.getModels();
        });
    }
  }

  checkCondos(plan_type: PlanTypeModel) {
    if (plan_type) {
      this.providerCheckout.plan_type = plan_type;
      if (plan_type.is_condo) {
        this.show_condos = true;
        this.findCondos();
        this.addValidation(
          this.providerCheckout.formBeforeCheckout.get('condo')
        );
        this.addValidation(
          this.providerCheckout.formBeforeCheckout.get('condoNumber')
        );
      } else {
        this.show_condos = false;
        this.cleanAndRemoveValudation(
          this.providerCheckout.formBeforeCheckout.get('condo')
        );
        this.cleanAndRemoveValudation(
          this.providerCheckout.formBeforeCheckout.get('condoNumber')
        );
      }
    }
  }

  public findCondos() {
    this.datastore
      .findAll(
        CondoModel,
        { city__id: this.providerCheckout.city.id },
        new HttpHeaders({ Authorization: 'none' })
      )
      .subscribe(
        (query: JsonApiQueryData<CondoModel>) =>
          (this.condos = query.getModels())
      );
  }

  cleanAndRemoveValudation(control: AbstractControl) {
    control.clearValidators();
    control.setValue('');
    this.providerCheckout.condo = null;
    control.updateValueAndValidity();
  }

  addValidation(control: AbstractControl) {
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }

  ngOnDestroy() {
    if (this.formSub) {
      this.formSub.unsubscribe();
      this.formSub = null;
    }
    if (this.subPostalCode) {
      this.subPostalCode.unsubscribe();
      this.subPostalCode = null;
    }
    if (this.condoSub) {
      this.condoSub.unsubscribe();
      this.condoSub = null;
    }
  }
}
