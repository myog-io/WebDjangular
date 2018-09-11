import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { JsonApiQueryData } from 'angular2-jsonapi';

import { WebAngularDataStore } from '../../../@core/data/data-store/WebAngularDataStore.service';
import { UserModel } from '../../../@core/data/models/User.model';
import { GroupModel } from '../../../@core/data/models/Group.model';
import { PermissionModel } from '../../../@core/data/models/Permission.model';

import { ModelPaginatorControls } from '../../../@theme/components/model-paginator/model-paginator.controls';

@Component({
    selector: 'group-edit',
    styleUrls: ['./group-edit.component.scss'],
    templateUrl: './group-edit.component.html',
})

export class GroupEditComponent {
    public form = new GroupModel.formClassRef();
    public group: GroupModel;

    public modelPaginatorConfig = {
        modelToPaginate: PermissionModel,
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
            this.datastore.findRecord(GroupModel, this.activatedRoute.params['value'].id, {
                include: 'permissions'
            }).subscribe(
                (group: GroupModel) => {
                    this.group = group;
                    this.form.populateForm(this.group);
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
        this.form.updateModel(this.group);
        this.group.save().subscribe(
            (result) => {
                console.log(result);
            }
        )
    }

    create(){
        this.group = this.datastore.createRecord(GroupModel, this.form.value);
        this.group.save().subscribe(
            (result) => {
            }
        )
    }

    modelPaginatorControlsGetter($event){
        this.modelPaginatorControls = $event;
    }
}
