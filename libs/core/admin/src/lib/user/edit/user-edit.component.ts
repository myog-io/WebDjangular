import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { NbAccessChecker } from '@nebular/security'

import { WebAngularDataStore } from '@webdjangular/core/services';
import { UserModel } from '@webdjangular/core/users-models';
import { GroupModel } from '@webdjangular/core/users-models';

import { ModelPaginatorControls } from '@webdjangular/core/admin-theme';

@Component({
  selector: 'user-edit',
  styleUrls: ['./user-edit.component.scss'],
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent {
  public form = new UserModel.formClassRef();
  public user: UserModel;

  public modelPaginatorConfig = {
    modelToPaginate: GroupModel,
    useDatastore: this.datastore,
    pageSize: 12
  };

  public modelPaginatorControls: ModelPaginatorControls;


  /**
   * Creates an instance of user edit component.
   * @param formBuilder
   * @param router
   * @param activatedRoute
   * @param datastore
   * @param accessChecker
   */
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private datastore: WebAngularDataStore,
    public accessChecker: NbAccessChecker
  ) {
    this.form.generateForm();
  }


  /**
   * on init
   */
  ngOnInit(): void {
    if (this.activatedRoute.params['value'].id != null) {
      this.datastore.findRecord(UserModel, this.activatedRoute.params['value'].id, {
        include: 'groups'
      }).subscribe(
        (user: UserModel) => {
          this.user = user;
          this.form.populateForm(this.user);
        }
      );
    }
  }


  /**
   * Determines whether submit on
   */
  onSubmit() {
    if (this.activatedRoute.params['value'].id != null) {
      this.update();
    }
    else {
      this.create();
    }
  }

  /**
   * Updates user
   */
  update() {
    this.form.updateModel(this.user);
    let sub = this.user.save().subscribe(
      (result) => {
        sub.unsubscribe();
      }
    )
  }

  /**
   * Creates user
   */
  create() {
    this.user = this.datastore.createRecord(UserModel, this.form.value);
    let sub = this.user.save().subscribe(
      (result) => {
        sub.unsubscribe();
      }
    )
  }


  /**
   * Models paginator controls getter
   * @param $event
   */
  modelPaginatorControlsGetter($event) {
    this.modelPaginatorControls = $event;
  }
}
