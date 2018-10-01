import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { NbAccessChecker } from '@nebular/security'

import { import { WebAngularDataStore } from '@webdjangular/core/services'; } from '../../../@core/data/data-store/import { WebAngularDataStore } from '@webdjangular/core/services';.service';
import { UserModel } from '../../../@core/data/models/User.model';
import { GroupModel } from '../../../@core/data/models/Group.model';

import { ModelPaginatorControls } from '../../../@theme/components/model-paginator/model-paginator.controls';

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


    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private datastore: WebAngularDataStore,
        public accessChecker: NbAccessChecker
    ){
        this.form.generateForm();
    }


    ngOnInit():void {
        if (this.activatedRoute.params['value'].id != null){
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


    onSubmit(){
        if (this.activatedRoute.params['value'].id != null){
            this.update();
        }
        else{
            this.create();
        }
    }

    update(){
        this.form.updateModel(this.user);

        let sub = this.user.save().subscribe(
            (result) => {
                sub.unsubscribe();
            }
        )
    }

    create(){
        this.user = this.datastore.createRecord(UserModel, this.form.value);
        let sub = this.user.save().subscribe(
            (result) => {
                sub.unsubscribe();
            }
        )
    }


    modelPaginatorControlsGetter($event){
        this.modelPaginatorControls = $event;
    }
}
