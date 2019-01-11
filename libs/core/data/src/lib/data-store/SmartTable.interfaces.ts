import { DefaultEditor } from "ng2-smart-table";

export interface SmartTableEditorConfigCompleter {
  data?: [];
  searchFields?: string;
  titleField?: string;
  descriptionField?: string;
}
export interface SmartTableEditorConfig {
  true?: string;
  false?: true;
  list?: any[];
  completer?: SmartTableEditorConfigCompleter; // List of options
}
export interface SmartTableEditor {
  type?: 'text' | 'textarea' | 'completer' | 'list' | 'checkbox';
  config?: SmartTableEditorConfig;
  component?: DefaultEditor;
}
export interface SmartTableColumnSettings {
  title: string;
  class?: string;
  width?: string;
  editable?: boolean;
  type: 'text' | 'html' | 'custom';
  renderComponent?: any;
  onComponentInitFunction?: Function;
  editor?: SmartTableEditor;
  filter?: Object;
  valuePrepareFunction?: Function;
  sort?: boolean; // Enable/Disabled
  sortDirection?: 'asc' | 'desc';
  compareFunction?: Function;
  filterFunction?: Function;
}
export interface SmartTableSettingsAttr {
  id?: string;
  class?: string;
}
export interface SmartTableActions {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  position?: 'left' | 'right';
}
export interface SmartTableSettings {
  editable?: boolean;
  columns?: {
    [key: string]:SmartTableColumnSettings
  };
  mode?: 'external' | 'inline',
  hideHeader?: boolean,
  hideSubHeader?: boolean,
  noDataMessage?: string,
  attr?: SmartTableSettingsAttr,
  actions?: SmartTableActions,
  edit?: any;
  add?: any;
  delete?: any;
  pager?: any;
  rowClassFunction?: Function

}
