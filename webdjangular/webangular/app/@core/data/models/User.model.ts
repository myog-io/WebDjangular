import { JsonApiModelConfig, JsonApiModel, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';



@JsonApiModelConfig({
    type: 'user/',
})
export class User extends JsonApiModel {

    @Attribute()
    id: string;

    @Attribute()
    password: string;

    @Attribute()
    last_login: Date;

    @Attribute()
    is_superuser: boolean;

    @Attribute()
    first_name: string;

    @Attribute()
    middle_name: string;

    @Attribute()
    last_name: string;

    @Attribute()
    username: string;

    @Attribute()
    email: string;

    @Attribute()
    mobile: string;

    @Attribute()
    is_tfa_enabled: boolean;

    @Attribute()
    is_email_verified: boolean;

    @Attribute()
    is_mobile_verified: boolean;

    @Attribute()
    is_staff: boolean;

    @Attribute()
    created: Date;

    @Attribute()
    updated: Date;
    
}

