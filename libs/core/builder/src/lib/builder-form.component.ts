import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener} from '@angular/core';
import {AbstractForm} from '@webdjangular/core/data-forms';
import {BuilderFormFieldConfig, BuilderFormConfig, BuilderFormGroupConfig, BuilderFormDisplayGroups} from './interfaces/form-config.interface';
import {FormGroup} from '@angular/forms';
import {JsonLogic} from './builder-jsonlogic';
import {Subscription} from 'rxjs';


@Component({
  selector: 'wda-form',
  styleUrls: ['builder-form.component.scss'],
  templateUrl: 'builder-form.component.html'
})
export class BuilderFormComponent implements BuilderFormConfig, OnInit, OnDestroy {
  @Input() before_title: string;
  @Input() title: string;
  @Input() displayGroups: BuilderFormDisplayGroups[];
  @Input() submit_label = "Save";
  @Input() submit_size = "medium";
  @Input() submit_status = "success";
  @Input() submit_continue_label = "Save & Continue";
  @Input() submit_continue_size = "medium";
  @Input() submit_continue_status = "info";
  @Input() loading = false;
  @Input() group: FormGroup;
  @Input() submit = true;
  @Input() save_continue = false;
  @Input() sticky_top: boolean = true;
  @Input() show_breadcrumb: boolean = true;

  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() relationshipUpdated: EventEmitter<any> = new EventEmitter();
  private jsonLogic: JsonLogic = new JsonLogic();
  private subscription: Subscription

  constructor() {

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
    //for (let i = 0; i < this.fields.length; i++) {
    //  if (this.fields[i].conditional) {
    //    this.fields[i].display = this.jsonLogic.apply(this.fields[i].conditional, data);
//
    //  } else {
    //    this.fields[i].display = true;
//
    //  }
    //  this.fields[i].disabled = !this.fields[i].display;
    //}
  }

  /**
   * Form Submitting
   */
  public submitForm($event: any = {}, redirect: boolean) {
    $event.redirect = redirect;
    $event.data = this.group.value;
    this.onSubmit.emit($event);
  }

  /**
   * If Relationship of Model is Updated
   */
  public relationship($event) {
    this.relationshipUpdated.emit($event);
  }

  /**
   * Destroying the component
   */
  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null;
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.code == "KeyS") {
      event.preventDefault()
      this.submitForm(event, false)
    }
  }

}
