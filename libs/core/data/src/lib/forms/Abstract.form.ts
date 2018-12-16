import { JsonApiModel } from 'angular2-jsonapi';

import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

import { BuilderFormFieldConfig } from '@webdjangular/core/builder';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { BuilderFormDisplayGroups } from 'libs/core/builder/src/lib/interfaces/form-config.interface';
import { AbstractModel } from '../models';

export class AbstractForm extends FormGroup {

  /**
   * Form fields of abstract form
   */
  public entity: AbstractModel;
  public formFields: BuilderFormFieldConfig[] = [];
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

  /**
   * Creates an instance of abstract form.
   */
  public constructor(private datastore: WebAngularDataStore) {
    super({});
  }

  /**
   * Generates form
   */
  public generateForm() {
    for (let i = 0; i < this.formFields.length; i++) {
      const element = this.formFields[i];
      const propName = element.name
      if (this.formFields[i].formType == FormArray) {

        this.registerControl(propName, new FormArray([], []));
      } else if (this.formFields[i].formType == FormGroup) {
        if (this.formFields[i].model) {
          let entity = new this.formFields[i].model(this.datastore)
          const fb = entity.getForm()
          fb.generateForm();
          this.registerControl(propName, fb);
        } else {
          this.registerControl(propName, new FormGroup({}));
        }
      } else {
        let validators = [];

        if (typeof this.formFields[i]['validators'] !== 'undefined') {
          validators = this.formFields[i]['validators'];
        }

        this.registerControl(propName, new FormControl(null, validators));
      }
    }
  }

  /**
   * Populates form
   * @param [entity]
   */
  public populateForm(entity: JsonApiModel | any = null) {
    if (!entity) return false;
    this.entity = entity;
    for (let i = 0; i < this.formFields.length; i++) {
      const element = this.formFields[i];
      let propName = element.name
      // From Array
      if (this.formFields[i].formType == FormArray && typeof entity[propName] !== 'undefined') {
        for (let i = 0; i < entity[propName].length; i++) {
          this.pushToFormArrayAttribute(propName, entity[propName][i]);
        }
      } else {
        if (this.formFields[i].formType == FormGroup && typeof entity[propName] !== 'undefined') {
          let fg = this.get(propName) as AbstractForm;
          if(fg.populateForm){
            fg.populateForm(entity[propName]);
          }
        } else if (typeof entity[propName] !== 'undefined') {
          this.get(propName).setValue(entity[propName], { emitEvent: true });
        }
      }
    }
  }
  private createEntity(model: any, data: any) {
    let id = null;
    if ('id' in data && data.id) {
      id = data.id;
      delete(data.id);
    } else if ('pk' in data && data.pk) {
      id = data.pk;
      delete(data.pk);
    }
    return new model(this.datastore, {id:id,attributes:data});
  }
  private getFormFieldByName(name: string) {
    return this.formFields.find((data) => data.name == name);
  }
  /**
   * Updates model
   * @param entity JsonApiModel
   */
  public updateModel(entity: JsonApiModel) {
    let values = this.value;
    for (let propName in values) {
      let field = this.getFormFieldByName(propName);
      switch (field.formType) {
        case FormGroup:
          if (field.model) {
            entity[propName] = this.createEntity(field.model, this.get(propName).value)
          } else {
            entity[propName] = this.get(propName).value;
          }
          break;
        case FormArray:
          if (field.model) {
            const vals = this.get(propName).value;
            let entities = [];

            for (let i = 0; i < vals.length; i++) {
              entities.push(this.createEntity(field.model, vals[i]))
            }
            entity[propName] = entities;

          } else {
            entity[propName] = this.get(propName).value;
          }
          break
        default:
          entity[propName] = values[propName];
          break;
      }
    }
    console.log("ENTIDADE ATUALIZADA COM SUCESSO",entity)
  }


  /**
   * Forms key
   * @param [formKey]
   * @param [fullArray]
   * @returns attribute has many difference
   */
  public getAttributeHasManyDifference(formKey: string = null, fullArray = []): String[] {
    let diff = [];
    let control = this.get(formKey);
    let hasNot = true;

    fullArray.map(function (item) {
      hasNot = true;
      control.value.map(function (item2) {
        if (item2.pk == item.pk) {
          hasNot = false;
        }
      });

      if (hasNot == true) {
        diff.push(item);
      }
    });

    return diff;
  }

  /**
   * Does entity has relationship
   * @param [formKey]
   * @param [toRelateEntity]
   * @returns
   */
  public doesEntityHasRelationship(formKey: string = null, toRelateEntity = null) {
    let control = this.get(formKey);

    return (
      control.value.filter(function (alreadyRelatedEntity) {
        return alreadyRelatedEntity.pk == toRelateEntity.pk;
      }).length > 0
    );
  }

  /**
   * Checkboxs relation listener
   * @param $event
   * @param [formKey]
   * @param [toRelateEntity]
   */
  public checkboxRelationListener($event, formKey: string = null, toRelateEntity = null) {
    let control = this.get(formKey) as FormArray;

    if ($event.target.checked == false) {
      for (let i = 0; i < control.value.length; i++) {
        if (control.value[i].pk == toRelateEntity.pk) {
          control.removeAt(i);
        }
      }
    } else {
      let field = this.getFormFieldByName(formKey);
      let entity = new field.model();
      let fb = entity.getForm();
      fb.generateForm();
      fb.populateForm(toRelateEntity);
      control.push(fb);
    }
  }

  /**
   * Pushs to form array attribute
   * @param [formKey]
   * @param entityToPush
   */
  public pushToFormArrayAttribute(formKey: string = null, entityToPush) {
    let field = this.getFormFieldByName(formKey);
    if (field.formType === FormArray) {
      let fa = this.get(formKey) as FormArray;
      let f: AbstractForm;
      if (field.model) {
        let entity = new field.model();
        f = entity.getForm();
      } else {
        f = entityToPush.getForm();
      }
      f.generateForm();
      f.populateForm(entityToPush);
      fa.push(f);

    }
  }

  public formArrayRemoveAt(formKey: string = null, index = 1) {
    let field = this.getFormFieldByName(formKey);
    if (field.formType === FormArray) {
      let fa = this.get(formKey) as FormArray;
      fa.removeAt(index);
    }
  }
  /**
   * Transforming the Group to String for the Scaffold Naming
   */
  public toString = (): string => {
    return `#${this.value.pk}`;
  }
}
