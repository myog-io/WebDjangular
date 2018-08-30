import { Component } from '@angular/core';
import { CanActivate, Router, ActivatedRoute  } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { WebAngularDataStore } from '../../../@core/data/data-store/WebAngularDataStore.service';
import { User } from '../../../@core/data/models/User.model';


@Component({
    selector: 'user-edit',
    styleUrls: ['./user-edit.component.scss'],
    templateUrl: './user-edit.component.html',
})

export class UserEditComponent {
    public form;
    public user: User = new User(this.datastore);

    
    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private datastore: WebAngularDataStore,
    ){
        //this.user.id = this.activatedRoute.params['value'].id;
    }

    ngOnInit():void {
        this.form = this.formBuilder.group({
            id: [
                this.user.id,
                Validators.compose([]),
            ],
            first_name: [
                this.user.first_name,
                Validators.compose ([Validators.required, Validators.minLength(2)]),
            ],
            last_name: [
                this.user.last_name,
                Validators.compose ([Validators.required, Validators.minLength(2)]),
            ],
            email: [
                this.user.email,
                Validators.compose([Validators.required, Validators.email]),
            ],
            is_active: [
                typeof this.user.is_active !== 'undefined' ? this.user.is_active : false,
                Validators.compose([]),
            ],
            is_staff: [
                typeof this.user.is_staff !== 'undefined' ? this.user.is_staff : false,
                Validators.compose([]),
            ],
            is_superuser: [
                typeof this.user.is_superuser !== 'undefined' ? this.user.is_superuser : false,
                Validators.compose([]),
            ],
            password: [
                this.user.password,
                Validators.compose([Validators.required, Validators.minLength(8)]),
            ],
            created: [
                this.user.created,
                Validators.compose([]),
            ],
            updated: [
                this.user.updated,
                Validators.compose([]),
            ],
            groups: this.formBuilder.array([]),
        });

        if (typeof this.user.id !== 'undefined') {

            //this.pushSub(this.userService.getSingleEntry(this.user.id, {}).subscribe(
            //    (result) => {
            //        this.user = result;
            //        this.initFormValues();
            //        this.getUserConfigs();
            //    },
            //));
        }
    }


    initFormValues(): void{
    	this.form.patchValue(this.user);
    }

    
}
