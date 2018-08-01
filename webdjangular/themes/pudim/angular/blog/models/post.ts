import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';

@JsonApiModelConfig({
    type: 'posts',
    modelEndpointUrl: 'blog/post/'
})
export class Post extends JsonApiModel {

    @Attribute()
    title: string;

    @Attribute()
    content: string;

}
