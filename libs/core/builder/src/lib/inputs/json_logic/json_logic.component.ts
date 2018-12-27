import { Component } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';

@Component({
  selector: 'wda-form-json-logic',
  styleUrls: ['json_logic.component.scss'],
  templateUrl: 'json_logic.component.html'
})
export class BuilderFormJsonLogicComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;

  public result = [
    {'AND': [

    ]}
  ];
  public operators = [
    { label: 'ALL of Conditions (AND)', value: 'AND' },
    { label: 'ANY of the Conditions (OR)', value: 'OR' }
  ]
  public conditions = [
    { label: 'Is Equal(==)', value: '==' },
    { label: 'Is Not Equal(!=)', value: '!=' },
    { label: 'Less than(<)', value: '<' },
    { label: 'Less than or Equal(<=)', value: '<=' },
    { label: 'More than(>)', value: '>' },
    { label: 'More than or Equal(>=)', value: '>=' },
  ]
  public fields = [
    {
      label: 'Product', value: 'product', children: [
        { label: 'Sku', value: 'sku' },
        { label: 'List Price', value: 'pricing_list' },
        { label: 'Sale Price', value: 'pricing_sale' },
      ]
    },
    {
      label: 'Client', value: 'user', children: [
        { label: 'First Name', value: 'first_name' },
        { label: 'Last Name', value: 'last_name' },
      ]
    }
  ]
  addCondition(): void {

  }
  removeCondition(index:number): void {
  }
  addGroup(): void {

  }
  removeGroup(index:number): void {
  }


}
