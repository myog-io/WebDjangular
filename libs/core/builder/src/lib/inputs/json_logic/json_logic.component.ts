import { Component, OnInit } from '@angular/core';
import {
  BuilderFormField,
  BuilderFormFieldConfig
} from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { HttpClient } from '@angular/common/http';

interface BaseLogicCondition {
  type: 'logic_condition';
  condition: string;
  value: string | BaseLogicCondition;
  variable: string;
}

interface BaseLogicGroup {
  type: 'logic_group';
  operator: string;
  children: (BaseLogicCondition | BaseLogicGroup)[];
}

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
      AND: []
    }
  ];
  public logic_group: BaseLogicGroup = {
    type: 'logic_group',
    operator: 'AND',
    children: []
  };

  public operators = [
    { label: 'ALL of Conditions (AND)', value: 'AND' },
    { label: 'ANY of the Conditions (OR)', value: 'OR' }
  ];
  // TODO: We Have to Work with the 'some'  Operator and Others for the ARRAYS
  public conditions = [
    { label: 'Is Equal(==)', value: '==' },
    { label: 'Is Not Equal(!=)', value: '!=' },
    { label: 'Less than(<)', value: '<' },
    { label: 'Less than or Equal(<=)', value: '<=' },
    { label: 'Greater than(>)', value: '>' },
    { label: 'Greater than or Equal(>=)', value: '>=' },
    { label: 'Contains', value: 'contains' },
    { label: 'Not Contains', value: 'not_contains' }
  ];
  public mc_variables = ['contains', 'not_contains'];
  public fields = [];

  constructor(
    private datastore: WebAngularDataStore,
    private http: HttpClient
  ) {
    const models = datastore.datastoreConfig.models;
    //for (const key in models) {
    //  if (models.hasOwnProperty(key)) {
    //    const model = new models[key](datastore);
    //    const attributes = Reflect.getMetadata('Attribute', model)
    //    for (const attr_name in attributes) {
    //      if (attributes.hasOwnProperty(attr_name)) {
    //        this.fields.push({
    //          id: `${model.modelConfig.type}.${attr_name}`,
    //          name: `${model.modelConfig.type.toLowerCase()}.${attr_name}`
    //        })
    //      }
    //    }
    //  }
    //}
  }

  set_logic_recursive(children: any[]) {
    let logics = [];
    if (children) {
      for (let i = 0; i < children.length; i++) {
        for (const key in children[i]) {
          if (children[i].hasOwnProperty(key)) {
            const element = children[i][key];
            if (key == 'OR' || key == 'AND') {
              logics.push({
                type: 'logic_group',
                operator: key,
                children: this.set_logic_recursive(element)
              });
            } else {
              let variable = element[0]['var'];

              if (this.fields.indexOf(variable) === -1) {
                this.fields.push({
                  id: `${variable}`,
                  name: `${variable}`
                });
                this.addTagPromise(variable).then();
              }
              logics.push({
                type: 'logic_condition',
                condition: key,
                value: this.mc_variables.indexOf(key) === -1 ? element[1] : this.set_logic_recursive([element[1]])[0],
                variable: variable
              });
            }
          }
        }
      }
    }
    return logics;
  }
  ngOnInit() {
    if (this.config.json_logic_options_url) {
      this.get_options().then(data => {
        this.set_starting_logic();
      });
    } else {
      this.set_starting_logic();
    }
  }
  set_starting_logic() {
    if (this.group.entity && this.group.entity.id) {
      this.start_loading();
    } else {
      let subscription = this.group.valueChanges.subscribe(data => {
        subscription.unsubscribe();
        this.start_loading();
      });
    }
  }
  start_loading() {
    if (this.group.entity && this.group.entity.id) {
      if (this.group.entity[this.config.name]) {
        let key = Object.keys(this.group.entity[this.config.name])[0];
        this.logic_group = {
          type: 'logic_group',
          operator: key,
          children: this.set_logic_recursive(
            this.group.entity[this.config.name][key]
          )
        };
      }
    }
  }
  get_options(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.httget(this.config.json_logic_options_url).subscribe(
        (options: any) => {
          if (options.data) {
            for (const key in options.data) {
              if (options.data.hasOwnProperty(key)) {
                const element = options.data[key];
                this.fields.push({
                  id: `${key}`,
                  name: `${key.toLowerCase()}`
                });
                for (let i = 0; i < element.length; i++) {
                  const attr = element[i];
                  this.fields.push({
                    id: `${key}.${attr}`,
                    name: `${key.toLowerCase()}.${attr}`
                  });
                }
              }
            }
          }
          resolve(true);
        },
        error => {
          reject(error);
        }
      );
    });
  }
  addTagPromise(name) {
    return new Promise(resolve => {
      resolve({
        id: name,
        name: name,
        valid: true
      });
    });
  }
  updateField() {
    this.group.entity[this.config.name] = this.get_json_logic();
  }
  get_logic_recursive(children: any[]): any {
    let logic = [];
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      switch (element.type) {
        case 'logic_condition':
          let condition = {};
          let value = element.value;
          if (value && typeof value === 'string') {
            // Forcing Logic to be Bolean
            if (value.toLowerCase() === 'false') {
              value = false;
            } else if (value.toLowerCase() === 'true') {
              value = true;
            }
          }
          if (this.mc_variables.indexOf(element.condition) >= 0 && typeof value != 'object') {
            element.value = {
              type: 'logic_condition',
              condition: '==',
              value: '',
              variable: ''
            };
            value = value;
          }
          condition[element.condition] = [
            { var: element.variable },
            this.mc_variables.indexOf(element.condition) === -1 ? value : this.get_logic_recursive([value])[0]
          ];
          logic.push(condition);

          break;
        default:

          let group = {};
          group[element.operator] = this.get_logic_recursive(element.children);
          logic.push(group);
          break;
      }
    }
    return logic;
  }
  get_json_logic(): any {
    let json_logic = {};
    json_logic[this.logic_group.operator] = this.get_logic_recursive(this.logic_group.children);
    if (json_logic[this.logic_group.operator].length <= 0) {
      return {};
    }
    return json_logic;
  }

  addCondition(node: BaseLogicGroup): void {
    node.children.push({
      type: 'logic_condition',
      condition: '==',
      value: '',
      variable: ''
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
      children: []
    });
    this.updateField();
  }
  removeGroup(node: BaseLogicGroup, group: BaseLogicGroup): void {
    node.children.splice(node.children.indexOf(group), 1);
    this.updateField();
  }
}
