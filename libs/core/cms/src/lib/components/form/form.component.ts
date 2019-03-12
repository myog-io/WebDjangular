import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  SimpleChanges, OnChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormModel } from '../../models/Form.model';
import { FormGroup } from '@angular/forms';
import { AbstractForm } from "@core/data/src/lib/forms";
import { OrderModel } from "@plugins/store/src/lib/data/models/Order.model";
import { ErrorResponse } from "angular2-jsonapi";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormSubmittedModel } from "@core/cms/src/lib/models/FormSubmittedModel";
/*
<ng-container wdaBuilderFormFields [config]="field" [group]="group"
                (relationshipUpdated)="relationship($event)"></ng-container>
                */
@Component({
  selector: 'wda-form',
  styleUrls: ['form.component.scss'],
  templateUrl: 'form.component.html',
})
export class CoreCmsFormComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() title_class: string;

  public sub: Subscription;
  public form: FormModel;
  public formGroup: AbstractForm;


  constructor(private datastore: WebAngularDataStore) {
  }

  ngOnInit() {
    this.sub = this.datastore.findRecord(FormModel, this.id, {
      include: 'fields,actions'
    }).subscribe((form_model) => {
      this.form = form_model;
      this.formGroup = this.form.getFormGroup() as AbstractForm;
    }, (error) => {
    }
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }

  onSubmit(event: Event) {
    this.formGroup.formSubmitAttempts++;
    if (this.formGroup.valid) {
      this.formGroup.formSubmiting = true;
      this.submitForm().then(
        () => {
          console.log("SUCCESS!");
        }, () => {
          console.log("FAILED!");
        }
      ).finally(() => {
        this.formGroup.formSubmiting = false;
      });

      /*
        public formSubmitAttempts : number = 0;
        public formSubmiting: Boolean = false;
        public formSubmittedSuccess: Boolean = false;
       */

    } else {
      Object.keys(this.formGroup.controls).forEach(field => {
        const control = this.formGroup.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }


  relationship(event: Event) {
    console.log(event);
  }


  action(image: any) {
    console.log('action');
  }


  private submitForm(): Promise<FormSubmittedModel> {
    return new Promise((resolve, reject) => {
      this.datastore.createRecord(FormSubmittedModel, {
        form: this.form,
        data: JSON.stringify(this.formGroup.value)
      }).save().subscribe(
        (formSubmitted: FormSubmittedModel) => {
          resolve(formSubmitted);
        }, (error: ErrorResponse) => {
          reject(error);
        }
      );
    });
  }



}
