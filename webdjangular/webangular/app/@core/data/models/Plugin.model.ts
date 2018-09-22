import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

import { AbstractModel } from './Abstract.model';
import { PermissionModel } from './Permission.model';

import { PluginForm } from '../forms/Plugin.form';
import { ExtraOptions } from '../../decorators/ExtraOptions.decorator';
import { AuthorModel } from './Author.model';


@JsonApiModelConfig({
    type: 'core_plugin',
})
export class PluginModel extends AbstractModel {

	public static formClassRef = PluginForm;

    @Attribute()
    id: string;

    @Attribute()
    slug: string;

    @Attribute()
    name: string;
    
    @Attribute()
    current_version: string;
    
    @Attribute()
    version: string;
    
    @Attribute()
    active: boolean;

    @Attribute()
    created: Date;

    @Attribute()
    updated: Date;

    @BelongsTo()
    @ExtraOptions({
        backendResourceName: 'Author',
    })
    author: AuthorModel

    permissions: PermissionModel[]

    get pk(){
    	return this.id;
    }

    set pk(value){
        
	}
}

