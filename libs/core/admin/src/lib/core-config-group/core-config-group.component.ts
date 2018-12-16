
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, } from "@angular/router";
import { WebAngularDataStore } from "@webdjangular/core/services";
import { CoreConfigGroupModel } from "libs/core/data/src/lib/models/CoreConfigGroup.model";
import { CoreConfigInputModel } from "libs/core/data/src/lib/models/CoreConfigInput.model";
import { AbstractForm } from "@webdjangular/core/data-forms";
import { BuilderFormDisplayGroups } from "libs/core/builder/src/lib/interfaces/form-config.interface";

@Component({
  selector: 'wda-core-config-group',
  styleUrls: ['./core-config-group.component.scss'],
  template: `
    <wda-form [before_title]="''" [title]="group?.title"
    [displayGroups]="form.displayGroups" (onSubmit)="onSubmit()"
    submit_label="Save Config" (relationshipUpdated)="relationshipUpdated($event)"
    [group]="form" [loading]="loading" [formLoading]="formLoading"></wda-form>
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
  ) {
  }

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
    this.datastore.findRecord(CoreConfigGroupModel, this.id).subscribe((data: CoreConfigGroupModel) => {
      this.configGroup = data;
      this.loadConfigInput()
    })

  }

  /**
   * Loads config input
   */
  loadConfigInput() {
    this.inputs = [];
    this.datastore.findAll(CoreConfigInputModel, { group: this.id }).subscribe((data: any) => {
      this.inputs = data.getModels();
      this.configGroup.inputs = this.inputs;
      this.form.formFields = this.configGroup.formFieldsConfigs;
      this.form.displayGroups[0].groups[0].fields = this.form.formFields;
      this.form.generateForm();
      this.configGroup.updateValues();
      this.form.populateForm(this.configGroup.value);
      this.formLoading = false;

    })
  }

  /**
   * Submit Form Values
   */
  onSubmit() {
    this.loading = true;
    const data = this.form.value;
    // Doing this a little bit more manually beucase the way we treat the CoreConfig, it's not a direct relationship
    for (let i = 0; i < this.configGroup.inputs.length; i++) {
      this.configGroup.inputs[i]['value'] = data[this.configGroup.inputs[i].id];
    }
    this.configGroup.updateValues();
    const sub = this.configGroup.save().subscribe(
      (result) => {
        this.loading = false;
        sub.unsubscribe();
      },
      (error: any) => {
        this.loading = false;
      }
    )
  }
}
