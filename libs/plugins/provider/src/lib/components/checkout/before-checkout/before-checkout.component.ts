import {Component, OnInit, OnDestroy} from '@angular/core';
import {ProviderCheckoutService} from "../../../data/services/provider-checkout.service";
import { Subscription, of } from 'rxjs';
import { CondoModel, CityModel } from '../../../data';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormControl, AbstractControl, Validators } from '@angular/forms';


@Component({
  selector: 'plugin-provider-checkout-before-checkout',
  templateUrl: './before-checkout.component.html',
  styleUrls: ['./before-checkout.component.scss'],
})
export class PluginProviderCheckoutBeforeCheckoutComponent implements OnInit, OnDestroy {
  
  providerCheckout: ProviderCheckoutService;
  subCondo: Subscription;
  subPostalCode: Subscription;
  condos: Subscription;
  show_condos = false;

  constructor(
    providerCheckout: ProviderCheckoutService,
    private datastore: WebAngularDataStore,
  ) {
    this.providerCheckout = providerCheckout;
  }

  ngOnInit() {
    this.subCondo = this.providerCheckout.formBeforeCheckout.get('typeOfAccess').valueChanges.subscribe((type:string) => {
      this.checkCondos(type);
    });
    this.subPostalCode = this.providerCheckout.formBeforeCheckout.get('postalCode').valueChanges.subscribe((PostalCode:string) => {
      
      this.providerCheckout.getCurrentCity().then((city)=>{

      });
    });
    this.checkCondos(this.providerCheckout.formBeforeCheckout.get('typeOfAccess').value);
  }

  checkCondos(type) {
    if (type == 'condominio_empresarial' || type == 'condominio_residencial') {
      this.show_condos = true;
      this.providerCheckout.findCondos();
      this.addValidation(this.providerCheckout.formBeforeCheckout.get('condo'));
      this.addValidation(this.providerCheckout.formBeforeCheckout.get('condoNumber'));
    }else{
      this.show_condos = false;
      this.providerCheckout.condos = of(null);
      this.cleanAndRemoveValudation(this.providerCheckout.formBeforeCheckout.get('condo'));
      this.cleanAndRemoveValudation(this.providerCheckout.formBeforeCheckout.get('condoNumber'));
    }
  }

  cleanAndRemoveValudation(control:AbstractControl){
    control.clearValidators();
    control.setValue('');
    control.updateValueAndValidity();
  }

  addValidation(control:AbstractControl) {
    control.setValidators([Validators.required]);
    control.updateValueAndValidity();
  }


  ngOnDestroy() {
    if (this.subCondo) { 
      this.subCondo.unsubscribe();
      this.subCondo = null;
    }
    if (this.subPostalCode) { 
      this.subPostalCode.unsubscribe();
      this.subPostalCode = null;
    }
  }


}
