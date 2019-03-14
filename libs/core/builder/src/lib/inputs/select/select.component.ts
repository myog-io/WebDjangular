import { Component } from '@angular/core';
import { BuilderFormField, BuilderFormFieldConfig } from '../../interfaces/form-config.interface';
import { AbstractForm } from '@core/data/src/lib/forms';

@Component({
  selector: 'wda-form-select',
  templateUrl: 'select.component.html',
  styleUrls: ['select.component.scss'],
})
export class BuilderFormSelectComponent implements BuilderFormField {
  config: BuilderFormFieldConfig;
  group: AbstractForm;
  options =  [
        { "id": "", "name": "Departamento"},
        { "id": "Assinatura", "name": "Assinatura"},
        { "id": "Cobrança", "name": "Cobrança"},
        { "id": "Comercial", "name": "Comercial"},
        { "id": "Financeiro", "name": "Financeiro"},
        { "id": "Suporte Técnico", "name": "Suporte Técnico"}
    ];

  ngOnInit() {
    console.log(this.config);
  }

}
