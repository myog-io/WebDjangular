import { ValidatorFn, AbstractControl, Validators, ValidationErrors } from '@angular/forms';
import * as moment from 'moment';

/**
 * @description
 * Provides a set of custom validators that can be used by form controls.
 *
 * A validator is a function that processes a `FormControl` or collection of
 * controls and returns an error map or null. A null map means that validation has passed.
 *
 */
export class WDAValidators {
    static json(control: AbstractControl): ValidationErrors | null {
        if (control.value) {
            try {
                JSON.parse(control.value)
            } catch (error) {
                return { 'pattern': { 'requiredPattern': "json", 'actualValue': "not json" } };
            }
        }
        return null;
    }

    static url(control: AbstractControl): ValidatorFn {
        return Validators.pattern('^(ftp|http|https):\/\/[^ "]+$');
    }
    static slug(control: AbstractControl): ValidatorFn {
        return Validators.pattern('^[a-z0-9-_/]+$');
    }
    static date(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const date = control.value;
            if (date.length < 10) {
                return null;
            }
            const m = moment(date, 'DD/MM/YYYY');
            if (!m.isValid()) {
                return { invalidDate: true };
            }
            return null;
        };
    }


    static over18(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const date = control.value;
            if (date.length < 10) {
                return null;
            }
            const birthday = moment(date, 'DD/MM/YYYY');
            const age = moment.duration(moment().diff(birthday)).asYears();
            if (age <= 18) {
                return { notOver18: true };
            }
            return null;
        };
    }


    static cpf(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const cpf = control.value;
            if (cpf) {
                let numbers, digits, sum, i, result, equalDigits;
                equalDigits = 1;

                if (cpf.length < 11) {
                    return { invalidCPF: true };
                }

                for (i = 0; i < cpf.length - 1; i++) {
                    if (cpf.charAt(i) !== cpf.charAt(i + 1)) {
                        equalDigits = 0;
                        break;
                    }
                }

                if (!equalDigits) {
                    numbers = cpf.substring(0, 9);
                    digits = cpf.substring(9);
                    sum = 0;
                    for (i = 10; i > 1; i--) {
                        sum += numbers.charAt(10 - i) * i;
                    }

                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(0))) {
                        return { invalidCPF: true };
                    }
                    numbers = cpf.substring(0, 10);
                    sum = 0;

                    for (i = 11; i > 1; i--) {
                        sum += numbers.charAt(11 - i) * i;
                    }
                    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

                    if (result !== Number(digits.charAt(1))) {
                        return { invalidCPF: true };
                    }
                    return null;
                } else {
                    return { invalidCPF: true };
                }
            }
            return null;
        };
    }

    static rg(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const rg = control.value;
            if (rg) {
                if (rg.length < 8) {
                    return { invalidRG: true };
                }
            }
            return null;
        };
    }

    static cnpj(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const cnpj = control.value;
            if (cnpj) {
                if (cnpj.length != 14) return { invalidCNPJ: true };

                let tamanho = cnpj.length - 2;
                let numeros = cnpj.substring(0, tamanho);
                let digitos = cnpj.substring(tamanho);
                let soma = 0;
                let pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2) pos = 9;
                }
                let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
                if (resultado != digitos.charAt(0)) return { invalidCNPJ: true };

                tamanho = tamanho + 1;
                numeros = cnpj.substring(0, tamanho);
                soma = 0;
                pos = tamanho - 7;
                for (let i = tamanho; i >= 1; i--) {
                    soma += numeros.charAt(tamanho - i) * pos--;
                    if (pos < 2) pos = 9;
                }
                resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
                if (resultado != digitos.charAt(1)) {
                    return { invalidCNPJ: true };
                }
                return null;
            }
            return null;
        };
    }
    static fullName(): ValidatorFn {
        return (control: AbstractControl): Validators => {
            const name = control.value.trim();
            if (name) {
                if (name.split(" ").length < 2) {
                    return { invalidName: true };
                }
            }
            return null;
        };
    }
}
