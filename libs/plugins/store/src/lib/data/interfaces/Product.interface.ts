export interface ProductPrice {
  list: string;
  sale?: string;
}
export enum ProductClasses {
  simple = 'simple',
  variant = 'variant',
  addon = 'addon',
  bundle = 'bundle'
}

export enum ProductAttributeTypeValues {
  switch = 'switch',
  button = 'button',
  text = 'text',
  select = 'select',
  codeEditor = 'codeEditor'
}
