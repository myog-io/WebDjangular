import { BuilderFormFieldConfig } from "@webdjangular/core/builder";

export function ExtraOptions(config: BuilderFormFieldConfig) {
  return function(target: any, propertyName: string | symbol) {
    let currentValues = Reflect.getMetadata('ExtraOptions', target) || {};

    let newValues = {};
    newValues[propertyName] = config;

    currentValues = Object.assign({}, currentValues, newValues);
    Reflect.defineMetadata('ExtraOptions', currentValues, target);
  };
}
