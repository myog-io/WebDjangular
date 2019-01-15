import { Component, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { AbstractForm } from '@webdjangular/core/data-forms';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { WebAngularDataStore } from '@webdjangular/core/services';

interface BaseLogicCondition {
  type: 'logic_condition',
  condition: string,
  value: string,
  variable: string,
};

interface BaseLogicGroup {
  type: 'logic_group',
  operator: string;
  children: (BaseLogicCondition | BaseLogicGroup)[]
};


@Component({
  selector: 'wda-form-json-logic',
  styleUrls: ['json_logic.component.scss'],
  templateUrl: 'json_logic.component.html'
})
export class BuilderFormJsonLogicComponent implements BuilderFormField, OnInit {
  config: BuilderFormFieldConfig;
  group: AbstractForm;

  public result = [
    {
      'AND': [

      ]
    }
  ];
  public logic_group: BaseLogicGroup = {
    type: 'logic_group',
    operator: 'AND',
    children: [

    ]
  };

  public operators = [
    { label: 'ALL of Conditions (AND)', value: 'AND' },
    { label: 'ANY of the Conditions (OR)', value: 'OR' }
  ]
  public conditions = [
    { label: 'Is Equal(==)', value: '==' },
    { label: 'Is Not Equal(!=)', value: '!=' },
    { label: 'Less than(<)', value: '<' },
    { label: 'Less than or Equal(<=)', value: '<=' },
    { label: 'Greater than(>)', value: '>' },
    { label: 'Greater than or Equal(>=)', value: '>=' },
  ]
  public fields = [

  ]

  constructor(private datastore: WebAngularDataStore) {
    const models = datastore.datastoreConfig.models;
    for (const key in models) {
      if (models.hasOwnProperty(key)) {
        const model = new models[key](datastore);
        const attributes = Reflect.getMetadata('Attribute', model)
        for (const attr_name in attributes) {
          if (attributes.hasOwnProperty(attr_name)) {
            this.fields.push({
              label: `${model.modelConfig.type}.${attr_name}`,
              value: `${model.modelConfig.type.toLowerCase()}.${attr_name}`
            })
          }
        }
      }
    }
  }
  set_logic_recursive(children: any[]) {
    let logics = []
    for (let i = 0; i < children.length; i++) {
      for (const key in children[i]) {
        if (children[i].hasOwnProperty(key)) {
          const element = children[i][key];
          if (key == "OR" || key == "AND") {
            logics.push({
              type: 'logic_group',
              operator: key,
              children: this.set_logic_recursive(element)
            });
          } else {
            logics.push({
              type: 'logic_condition',
              condition: key,
              value: element[1],
              variable: element[0]['var'],
            });

          }
        }
      }

    }
    return logics;
  }
  ngOnInit() {

    let subscription = this.group.valueChanges.subscribe((data)=>{
      if (this.group.entity && this.group.entity.id) {
        subscription.unsubscribe();
        if (this.group.entity[this.config.name]) {
          let key = Object.keys(this.group.entity[this.config.name])[0]
          this.logic_group = {
            type: 'logic_group',
            operator: key,
            children: this.set_logic_recursive(this.group.entity[this.config.name][key])
          };
        }
      }
    })
  }
  updateField() {
    this.group.entity[this.config.name] = this.get_json_logic();

  }
  get_logic_recursive(children: any[]): any {
    let logic = []
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      switch (element.type) {
        case 'logic_condition':
          let condition = {}
          condition[element.condition] = [{ 'var': element.variable }, element.value]
          logic.push(condition)
          break;
        default:
          let group = {}
          group[element.operator] = this.get_logic_recursive(element.children)
          logic.push(group)
          break;
      }
    }
    return logic
  }
  get_json_logic(): any {
    let json_logic = {};
    json_logic[this.logic_group.operator] = this.get_logic_recursive(this.logic_group.children)
    if (json_logic[this.logic_group.operator].length <= 0) {
      return {};
    }
    return json_logic
  }

  addCondition(node: BaseLogicGroup): void {
    node.children.push({
      type: 'logic_condition',
      condition: '==',
      value: '',
      variable: '',
    });
    this.updateField();
  }
  removeCondition(node: BaseLogicGroup, condition: BaseLogicCondition): void {
    node.children.splice(node.children.indexOf(condition), 1);
    this.updateField();
  }
  addGroup(node: BaseLogicGroup): void {
    node.children.push({
      type: 'logic_group',
      operator: 'AND',
      children: [

      ]
    });
    this.updateField();
  }
  removeGroup(node: BaseLogicGroup, group: BaseLogicGroup): void {
    node.children.splice(node.children.indexOf(group), 1);
    this.updateField();
  }


}
