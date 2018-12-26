import { JsonApiModel } from 'angular2-jsonapi';

import 'reflect-metadata';
import { AbstractForm } from '../forms';
import { SmartTableSettings } from '../data-store';
import { BuilderFormFieldConfig, BuilderFormDisplayGroups } from 'libs/core/builder/src/lib/interfaces/form-config.interface';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  public getAttributeMetada(): any {
    return Reflect.getMetadata('Attribute', this)
  }
  private getHasManyEntities() {

    let hasMany = this.hasMany;
    let entities = []
    for (const key in hasMany) {
      if (hasMany.hasOwnProperty(key)) {
        const element = hasMany[key];
        if (this.hasOwnProperty(element.propertyName)) {
          const data = this[element.propertyName];
          for (let i = 0; i < data.length; i++) {
            entities.push(data[i])

          }
        }
      }
    }
    return entities;
  }
  public saveAll(params?: any, headers?: HttpHeaders, customUrl?: string): Promise<this> {
    // TODO MANY TO MANY RELATIONSHIP REMOVAL
    const children = this.getHasManyEntities();
    console.log("CHIL",children)
    const promises = [];
    return new Promise((resolve, reject) => {
      this.save(params, headers, customUrl).subscribe(
        (entry: this) => {
          // Let's First Create/Update All Children Entries
          // Now Delete de Relationships
          const child_to_remove = entry.getHasManyEntities();
          console.log(child_to_remove)
          for (let i = 0; i < children.length; i++) {
            const child = children[i];
            // TODO: IMPROVE THIS ONE, Every child is being marked as hasDirtyAttributes
            if (child.hasDirtyAttributes) {
              child.internalDatastore = this.service;
              const relationships: any = this.service.getRelationships(child);
              const belongTo = child.belongTo;
              if (belongTo) {
                for (let j = 0; j < belongTo.length; j++) {
                  if (belongTo[j].relationship === this.modelConfig.type) {
                    child[belongTo[j].propertyName] = entry;
                  }
                }
              }
              // Compare with New Children to Remove

              if (child.id) {
                child_to_remove.splice(child_to_remove.findIndex((data) => data.id === child.id && data.modelConfig.type === child.modelConfig.type), 1);
              }

              let promise = new Promise((resolve, reject) => {
                // Maybe Use SaveALL and do it Recursive?
                child.save().subscribe(
                  (response) => {
                    resolve(response);
                  },
                  (error) => {
                    reject(error);
                  }
                )
              })
              promises.push(promise)

            }

          }
          // Removing
          for (let i = 0; i < child_to_remove.length; i++) {
            const child = child_to_remove[i];
            let promise = new Promise((resolve, reject) => {
              // This will Delete Recordy of a ManyToMany Relationship as Well and SHould Notr
              //this.service.deleteRecord(child.constructor, child.pk).subscribe(
              //  (response) => {
              //    resolve(response);
              //  },
              //  (error) => {
              //    reject(error);
              //  }
              //);

            })
            promises.push(promise)
          }


          Promise.all(promises).then(
            (values) => {
              resolve(entry);
            },
            (error) => {
              reject(error)
            }
          )
        },
        (error: any) => {
          reject(error)
        }
      )

    })
  }

  saveHasMany() {
    let hasManyFields = this.hasMany;
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
    let formFields: BuilderFormFieldConfig[] = [];
    if ('id' in this.getAttributeMetada()) {
      formFields.push({ name: 'id', type: 'hidden' });
    }
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
