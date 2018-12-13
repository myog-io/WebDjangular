import { JsonApiModel } from 'angular2-jsonapi';

import 'reflect-metadata';
import { AbstractForm } from '../forms';
import { SmartTableSettings } from '../data-store';
import { FormControl } from '@angular/forms';

export class AbstractModel extends JsonApiModel {

  public include = null;
  public smartTableOptions: SmartTableSettings
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
    const fg = new AbstractForm(this._datastore)
    let formFields = []
    let extraOptions = this.extraOptions
    let count = 0;
    for (const key in extraOptions) {
      if (extraOptions.hasOwnProperty(key)) {
        const element = extraOptions[key];
        element.name = key;
        element.sort = element.sort || count;
        formFields.push(element)
        count++;
      }
    }
    formFields.sort((a,b)=> (a.sort > b.sort) ? 1 : ((b.sort > a.sort) ? -1 : 0));
    fg.formFields = formFields
    return fg;
  }
}
