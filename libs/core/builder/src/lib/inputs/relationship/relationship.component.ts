import {
  Component,
  OnInit,
  ViewChild,
  TemplateRef,
  OnDestroy,
  EventEmitter
} from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { NbWindowService, NbWindowConfig, NbWindowRef } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AbstractModel } from '@webdjangular/core/data-models';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-relationship',
  styleUrls: ['relationship.component.scss'],
  template: `
    <div class="form-group form-select" [formGroup]="group" *ngIf="ng_if()">
      <label>{{ config.label }}</label><br/>
      <button (click)="openWindow()" nbButton status="success" size="large" [nbSpinner]="loading" nbSpinnerStatus="info"
              [disabled]="loading" nbSpinnerSize="medium" nbSpinnerMessage="Loading...">
        {{title}}
      </button>
    </div><!--form-group-->
    <ng-template #contentTemplate let-data>
      <nb-list>
        <nb-list-item *ngFor="let option of config.options" (click)="selectOption(option)" [class]="select_item">
          {{ option.toString() }}
        </nb-list-item>
      </nb-list>
    </ng-template>

  `
})
export class BuilderFormRelationshipComponent extends BuilderFormField
  implements OnInit, OnDestroy {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  relationshipUpdated: EventEmitter<any>;

  loading: boolean = true;
  title: string = '';
  group_subscription: Subscription;
  windowRef: NbWindowRef;

  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  /**
   * Creates an instance of scaffold form select component.
   * @param datastore
   */
  constructor(
    private datastore: WebAngularDataStore,
    private windowService: NbWindowService
  ) {
    super();
  }
  openWindow() {
    this.loadOptions();
    this.windowRef = this.windowService.open(this.contentTemplate, {
      closeOnBackdropClick: true,
      closeOnEsc: true,
      title: 'Select the Entry for the relationship'
    });
  }
  /**
   * on init
   */
  ngOnInit() {
    this.title = 'Select';
    this.loading = false;
    const group = this.group.get(this.config.name) as AbstractForm;
    this.group_subscription = group.valueChanges.subscribe(value => {
      this.title = group.toString();
    });
  }

  /**
   * When destroying this component
   */
  ngOnDestroy() {
    if (this.group_subscription) {
      this.group_subscription.unsubscribe();
      this.group_subscription = null;
    }
  }
  /**
   * Select Option
   * @param entry
   */
  selectOption(entry) {
    this.windowRef.close();
    const group = this.group.get(this.config.name) as AbstractForm;
    group.populateForm(entry);
    this.relationshipUpdated.emit({ name: this.config.name, entity: entry });
  }
  /**
   * Load the Options
   */
  loadOptions() {
    this.loading = true;
    if (this.config.options_model) {
      // TODO: PAGINATION
      this.datastore.findAll(this.config.options_model).subscribe(
        data => {
          const models = data.getModels();
          this.config.options = [];
          for (let i = 0; i < models.length; i++) {
            const entry = models[i];
            this.config.options.push(entry);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
      );
    }
  }
}
