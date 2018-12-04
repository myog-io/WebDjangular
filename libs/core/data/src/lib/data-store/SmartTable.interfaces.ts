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
export enum SmartTableEditorType {
  text = 'text',
  textarea = 'textarea',
  completer = 'completer',
  list = 'list',
  checkbox = 'checkbox'
}
export interface SmartTableEditor {
  type?: SmartTableEditorType; // 'text' | 'textarea' | 'completer' | 'list' | 'checkbox'
  config?: SmartTableEditorConfig;
  component?: DefaultEditor;
}
export enum SmartTableColumnType {
  text = 'text',
  html = 'html',
  custom = 'custom'
}
export enum SmartTableColumnSort {
  asc = 'asc',
  desc = 'desc',
}
export interface SmartTableColumnSettings {
  title: string;
  class?: string;
  width?: string;
  editable?: boolean;
  type: SmartTableColumnType;
  renderComponent?: any;
  onComponentInitFunction?: Function;
  editor?: SmartTableEditor;
  filter?: Object;
  valuePrepareFunction?: Function;
  sort?: boolean; // Enable/Disabled
  sortDirection?: SmartTableColumnSort;
  compareFunction?: Function;
  filterFunction?: Function;
}
export enum SmartTableSettingsMode {
  external = 'external',
  inline = 'inline',
}
export interface SmartTableSettingsAttr {
  id?: string;
  class?: string;
}
export enum SmartTableActionsPosition {
  left = 'left',
  right = 'right',
}
export interface SmartTableActions {
  columnTitle?: string;
  add?: boolean;
  edit?: boolean;
  delete?: boolean;
  position?: SmartTableActionsPosition;
}
export interface SmartTableSettings {
  editable?: boolean;
  columns?: {
    [key: string]:SmartTableColumnSettings
  };
  mode?: SmartTableSettingsMode,
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
