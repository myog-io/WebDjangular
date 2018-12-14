import {Component, OnInit, OnDestroy, ViewChild, TemplateRef} from '@angular/core';
import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormField, BuilderFormFieldConfig} from '../../interfaces/form-config.interface';
import {Subscription} from 'rxjs';
import {SmartTableSettings} from '@webdjangular/core/data';
import {LocalDataSource} from 'ng2-smart-table';
import {NbWindowRef, NbWindowService} from '@nebular/theme';
import {WebAngularDataStore} from '@webdjangular/core/services';

enum state {
  start = 'start',
  updating = 'updating',
  creating = 'creating',
  removing = 'removing',
}

/**
 * This class will Implement a Smart Table with Add and Fielter Button
 */
@Component({
  selector: 'wda-form-array',
  styleUrls: ['form-array.component.scss'],
  template: `
    <nb-accordion class="mb-3">
      <nb-accordion-item [expanded]="true">
        <nb-accordion-item-header>{{ config.label }}</nb-accordion-item-header>
        <nb-accordion-item-body>
          <div class="wrapper">
            <ng2-smart-table
              [settings]="smart_table_settings"
              [source]="source"
              (create)="onCreate($event)"
              (edit)="onEdit($event)"
              (delete)="onDelete($event)">
            </ng2-smart-table>
            <ng-template #InceptionForm let-data>
              <wda-form [displayGroups]="form.displayGroups" (onSubmit)="submitModal($event)"
                        (relationshipUpdated)="relationshipUpdated($event)" [group]="form"
                        [loading]="loading" [sticky_top]="false" [show_breadcrumb]="false" [title]="config.label" ></wda-form>
            </ng-template>
          </div>
        </nb-accordion-item-body>
      </nb-accordion-item>
    </nb-accordion>

  `
})
export class BuilderFormArrayComponent implements BuilderFormField, OnInit, OnDestroy {
  public smart_table_settings: SmartTableSettings = {
    editable: true,
    mode: 'inline',
    columns: {},
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

  state: state = state.start;
  interval;
  private element: any = null;


  @ViewChild('InceptionForm') formTemplate: TemplateRef<any>;

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
      }
    });
    this.onChange();
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
    this.group.pushToFormArrayAttribute(this.config.name, val[0]);
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
    // First Creation is Triggergin an Error
    // "Must supply a value for form control at index: 0
    this.group.get(this.config.name).setValue(val);
  }

  /**
   * When the smart_table_settings.mode is `external` we have to get the form config information
   */
  private getFormConfig() {
    if (this.config.model) {
      const entity = new this.config.model(this.datastore)
      this.form = entity.getForm();
      this.form.generateForm();
    } else {
      throw new Error(
        `Form Array require 'model' with a formClassRef inside formFields[${this.config.name}]`
      );
    }
  }

  /**
   * Updating Smart Tables Settings, Creating the Columns based on the fields
   */
  private updateSettings() {
    if (this.config.smart_table_mode) {
      this.smart_table_settings.mode = this.config.smart_table_mode;
    }
    console.log("THIS CONFIG",this.config)
    if (this.config.model) {
      console.log(this.config.model.smartTableOptions)
      this.smart_table_settings = Object.assign(
          {},
          this.smart_table_settings,
          this.config.model.smartTableOptions
        );
    } else if (this.config.fields) {
      for (const key in this.config.fields) {
        if (this.config.fields.hasOwnProperty(key)) {
          const element = this.config.fields[key];
          this.smart_table_settings.columns[element.name] = {
            title: element.label,
            type: 'text', // TODO: Imporve Match Type
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
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.onChangeSub) {
      this.onChangeSub.unsubscribe();
      this.onChangeSub = null;
    }

  }

  /**
   * On Delete Entry from the table
   */
  onDelete($event) {
    this.state = state.removing;
    this.source.remove($event.data);
  }

  /**
   * On Create new Entry on the Table
   * @param $event
   */
  onCreate($event) {
    this.getFormConfig();
    this.state = state.creating;
    this.openWindow(`New`);
    this.form.reset();
  }

  /**
   * On Edit Entry
   * @param $event
   */
  onEdit($event) {
    this.getFormConfig();
    this.state = state.updating;
    this.form.reset();
    this.openWindow(`Edit`);
    this.element = $event.data; // Reference to find on the table latter
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.form.populateForm($event.data);
    }, 350);


  }

  /**
   * submitModal
   */
  submitModal($event) {
    this.loading = true;
    if ($event.data) {
      switch (this.state) {
        case state.updating:

          this.source.update(this.element, $event.data).then((val: any) => {
            this.closeWindow();
          });
          this.element = null;
          break;
        case state.creating:
          this.source.prepend($event.data).then((val: any) => {
            this.closeWindow();
          });
          break;
        default:
          break;
      }
    }


  }

  private closeWindow() {

    setTimeout(() => {
      this.loading = false;
      this.windowRef.close();
      this.state = state.start;
      this.form.reset();
    }, 350);
  }

}
