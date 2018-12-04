import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { Subscription } from 'rxjs';
import { WebAngularSmartTableDataSourceOptions, SmartTableSettings, SmartTableSettingsMode, SmartTableColumnType } from '@webdjangular/core/data';
import { LocalDataSource } from 'ng2-smart-table';
import { FormArray } from '@angular/forms';
import { NbWindowRef, NbWindowService } from '@nebular/theme';
import { WebAngularDataStore } from '@webdjangular/core/services';

/**
 * This class will Implement a Smart Table with Add and Fielter Button
 */
@Component({
  selector: 'wda-form-array',
  styleUrls: ['form-array.component.scss'],
  template: `
    <ng2-smart-table
      [settings]="smart_table_settings"
      [source]="source"
      (create)="onCreate($event)"
      (edit)="onEdit($event)"
      (delete)="onDelete($event)">
      ></ng2-smart-table>
    <br/>
    <ng-template #InseptionForm let-data >
      <wda-form [fields]="form.scaffoldFields" (onSubmit)="onSubmit()" (relationshipUpdated)="relationshipUpdated($event)" [group]="form" [loading]="loading"></wda-form>
    </ng-template>
`
})
export class BuilderFormArrayComponent implements BuilderFormField, OnInit, OnDestroy {
  public smart_table_settings: SmartTableSettings = {
    editable: true,
    mode: SmartTableSettingsMode.inline,
    columns: {

    },
    pager: {
      perPage: 20,
      display: true
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      //confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      // confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      //confirmDelete: true
    }
  };
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  source: LocalDataSource = new LocalDataSource();

  form: AbstractForm;
  loading: boolean = false;

  subscription: Subscription;
  onChangeSub: Subscription;
  windowRef: NbWindowRef;

  @ViewChild('InseptionForm') formTemplate: TemplateRef<any>;
  /**
   * Creates an instance of scaffold form select component.
   * @param datastore
   */
  constructor(
    private datastore: WebAngularDataStore,
    private windowService: NbWindowService
  ) {

  }
  /**
   * On Initialization of the Component
   */
  ngOnInit() {
    this.updateSettings();
    this.subscription = this.group.valueChanges.subscribe((val) => {
      if (this.group.get(this.config.name)) {
        this.subscription.unsubscribe();
        // We need to subscribe only to changes of this table values not others
        this.subscription = this.group.get(this.config.name).valueChanges.subscribe((value) => {
          this.source.load(value);
        })
        if (this.smart_table_settings.mode == SmartTableSettingsMode.inline) {
          // If not Inline we will track changes Differently (i think)
          this.onChange();
        }
      }
    });
  }
  private openWindow(title: string = "Edit") {
    //this.loadOptions();
    this.windowRef = this.windowService.open(this.formTemplate, {
      closeOnBackdropClick: true,
      closeOnEsc: true,
      title: title
    });
  }

  /**
   * Smart Table Has changed
   */
  private onChange() {
    this.onChangeSub = this.source.onChanged().subscribe((data) => {
      switch (data.action) {
        case "prepend":
          this.includeRow(data.elements)
          break;
        case "updateRow":
          this.updateRow(data.elements);
        case "remove":
          this.deleteRow(data.elements);
        default:
          break;
      }
    })
  }
  /**
   * Including Row on the array
   * TODO: If this is for an HasMany we have to change a little bit
   * @param val form value
   */
  private includeRow(val: any) {
    this.group.pushToFormArrayAttribute(this.config.name, val);
    this.setGroupValue(val);
  }
  /**
   * A row has been updated
   * @param val form value
   */
  private updateRow(val: any) {
    this.setGroupValue(val);
  }
  /**
   *
   * @param val
   */
  private deleteRow(val: any) {
    this.group.formArrayRemoveAt(this.config.name, 0);
    this.setGroupValue(val);
  }
  /**
   * Set Current Group Value
   * @param val
   */
  private setGroupValue(val: any) {
    this.group.get(this.config.name).setValue(val);
  }
  /**
   * When the smart_table_settings.mode is `external` we have to get the form config information
   */
  private getFormConfig() {
    if (this.group.formFields[this.config.name].formClass) {
      this.form = new this.group.formFields[this.config.name].formClass();
      this.form.generateForm();
    } else {
      throw new Error(
        `Form Array require formClass inside formFields[${this.config.name}]`
      );
    }
  }
  /**
   * Updating Smart Tables Settings, Creating the Columns based on the fields
   */
  private updateSettings() {
    if (this.config.smart_table_mode) {
      this.smart_table_settings.mode = this.config.smart_table_mode;
      this.getFormConfig();
    }
    if (this.group.formFields && this.group.formFields[this.config.name]) {
      if (this.group.formFields[this.config.name].formClass) {
        const fg: AbstractForm = new this.group.formFields[this.config.name].formClass();

        this.smart_table_settings = Object.assign(
          {},
          this.smart_table_settings,
          fg.listingTableSettings
        );
      } else {
        throw new Error(
          `Form Array require formClass inside formFields[${this.config.name}]`
        );
      }
    } else if (this.config.fields) {
      for (const key in this.config.fields) {
        if (this.config.fields.hasOwnProperty(key)) {
          const element = this.config.fields[key];
          this.smart_table_settings.columns[element.name] = {
            title: element.label,
            type: SmartTableColumnType.text, // TODO: Imporve Match Type
          }
        }
      }
    } else {
      throw new Error(
        `Form Array require Fields Configuration on BuilderFormFieldConfig`
      );
    }

  }
  /**
   * Destroying The Component
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null;
    }
    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe()
      this.onChangeSub = null;
    }
  }
  /**
   * On Delete Entry from the table
   */
  onDelete($event) {

    console.log("Delete", $event, this.source);
  }
  /**
   * On Create new Entry on the Table
   * @param $event
   */
  onCreate($event) {
    this.openWindow(`New`);
    this.form.reset();
    console.log("Create", $event, this.source);
  }
  /**
   * On Edit Entry
   * @param $event
   */
  onEdit($event) {
    this.openWindow(`Edit`);
    if($event.data){
      this.form.populateForm($event.data);
    }
    console.log("Edit", $event);
    //$event.confirm.resolve();
  }

}
