import { Attribute, BelongsTo, JsonApiModelConfig } from "angular2-jsonapi";
import { AbstractModel } from "@core/data/src/lib/models";
import { ExtraOptions } from "@core/decorator/src/lib/ExtraOptions.decorator";
import { SmartTableSettings } from "@core/data/src/lib/data-store";


@JsonApiModelConfig({
    type: 'FormField',
    modelEndpointUrl: 'cms/form-field',
})
export class FormFieldModel extends AbstractModel {
    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Label',
    })
    label: string

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Slug',
    })
    slug: string

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Type',
    })
    type: string;

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'input_type',
    })
    input_type: string;

    @Attribute()
    @ExtraOptions({
        type: 'switch',
        label: 'required',
        value: false,
    })
    required: boolean

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Default Value',
    })
    default_value: string

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Label Position',
    })
    label_position: string

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Extra Data',
    })
    data?: any


    get pk() {
        return null;
    }

    set pk(value) {

    }

    public toString = (): string => {
        return `${this.label}(${this.slug})`;
    };

    public static smartTableOptions: SmartTableSettings = {
        columns: {
            label: {
                title: 'Name',
                type: 'text',
            },
            slug: {
                title: 'Code',
                type: 'text',
            },
            type: {
                title: 'Type',
                type: 'text',
            },
        },
    };
}
