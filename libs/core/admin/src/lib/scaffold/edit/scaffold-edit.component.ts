import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WebAngularDataStore } from '@webdjangular/core/services';

import { AbstractModel } from '@webdjangular/core/data-models';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { FormioService, FormioComponent, ValidateOptions, FormioLoader } from "angular-formio";
import { FormioComponentOptions, FormioValidateOptions } from 'libs/core/interfaces/src/lib/formio.interface';

@Component({
  selector: 'wda-scaffold-edit',
  styleUrls: ['./scaffold-edit.component.scss'],
  templateUrl: './scaffold-edit.component.html',
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

  inlcude_args: any = {};

  submission: any = {};

  refreshForm: EventEmitter<any>;

  options: any = {};



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
    private loader: FormioLoader,
    private formioService: FormioService
    //private formioService: FormioService

  ) {
    this.refreshForm = new EventEmitter();


    this.options = {
      hooks: {
        beforeSubmit: (submission, callback) =>{
          this.update(submission, callback)
        }
      }
    };


  }

  /**
   * on init
   */
  ngOnInit(): void {
    this.route.url.subscribe(segments => {
      if (segments[0].path === "new") {
        this.before_title = "Creating new"
      }
    });
    this.route.data.subscribe(data => {
      this.current_model = data.model;
      this.title = data.title;
      this.base_path = data.path;
      this.form = new this.current_model.formClassRef();
      if (this.current_model.include) {
        this.inlcude_args = { include: this.current_model.include };
      }
      //this.form.generateForm();
      this.getEntry();
    });

    const button: FormioComponentOptions<any, FormioValidateOptions> = {
      input: true,
      label: "Submit",
      tableView: false,
      key: "submit",
      size: "md",
      leftIcon: "",
      rightIcon: "",
      block: false,
      action: "submit",
      disableOnInvalid: true,
      theme: "primary",
      type: "button"
    }

    this.form.scaffoldForm.components.push(button);
    this.loader.loading = false;
  }

  /**
   * Gets model Entry, Finding the Record
   */
  getEntry() {
    if (this.route.params['value'].id != null) {
      this.datastore.findRecord(this.current_model, this.route.params['value'].id, this.inlcude_args).subscribe(
        (entry: AbstractModel) => {
          this.entry = entry;
          this.populateForm();
        }
      );
    } else {
      //this.entry = this.datastore.createRecord(this.current_model, this.form.value);
    }
  }

  populateForm() {
    this.form.scaffoldForm.components.forEach((key: any, val: any) => {
      if (this.entry[key.key]) {
        this.submission[key.key] = this.entry[key.key];
      }
    });
    this.refreshForm.emit({
      submission: {
        data: this.submission
      }
    });
  }


  updateModel(data) {
    let entry: any;
    for (let key in data) {
      if (this.entry[key]) {
        this.entry[key] = data[key];
      }
    }
  }


  /**
   * Updates Record based on the current_model
   */
  update(submission,callback) {

    this.updateModel(submission.data);
    let sub = this.entry.save(this.inlcude_args).subscribe(
      (result) => {
        sub.unsubscribe();
        if(callback && typeof callback == "function"){
          submission.state = 'submitted';
          submission.saved = true;
          submission.submitted = true;
          callback(null,submission);
          this.router.navigate(['../../'], {relativeTo: this.route});
        }

      },
      (error) => {
        if(callback && typeof callback == "function"){
          callback(null,submission);
        }
      }
    );
  }

  relationshipUpdated(data) {
    this.entry[data.name] = data.entity;
  }
}
