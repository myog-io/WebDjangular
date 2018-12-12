
export interface ProductPrice {
  list: string;
  sale?: string;

}
export enum ProductClasses {
  simple = 'simple',
  variant = 'variant',
  bundle = 'bundle',
}

export enum ProductAttributeTypeValues {
  button = 'button',
  text = 'text',
  select = 'select',
  ckeditor = 'ckeditor',
  codeEditor = 'codeEditor'
}
