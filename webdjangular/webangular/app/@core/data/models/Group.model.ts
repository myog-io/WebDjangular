import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';


@JsonApiModelConfig({
    type: 'group/',
})
export class Group extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    name: string;
}

