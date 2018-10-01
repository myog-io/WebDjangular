export function ExtraOptions(config: any = {}) {
  return function(target: any, propertyName: string | symbol) {
    let currentValues = Reflect.getMetadata('ExtraOptions', target) || {};

    let newValues = {};
    newValues[propertyName] = config;

    currentValues = Object.assign({}, currentValues, newValues);
    Reflect.defineMetadata('ExtraOptions', currentValues, target);
  };
}
