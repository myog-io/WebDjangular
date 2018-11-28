import { ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ScaffoldFormButtonComponent } from './edit/form-button/form-button.component';
import { ScaffoldFormInputComponent } from './edit/form-input/form-input.component';
import { ScaffoldFormSelectComponent } from './edit/form-select/form-select.component';
import { ScaffoldCkeditorInputComponent } from './edit/form-ckeditor/form-ckeditor.component';
import { ScaffoldFormCodeComponent } from './edit/form-code/form-code.component';
import { ScaffoldField, ScaffoldFieldConfig } from '@webdjangular/core/interfaces';
import {ScaffoldFormFormbuilderComponent} from "./edit/form-formbuilder/form-formbuilder.component";

const components: {[type: string]: Type<ScaffoldField>} = {
  button: ScaffoldFormButtonComponent,
  input: ScaffoldFormInputComponent,
  select: ScaffoldFormSelectComponent,
  ckeditor: ScaffoldCkeditorInputComponent,
  codeEditor: ScaffoldFormCodeComponent,
  formBuilder: ScaffoldFormFormbuilderComponent
};

@Directive({
  selector: '[webdjangularScaffoldDynamicField]'
})
export class ScaffoldFieldDirective extends ScaffoldField implements OnChanges, OnInit {
  @Input()
  config: ScaffoldFieldConfig;

  @Input()
  group: FormGroup;

  component: ComponentRef<ScaffoldField>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {
    super();
  }

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
