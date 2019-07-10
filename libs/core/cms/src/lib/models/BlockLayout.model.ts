import { JsonApiModelConfig } from 'angular2-jsonapi';
import { SmartTableSettings } from '@core/data/src/lib/data-store';
import { BlockModel } from '@core/cms/src/lib/models/Block.model';

@JsonApiModelConfig({
  type: 'Block',
  modelEndpointUrl: 'cms/block'
})
export class BlockLayoutModel extends BlockModel {
  public static smartTableOptions: SmartTableSettings = {
    columns: {
      id: {
        title: 'ID',
        type: 'text'
      },
      title: {
        title: 'Title',
        type: 'text'
      },
      slug: {
        title: 'Code',
        type: 'text'
      }
    },
    filters: {
      block_class: 'layout'
    }
  };
}
