import {
  Component,
  OnInit,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormModel } from '../../models/Form.model';
import { AbstractForm } from "@core/data/src/lib/forms";
import { ErrorResponse } from "angular2-jsonapi";
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
  public showForm = true;
  public showSuccess = false;
  public showError = false;
  public showErrorValidation = false;
  public success_message = "Mensagem Enviada com sucesso!";
  public error_message = "Ocorreu um erro ao enviar sua mensagem, por favor tente novamente!"
  public error_validation = "Por favor, corrija os erros antes de enviar o formulário."

  constructor(private datastore: WebAngularDataStore) {
  }

  ngOnInit() {
    this.sub = this.datastore.findRecord(FormModel, this.id, {
      include: 'fields,actions'
    }).subscribe((form_model) => {
      this.form = form_model;
      if (this.form.success_message) {
        this.success_message = this.form.success_message;
      }
      if (this.form.error_message) {
        this.error_message = this.form.error_message;
      }

      if (this.form.error_validation) {
        this.error_validation = this.form.error_validation;
      }

      // Setting Validation Errors on the Group
      this.formGroup = this.form.getFormGroup() as AbstractForm;

    }, (error) => {

    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
  formSucess() {
    this.showSuccess = true;
    if (this.form.clear_complete) {
      this.formGroup.reset()
    }
    if (this.form.hide_complete) {
      this.showForm = false;
    }
  }

  onSubmit(event: Event) {
    this.showErrorValidation = false;
    this.showSuccess = false;
    this.showError = false;
    this.showForm = true;

    this.formGroup.formSubmitAttempts++;
    if (this.formGroup.valid) {
      this.formGroup.formSubmiting = true;
      this.submitForm().then(
        () => {

          this.formSucess();
        },
        () => {
          this.showError = true;
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
      this.showErrorValidation = true;
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
