import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NbToastrService } from '@nebular/theme';
import {
  CoreConfigGroupModel,
  CoreConfigInputModel
} from '@core/data/src/lib/models';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'wda-core-config-group',
  styleUrls: ['./core-config-group.component.scss'],
  template: `
    <wda-form-builder
      [before_title]=""
      [title]="configGroup?.title"
      [displayGroups]="form.displayGroups"
      (onSubmit)="onSubmit()"
      submit_label="Save Config"
      (relationshipUpdated)="relationshipUpdated($event)"
      [group]="form"
      [loading]="loading"
      [formLoading]="formLoading"
    ></wda-form-builder>
  `
})
export class CoreConfigGroupComponent implements OnInit, OnDestroy {
  /**
   * Id  of core config group component
   */
  id: string;
  /**
   * Sub  of core config group component
   */
  private sub: any;
  /**
   * Group  of core config group component
   */
  public configGroup: CoreConfigGroupModel;
  /**
   * Inputs  of core config group component
   */
  public inputs: CoreConfigInputModel[] = [];

  /**
   * Form  of core config group component
   */
  public form: AbstractForm;

  /**
   * Loading state
   */
  public loading: boolean = false;
  public formLoading: boolean = true;
  /**
   * Creates an instance of core config group component.
   * @param route
   * @param datastore
   */
  constructor(
    private route: ActivatedRoute,
    private datastore: WebAngularDataStore,
    private toaster: NbToastrService
  ) { }

  /**
   * on init
   */
  ngOnInit() {
    this.form = new AbstractForm(this.datastore);
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
        this.loadConfigGroup();
      } else {
        // Redirect to Dashboard
      }
    });
  }

  /**
   * on destroy
   */
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  /**
   * Loads config group
   */
  loadConfigGroup() {
    this.datastore
      .findRecord(CoreConfigGroupModel, this.id)
      .subscribe((data: CoreConfigGroupModel) => {
        this.configGroup = data;
        this.loadConfigInput();
      });
  }

  /**
   * Loads config input
   */
  loadConfigInput() {
    this.inputs = [];
    this.datastore
      .findAll(CoreConfigInputModel, { group: this.id })
      .subscribe((data: any) => {
        this.inputs = data.getModels();
        this.configGroup.inputs = this.inputs;
        this.form.formFields = this.configGroup.formFieldsConfigs;
        this.form.displayGroups[0].groups[0].fields = this.form.formFields;
        this.form.generateForm();
        this.configGroup.updateValues();
        this.form.populateForm(this.configGroup.value);
        this.formLoading = false;
      });
  }
  /**
   * relationshipUpdated
   * @param $event relationshipUpdated
   */
  relationshipUpdated($event) {
    console.log($event);
  }
  /**
   * Submit Form Values
   */
  onSubmit() {
    this.loading = true;
    const data = this.form.value;

    // Doing this a little bit more manually beucase the way we treat the CoreConfig, it's not a direct relationship
    for (let i = 0; i < this.configGroup.inputs.length; i++) {
      this.configGroup.inputs[i]['value'] = null;
      this.configGroup.inputs[i]['value'] = data[this.configGroup.inputs[i].id];

    }

    this.configGroup.updateValues();
    const sub = this.configGroup.save().subscribe(
      result => {
        this.toaster.success(`Changes have been saved`, `Success!`);
        this.loading = false;
        sub.unsubscribe();
      },
      (error: any) => {
        this.loading = false;
        if (error.errors && error.errors.length > 0) {
          for (let i = 0; i < error.errors.length; i++) {
            // TODO: Check pointer to see if is for an specific field and set an error inside the field
            const element = error.errors[i];
            this.toaster.danger(
              `Error saving the Changes, Details: ${element.detail}`,
              `Error!`,
              { duration: 5000 }
            );
          }
        } else {
          this.toaster.danger(`Error saving the Changes`, `Error!`);
        }
      }
    );
  }
}
