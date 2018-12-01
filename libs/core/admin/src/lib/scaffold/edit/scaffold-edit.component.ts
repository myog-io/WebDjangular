import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {WebAngularDataStore} from '@webdjangular/core/services';

import {AbstractModel} from '@webdjangular/core/data-models';
import {AbstractForm} from '@webdjangular/core/data-forms';
import { FormioService } from "angular-formio";
import {FormioResourceConfig} from "angular-formio/resource";

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
  /**
   * Check if we are sending or not a entry, to disable/enable button
   */
  loading: boolean = false;

  inlcude_args: any = {};

  submission: any = {};

  refreshForm: EventEmitter<any>;

  options: any = {};

  formioService: FormioService;


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
    //private formioService: FormioService
  ) {
    this.refreshForm = new EventEmitter();


    let that = this;
    this.options = {
      "hooks": {
        "beforeSubmit": function(submission, callback){
          that.onSubmit(submission, callback)
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
        this.inlcude_args = {include: this.current_model.include};
      }
      this.form.generateForm();
      this.getEntry();
    });


    this.form.scaffoldForm.components.push({
      "input": true,
      "label": "Submit",
      "tableView": false,
      "key": "submit",
      "size": "md",
      "leftIcon": "",
      "rightIcon": "",
      "block": false,
      "action": "submit",
      "disableOnInvalid": true,
      "theme": "primary",
      "type": "button",
      "autofocus":false
    });
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
      this.entry = this.datastore.createRecord(this.current_model, this.form.value);
    }
  }

  populateForm() {
    this.form.scaffoldForm.components.forEach((key: any, val: any) => {
      if(this.entry[key.key]){
        this.submission[key.key] = this.entry[key.key];
      }
    });
    this.refreshForm.emit({
      submission: {
        data: this.submission
      }
    });
  }


  /**
   * Determines if it's a create or update
   */
  onSubmit(submission: any, callback) {
    //this.submission = submission;
    console.log(submission, callback);
      // Do something asynchronously.
      setTimeout(function() {
        // Callback with a possibly manipulated submission.
        callback(null, submission);
      }, 3000);
    //this.update(submission);
  }

  updateModel(data) {
    let entry: any;
    for( let key: any in data ) {
      if(this.entry[key]){
        this.entry[key] = data[key];
      }
    }
  }


  /**
   * Updates Record based on the current_model
   */
  update(submission) {
    //this.loading = true;
    //this.form.updateModel(this.entry);
    this.updateModel(submission.data);
    let sub = this.entry.save(this.inlcude_args).subscribe(
      (result) => {
        //this.loading = false;
        sub.unsubscribe();
      },
      (error) => {
        //console.log(error);
        //this.loading = false;
      }
    );
  }

  relationshipUpdated(data) {
    this.entry[data.name] = data.entity;
  }
}
