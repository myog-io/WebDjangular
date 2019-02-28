import { JsonApiModelConfig, Attribute, HasMany, BelongsTo } from 'angular2-jsonapi';
import { Validators } from '@angular/forms';
import { AbstractModel } from '@core/data/src/lib/models';
import { ExtraOptions } from '@core/decorator/src/lib/ExtraOptions.decorator';
import { SmartTableSettings } from '@core/data/src/lib/data-store';


@JsonApiModelConfig({
  type: 'FormSubmition',
  modelEndpointUrl: 'form_submition',
})
export class FormSubmitionModel extends AbstractModel {

}