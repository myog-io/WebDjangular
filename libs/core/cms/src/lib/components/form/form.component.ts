import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormModel } from '../../models/Form.model';
import { FormGroup } from '@angular/forms';
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
  public formGroup: FormGroup;
  
  constructor(private datastore: WebAngularDataStore) {

  }


  ngOnInit() {
    this.sub = this.datastore.findRecord(FormModel, this.id, {include:'fields,actions'})
      .subscribe((form_model) => {
        this.form = form_model;
        console.log("Form???",this.form)
        this.formGroup = this.form.getFormGroup();
      }, (error) => {
        console.log(error)
      }
    );

  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe()
      this.sub = null;
    }
  }

  action(image: any) {

  }

}
