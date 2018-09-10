import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';

import { PermissionForm } from '../forms/Permission.form';

@JsonApiModelConfig({
    type: 'permission',
})
export class PermissionModel extends AbstractModel {

	public static formClassRef = PermissionForm;

    @Attribute()
    id: string;

    @Attribute()
    name: string;

    @Attribute()
    codename: string;

    get pk(){
    	return this.id;
    }

    set pk(value){
	}
}

