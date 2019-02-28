import { Attribute, BelongsTo, JsonApiModelConfig } from "angular2-jsonapi";
import { AbstractModel } from "@core/data/src/lib/models";
import { ExtraOptions } from "@core/decorator/src/lib/ExtraOptions.decorator";
import { SmartTableSettings } from "@core/data/src/lib/data-store";




@JsonApiModelConfig({
    type: 'FormAction',
    modelEndpointUrl: 'cms/form-action',
})
export class FormActionModel extends AbstractModel {
    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Label',
    })
    label: string;

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Code',
    })
    slug: string;

    @Attribute()
    @ExtraOptions({
        type: 'text',
        label: 'Action Type',
    })
    action_type: string;

    @Attribute()
    @ExtraOptions({
        type: 'codeEditor',
        label: 'Extra Data',
    })
    data?: any;
    get pk() {
        return null;
    }

    set pk(value) {

    }

    public toString = (): string => {
        return `${this.label} (${this.action_type})`;
    };

    public static smartTableOptions: SmartTableSettings = {
        columns: {
            label: {
                title: 'Name',
                type: 'text',
            },
            action_type: {
                title: 'Action Type',
                type: 'text',
            },
        },
    };
}
