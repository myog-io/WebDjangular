import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from '@webdjangular/core/data';
import { PermissionModel } from '@webdjangular/core/users';

import { PageForm } from '../forms/Page.form';


@JsonApiModelConfig({
    type: 'page',
})
export class PageModel extends AbstractModel {

	public static formClassRef = PageForm;


    @Attribute()
    id: string;

    @Attribute()
    title: string;

    @Attribute()
    slug: string;

    @Attribute()
    content: string;

    @Attribute()
    created: Date;

    @Attribute()
    updated: Date;

    permissions: PermissionModel[]

    get pk(){
    	return this.id;
    }

    set pk(value){

    }

}

