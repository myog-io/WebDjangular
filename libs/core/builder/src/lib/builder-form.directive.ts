import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef,
  Output,
  EventEmitter
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BuilderFormButtonComponent } from './inputs/button/button.component';
import { BuilderFormInputComponent } from './inputs/input/input.component';
import { BuilderFormSelectComponent } from './inputs/select/select.component';
import { BuilderFormCkeditorComponent } from './inputs/ckeditor/ckeditor.component';
import { BuilderFormCodeComponent } from './inputs/code/code.component';
import { BuilderFormBuilderComponent } from './inputs/formbuilder/formbuilder.component';
import { BuilderFormRelationshipComponent } from './inputs/relationship/relationship.component';
import { BuilderFormFieldConfig, BuilderFormField } from './interfaces/form-config.interface';




const components: { [type: string]: Type<BuilderFormField> } = {
  button: BuilderFormButtonComponent,
  input: BuilderFormInputComponent,
  select: BuilderFormSelectComponent,
  ckeditor: BuilderFormCkeditorComponent,
  codeEditor: BuilderFormCodeComponent,
  formBuilder: BuilderFormBuilderComponent,
  relationship: BuilderFormRelationshipComponent
};

@Directive({
  selector: '[wdaBuilderFormFields]'
})
export class ScaffoldFieldDirective extends BuilderFormField
  implements OnChanges, OnInit {
  @Input() config: BuilderFormFieldConfig;

  @Input() group: FormGroup;

  @Output() relationshipUpdated: EventEmitter<any> = new EventEmitter();

  component: ComponentRef<BuilderFormField>;

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
      this.component.instance.relationshipUpdated = this.relationshipUpdated;
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
    const component = this.resolver.resolveComponentFactory<BuilderFormField>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
    this.component.instance.relationshipUpdated = this.relationshipUpdated;
  }
}
