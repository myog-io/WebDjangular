
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, } from "@angular/router";
import { WebAngularDataStore } from "@webdjangular/core/services";
import { CoreConfigGroupModel } from "libs/core/data/src/lib/models/CoreConfigGroup.model";
import { CoreConfigInputModel } from "libs/core/data/src/lib/models/CoreConfigInput.model";
import { AbstractForm } from "@webdjangular/core/data-forms";
import { BuilderFormFieldConfig } from "@webdjangular/core/builder";

@Component({
  selector: 'wda-core-config-group',
  styleUrls: ['./core-config-group.component.scss'],
  templateUrl: './core-config-group.component.html',
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
  public group: CoreConfigGroupModel;
  /**
   * Inputs  of core config group component
   */
  public inputs: CoreConfigInputModel[] = [];
  public fields: BuilderFormFieldConfig[] = [];
  /**
   * Form  of core config group component
   */
  public form: AbstractForm;

  /**
   * Loading state
   */
  public loading: boolean = false;
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
      this.group = data;
      this.loadConfigInput()
    })

  }

  /**
   * Loads config input
   */
  loadConfigInput() {
    this.inputs = [];
    this.fields = [];

    this.datastore.findAll(CoreConfigInputModel, { group: this.id }).subscribe((data: any) => {
      this.inputs = data.getModels();
      this.group.inputs = this.inputs;
      this.fields = this.group.formFieldsConfigs;
      this.form.formFields = this.group.formFields;
      this.group.updateValues();
      this.form.generateForm();
      this.form.populateForm(this.group.value);
    })
  }

  /**
   * Submit Form Values
   */
  onSubmit() {
    this.loading = true;
    const data = this.form.value;
    // Doing this a little bit more manually beucase the way we treat the CoreConfig, it's not a direct relationship
    for (let i = 0; i < this.group.inputs.length; i++) {
      this.group.inputs[i]['value'] = data[this.group.inputs[i].id];
    }
    this.group.updateValues();
    const sub = this.group.save().subscribe(
      (result) => {
        this.loading = false;
        sub.unsubscribe();
      },
      (error: any) =>{
        this.loading = false;
      }
    )
  }
}
