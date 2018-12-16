import { JsonApiModel } from 'angular2-jsonapi';

import 'reflect-metadata';
import { AbstractForm } from '../forms';
import { SmartTableSettings } from '../data-store';
import { BuilderFormFieldConfig, BuilderFormDisplayGroups } from 'libs/core/builder/src/lib/interfaces/form-config.interface';

export class AbstractModel extends JsonApiModel {

  public include = null;
  public static smartTableOptions: SmartTableSettings
  public displayGroups: BuilderFormDisplayGroups[] = [{
    wrapper_class: 'col-12',
    groups: [
      {
        name: 'default',
        title: null,
        sidebar: false,
      }
    ],
    conditional: null,
    sort: 0
  }];
  protected service;

  constructor(_datastore, data?: any) {
    super(_datastore, data);
    this.service = _datastore;
  }


  get hasMany(): any {
    return Reflect.getMetadata('HasMany', this)
  }
  get belongTo(): any {
    return Reflect.getMetadata('BelongsTo', this)
  }
  get extraOptions(): any {
    return Reflect.getMetadata('ExtraOptions', this)
  }

  saveHasMany() {
    let hasManyFields = Reflect.getMetadata('HasMany', this);
    let modelConfig = Reflect.getMetadata(
      'JsonApiModelConfig',
      this.constructor
    );
    let extraOptions = Reflect.getMetadata('ExtraOptions', this);

    return this.service.saveHasManyRelationship(
      hasManyFields,
      modelConfig,
      extraOptions,
      this
    );
  }

  get pk() {
    return this.id;
  }

  set pk(value) {
  }

  public toString = (): string => {
    return `(ID: ${this.id})`;
  }


  /***
   * This function will Generate and Abstract FormGroup
   */
  public getForm(): AbstractForm {
    const fg = new AbstractForm(this._datastore);
    let formFields: BuilderFormFieldConfig[] = [{ name: 'id', type: 'hidden' }];
    let formMap = {};
    let extraOptions = this.extraOptions;
    let count = 0;
    for (const key in extraOptions) {
      if (extraOptions.hasOwnProperty(key)) {
        const element = extraOptions[key];
        element.name = key;
        element.sort = element.sort || count;
        element.displayGroup = element.displayGroup || 'default';
        formFields.push(element)
        formMap[key] = count;
        count++;
      }
    }
    formFields.sort((a: any, b: any) => (a.sort > b.sort) ? 1 : ((b.sort > a.sort) ? -1 : 0));
    fg.formFields = formFields
    let dg = this.displayGroups;
    for (let i = 0; i < dg.length; i++) {
      for (let j = 0; j < dg[i].groups.length; j++) {
        dg[i].groups[j].fields = formFields.filter((field) => dg[i].groups[j].name == field.displayGroup);
      }
    }
    fg.displayGroups = dg;
    return fg;
  }

}
