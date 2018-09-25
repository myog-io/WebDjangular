import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from './Permission.model';

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

