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
import {AbstractForm} from "@core/data/src/lib/forms";
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
    console.log('CoreCmsFormComponent');
  }

  ngOnInit() {
    console.log('ng on init');
    this.sub = this.datastore.findRecord(FormModel, this.id, {
      include:'fields,actions'}).subscribe((form_model) => {
        this.form = form_model;
        this.formGroup = this.form.getFormGroup() as AbstractForm;
        console.log(this.formGroup);
      }, (error) => {
        console.log(error)
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
    if(this.formGroup.valid) {
      this.formGroup.formSubmiting = true;


      // this.formGroup.formSubmiting = true;
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

}
