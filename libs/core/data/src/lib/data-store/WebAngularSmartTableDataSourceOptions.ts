import { JsonApiModel } from 'angular2-jsonapi';

export class WebAngularSmartTableDataSourceOptions {
  protected static readonly SORT_FIELD_KEY = '_sort';
  protected static readonly SORT_DIR_KEY = '_order';
  protected static readonly PAGER_PAGE_KEY = 'number';
  protected static readonly PAGER_LIMIT_KEY = 'size';
  protected static readonly FILTER_FIELD_KEY = '#field#_like';
  protected static readonly TOTAL_KEY = 'x-total-count';
  protected static readonly DATA_KEY = '';
  protected static readonly MODEL = null;
  public static readonly SMART_TABLE_SETTINGS = {
    editable: false,
    mode: 'external',
    pager: {
      perPage: 20,
      display: true
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true
    }
  };
  protected static readonly ON_EDIT_BUTTON_CLICK = $event => {
    console.log('no function set for onEditButtonClick()', $event);
  };

  protected static readonly ON_DELETE_BUTTON_CLICK = $event => {
    console.log('no function set for onDeleteButtonClick()', $event);
  };

  protected static readonly ON_CREATE_BUTTON_CLICK = () => {
    console.log('no function set for onCreateButtonClick()');
  };

  endPoint: string;

  sortFieldKey: string;
  sortDirKey: string;
  pagerPageKey: string;
  pagerLimitKey: string;
  filterFieldKey: string;
  totalKey: string;
  dataKey: string;
  model: JsonApiModel;
  smartTableSettings: any;
  onEditButtonClick;
  onDeleteButtonClick;
  onCreateButtonClick;

  constructor({
    endPoint = '',
    sortFieldKey = '',
    sortDirKey = '',
    pagerPageKey = '',
    pagerLimitKey = '',
    filterFieldKey = '',
    totalKey = '',
    dataKey = '',
    model = null,
    smartTableSettings = {},
    onEditButtonClick = '',
    onDeleteButtonClick = '',
    onCreateButtonClick = ''
  } = {}) {
    this.endPoint = endPoint ? endPoint : '';

    this.sortFieldKey = sortFieldKey
      ? sortFieldKey
      : WebAngularSmartTableDataSourceOptions.SORT_FIELD_KEY;
    this.sortDirKey = sortDirKey
      ? sortDirKey
      : WebAngularSmartTableDataSourceOptions.SORT_DIR_KEY;
    this.pagerPageKey = pagerPageKey
      ? pagerPageKey
      : WebAngularSmartTableDataSourceOptions.PAGER_PAGE_KEY;
    this.pagerLimitKey = pagerLimitKey
      ? pagerLimitKey
      : WebAngularSmartTableDataSourceOptions.PAGER_LIMIT_KEY;
    this.filterFieldKey = filterFieldKey
      ? filterFieldKey
      : WebAngularSmartTableDataSourceOptions.FILTER_FIELD_KEY;
    this.totalKey = totalKey
      ? totalKey
      : WebAngularSmartTableDataSourceOptions.TOTAL_KEY;
    this.dataKey = dataKey
      ? dataKey
      : WebAngularSmartTableDataSourceOptions.DATA_KEY;

    this.model = model ? model : WebAngularSmartTableDataSourceOptions.MODEL;
    this.smartTableSettings = Object.assign(
      {},
      WebAngularSmartTableDataSourceOptions.SMART_TABLE_SETTINGS,
      smartTableSettings
    );

    this.onEditButtonClick = onEditButtonClick
      ? onEditButtonClick
      : WebAngularSmartTableDataSourceOptions.ON_EDIT_BUTTON_CLICK;
    this.onDeleteButtonClick = onDeleteButtonClick
      ? onDeleteButtonClick
      : WebAngularSmartTableDataSourceOptions.ON_DELETE_BUTTON_CLICK;
    this.onCreateButtonClick = onCreateButtonClick
      ? onCreateButtonClick
      : WebAngularSmartTableDataSourceOptions.ON_CREATE_BUTTON_CLICK;
  }
}
