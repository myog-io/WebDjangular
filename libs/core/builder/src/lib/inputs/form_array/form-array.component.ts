import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { Subscription } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { NbWindowRef, NbWindowService, NbToastrService } from '@nebular/theme';
import { FormArray, FormGroup } from '@angular/forms';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

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
              (delete)="onDelete($event)" >
            </ng2-smart-table>
            <ng-template #InceptionForm let-data>
              <wda-form-builder [displayGroups]="form.displayGroups" (onSubmit)="submitModal($event)"
                        [group]="form"
                        [loading]="loading" [sticky_top]="false" [show_breadcrumb]="false"
                        [title]="config.label" [inceptionForm]="true" ></wda-form-builder>
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
    mode: 'external',
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
    view: {
      viewButtonContent: '<i class="far fa-eye"></i>',
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
    private windowService: NbWindowService,
    private toaster: NbToastrService,
  ) {

  }

  /**
   * On Initialization of the Component
   */
  ngOnInit() {

    this.updateSettings();
    if (this.group.get(this.config.name) && typeof this.group.get(this.config.name).value !== 'undefined') {
      this.source.load(this.group.get(this.config.name).value);
    }
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
        case "update":
          this.updateRow(data.elements);
          break;
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
    const fa = this.group.get(this.config.name) as FormArray;
    for (let i = 0; i < val.length; i++) {
      const element = val[i];
      const fg = fa.get(i.toString()) as AbstractForm;
      if (fg) {
        for (const key in element) {
          if (element.hasOwnProperty(key)) {
            fg.get(key).setValue(element[key]);
          }
        }
      }

    }
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
    if (this.config.model) {
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
    this.openWindow(`New ` + this.config.label);
    this.form.reset();
  }

  /**
   * On View Entry
   * @param $event
   */
  onView($event) {
    this.getFormConfig();
    this.state = state.updating;
    this.form.reset();
    this.openWindow(`View ` + this.config.label);
    this.element = $event.data; // Reference to find on the table latter
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.form.populateForm($event.data);
    }, 350);
  }

  /**
   * On Edit Entry
   * @param $event
   */
  onEdit($event) {
    this.getFormConfig();
    this.state = state.updating;
    this.form.reset();
    this.openWindow(`Edit ` + this.config.label);
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
          const element_id = this.element.id;
          this.source.update(this.element, $event.data).then((val: any) => {
            // Also Update on 
            if (element_id) {
              const fg: AbstractForm = this.getEntity(element_id);
              if(fg.entity.save){
                fg.updateModel(fg.entity)
                fg.entity.save().subscribe((new_entity) => {
                  this.toaster.success(`Changes have been saved`, `Success!`);
                  fg.populateForm(new_entity);
                  fg.entity = new_entity;
                  this.loading = false;
                  this.closeWindow();
                }, (error) => {
                  this.loading = false;
                  if (error.errors && error.errors.length > 0) {
                    for (let i = 0; i < error.errors.length; i++) {
                      // TODO: Check pointer to see if is for an specific field and set an error inside the field
                      const element = error.errors[i];
                      this.toaster.danger(`Error saving the Changes, Details: ${element.detail}`, `Error!`, { duration: 5000 });
                    }
                  } else {
                    this.toaster.danger(`Error saving the Changes`, `Error!`);
                  }
                });
              }else{
                this.closeWindow();
              }
            } else {
              this.closeWindow();
            }
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
  /**
   * 
   * @param id Id of the entity to find the elemnt
   */
  private getEntity(id: string): AbstractForm {
    const fa = this.group.get(this.config.name) as FormArray;
    return fa.at(fa.value.findIndex(e => e.id === id)) as AbstractForm;
  }
  /**
   * 
   */
  private savingElement(id) {
    //if(fg.entity && fg.get('id').value){
    //  // We need to update the Entity linked to the group entity
    //  const id = fg.get('id').value;
    //  
    //  if(this.group.entity[this.config.name]){
    //    const en:any[] = this.group.entity[this.config.name]; 
    //    let index = en.findIndex((e)=> e.id == id);
    //    
    //    fg.updateModel(this.group.entity[this.config.name][index])
    //    
    //  }
    //  
    //}
  }
  /**
   * Closing Window
   */
  private closeWindow() {

    setTimeout(() => {
      this.loading = false;
      this.windowRef.close();
      this.state = state.start;
      this.form.reset();
    }, 350);
  }

}
