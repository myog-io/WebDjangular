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
  <div class="row">
    <ng-container class="column" *ngFor="let field of fields">
      <div [class]="field.wrapper_class ? field.wrapper_class : 'col-12'" *ngIf="field.display">
        <ng-container wdaBuilderFormFields [config]="field" [group]="group" (relationshipUpdated)="relationshipUpdated($event)"></ng-container>
      </div>
    </ng-container>
  </div>
  <div class="row">
    <div class="col-12">
      <button nbButton [status]="submit_status" [size]="submit_size" (click)="onSubmit()" [nbSpinner]="loading" [nbSpinnerStatus]="submit_status"
        [disabled]="loading" [nbSpinnerSize]="submit_size" nbSpinnerMessage="">
        {{ submit_label }}
      </button>
    </div>
  </div>
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

  ngOnInit() {
    this.conditionalFields(this.group.value);
    this.subscription = this.group.valueChanges.subscribe((data) => {
      this.conditionalFields(data);
    })
  }
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
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null;
    }
  }



}
