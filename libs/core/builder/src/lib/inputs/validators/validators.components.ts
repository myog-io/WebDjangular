import { Component, Input, OnInit } from "@angular/core";
import { BuilderFormFieldConfig, BuilderFormValidatorMessages } from "../../interfaces/form-config.interface";
import { AbstractForm } from "@core/data/src/lib/forms";


@Component({
  selector: 'wda-form-validators',
  template: `
    <div *ngIf="input">
      <div *ngIf="input.invalid && (input.dirty || input.touched)" class="alert alert-danger">

        <div *ngIf="input.errors.required">
          {{ errors.error_required }}
        </div>
        <div *ngIf="input.errors.minlength">
          {{ errors.error_min_length }}
        </div>
        <div *ngIf="input.errors.maxLength">
          {{ errors.error_max_length }}
        </div>
        <div *ngIf="input.errors.email">
          {{ errors.error_email }}
        </div>
        <div *ngIf="input.errors.forbiddenName">
          {{config.label}} cannot be {{input.value}}.
        </div>
        <div *ngIf="input.errors.pattern">
          {{ errors.error_invalid }}
        </div>
        
      </div>
    </div>
  `
})
export class BuilderFormValidatorComponent implements OnInit {
  @Input() config: BuilderFormFieldConfig;
  @Input() input: AbstractForm;
  public errors: BuilderFormValidatorMessages = {
    'error_required': "{label} é obrigatório",
    'error_email': "Endereço de Email inválido!",
    'error_date': "Data inválida!",
    'error_match': "Estes campos devem ser iguais!",
    'error_min_length': "{label} deve ter no minimo {min} letras",
    'error_max_length': "{label} deve ter no maximo {max} letras",
    'error_invalid': "{label} invalido",
    'error_honeypot': "ERRO DO HONEYPOT",
  }
  ngOnInit() {
    if (this.config.validator_messages) {
      for (const key in this.config.validator_messages) {
        if (this.config.validator_messages.hasOwnProperty(key)) {
          const str = this.config.validator_messages[key];
          if (str) {
            this.errors[key] = str;
          }
        }
      }
    }
    for (const key in this.errors) {
      if (this.errors.hasOwnProperty(key)) {
        this.errors[key] = this.formatMessage(this.errors[key], { label: this.config.label });
      }
    }
  }
  formatMessage(str: string, params: any) {
    if (params) {
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), params[key]);
        }
      }
    }
    return str;
  }

}
