import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ScaffoldField } from '../../../@core/interfaces/scaffold-field.interface';
import { ScaffoldFieldConfig } from '../../../@core/interfaces/scaffold-field-config.interface';
import { ScaffoldFormButtonComponent } from './form-button/form-button.component';
import { ScaffoldFormInputComponent } from './form-input/form-input.component';
import { ScaffoldFormSelectComponent } from './form-select/form-select.component';
import { ScaffoldCkedtiorInputComponent } from './form-ckeditor/form-ckeditor.component';

const components: {[type: string]: Type<ScaffoldField>} = {
  button: ScaffoldFormButtonComponent,
  input: ScaffoldFormInputComponent,
  select: ScaffoldFormSelectComponent,
  ckeditor: ScaffoldCkedtiorInputComponent,
};

@Directive({
  selector: '[scaffoldDynamicField]'
})
export class ScaffoldFieldDirective implements ScaffoldField, OnChanges, OnInit {
  @Input()
  config: ScaffoldFieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<ScaffoldField>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
      this.component.instance.group = this.group;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${this.config.type}).
        Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<ScaffoldField>(components[this.config.type]);
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }
}
