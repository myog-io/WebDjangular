import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { WebAngularDataStore } from '../../../@core/data/data-store/WebAngularDataStore.service';
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

        this.user.save().subscribe(
            (result) => {
                console.log(result);
            }
        )
    }

    create(){
        this.datastore.createRecord(UserModel, this.form.value()).subscribe(
            (result) => {
                console.log(result);
            }
        )
    }


    modelPaginatorControlsGetter($event){
        this.modelPaginatorControls = $event;
    }
}
