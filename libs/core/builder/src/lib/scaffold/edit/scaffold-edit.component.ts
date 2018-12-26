import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebAngularDataStore } from '@webdjangular/core/services';

import { AbstractModel } from '@webdjangular/core/data-models';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { NbToastrService } from '@nebular/theme';


@Component({
  selector: 'wda-scaffold-edit',
  styleUrls: ['./scaffold-edit.component.scss'],
  template: `
      <wda-form [displayGroups]="form.displayGroups"
        (onSubmit)="onSubmit($event)" (relationshipUpdated)="relationshipUpdated($event)"
        [group]="form" [loading]="loading" [save_continue]="saveAndContinue"
        [before_title]="before_title" [title]="title" [formLoading]="formLoading">
      </wda-form>
`,
})
export class ScaffoldEditComponent implements OnInit {
  /**
   * Current Entry: Abstract Model
   */
  entry: AbstractModel = null;
  /**
   * Current model of scaffold edit component
   */
  current_model: any;
  /**
   * Base path of scaffold edit componenst
   */
  base_path: any;
  /**
   * Form  of scaffold edit component
   */
  form: AbstractForm;
  /**
   * Title  of scaffold edit component
   */
  title: string = ";D";
  /**
   * Before title of scaffold edit component
   */
  before_title: string = "Editing";
  /**
   * Check if we are sending or not a entry, to disable/enable button
   */
  loading = false;
  formLoading = false;

  inlcude_args: any = {};
  saveAndContinue = true;
  /**
   * Creates an instance of scaffold edit component.
   * @param route
   * @param datastore
   * @param router
   */
  constructor(
    private route: ActivatedRoute,
    private datastore: WebAngularDataStore,
    private router: Router,
    private toaster: NbToastrService
  ) {

  }

  /**
   * on init
   */
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      if (segments[0].path === "new") {
        this.before_title = "Creating a new"
      }
    });
    this.route.data.subscribe(data => {
      this.current_model = data.model;
      this.entry = new this.current_model(this.datastore, {});
      this.title = data.title;
      this.base_path = data.path;
      this.form = this.entry.getForm();
      if (this.current_model.include) {
        this.inlcude_args = { include: this.current_model.include };
      }
      this.form.generateForm();
      this.getEntry();
    })
  }

  /**
   * Gets model Entry, Finding the Record
   */
  getEntry() {

    if (this.route.params['value'].id != null) {
      this.datastore.findRecord(this.current_model, this.route.params['value'].id, this.inlcude_args).subscribe(
        (data: AbstractModel) => {
          this.entry = data;
          this.form.populateForm(this.entry);
          this.formLoading = false;
        }
      );
    } else {
      this.entry = this.datastore.createRecord(this.current_model, this.form.value);
      this.formLoading = false;
    }
  }

  /**
   * Determines if it's a create or update
   */
  onSubmit($event: any) {
    this.update($event.redirect ? $event.redirect : false);
  }

  /**
   * Updates Record based on the current_model
   */
  update(redirect: boolean) {
    this.loading = true;
    this.form.updateModel(this.entry);

    this.entry.saveAll(this.inlcude_args).then(
      (result) => {
        this.toaster.success(`Changes have been saved`, `Success!`);
        this.loading = false;

        if (redirect) {
          this.router.navigate([`/${this.base_path}`]);
        } else {
          this.entry = result;
          this.form.populateForm(this.entry);
        }
      }
    ).catch((error) => {
      console.log(error)
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
    })

  }

  relationshipUpdated(data) {
    this.entry[data.name] = data.entity;
  }
}
