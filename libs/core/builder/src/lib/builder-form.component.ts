import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormFieldConfig, BuilderFormConfig } from './interfaces/form-config.interface';
import { FormGroup } from '@angular/forms';
import { JsonLogic } from './builder-jsonlogic';
import { Subscription } from 'rxjs';


@Component({
  selector: 'wda-form',
  styleUrls: ['builder-form.component.scss'],
  template: `
  <form [formGroup]="group" (submit)="submitForm($event)">
    <div class="row">
      <ng-container class="column" *ngFor="let field of fields">
        <div [class]="field.wrapper_class ? field.wrapper_class : 'col-12'" *ngIf="field.display">
          <ng-container wdaBuilderFormFields [config]="field" [group]="group" (relationshipUpdated)="relationship($event)"></ng-container>
        </div>
      </ng-container>
    </div>
    <div class="row">
      <div class="col-12">
        <button nbButton [status]="submit_status" [size]="submit_size" (click)="submitForm($submit)" [nbSpinner]="loading" [nbSpinnerStatus]="submit_status"
          [disabled]="loading" [nbSpinnerSize]="submit_size" nbSpinnerMessage="">
          {{ submit_label }}
        </button>
      </div>
   </div>
  </form>
`
})
export class BuilderFormComponent implements BuilderFormConfig, OnInit, OnDestroy {
  @Input() fields: BuilderFormFieldConfig[];
  @Input() submit_label = "Save";
  @Input() submit_size = "medium";
  @Input() submit_status = "primary"
  @Input() loading = false;
  @Input() group: FormGroup;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() relationshipUpdated: EventEmitter<any> = new EventEmitter();
  private jsonLogic: JsonLogic = new JsonLogic();
  private subscription: Subscription
  constructor(
  ) {

  }
  /**
   * On Init of Class
   */
  ngOnInit() {
    this.conditionalFields(this.group.value);
    this.subscription = this.group.valueChanges.subscribe((data) => {
      this.conditionalFields(data);
    })
  }
  /**
   * This will check the condition for the field to hide or show based on the jsonlogic conditional of each field
   * @param data Form Data
   */
  private conditionalFields(data: any) {
    // TODO Improve
    for (let i = 0; i < this.fields.length; i++) {
      if (this.fields[i].conditional) {
        this.fields[i].display = this.jsonLogic.apply(this.fields[i].conditional, data);

      } else {
        this.fields[i].display = true;

      }
      this.fields[i].disabled = !this.fields[i].display;
    }
  }
  /**
   * Form Submitting
   */
  public submitForm($event) {
    this.onSubmit.emit($event);
  }
  /**
   * If Relationship of Model is Updated
   */
  public relationship($event) {
    this.onSubmit.emit($event);
  }
  /**
   * Destroying the component
   */
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null;
    }
  }



}
