export class Theme {
  public name: string;
  public slug: string;
  public angular_module: string;
  public version: string;
  public parent_theme: boolean;

  constructor(private data: any) {
    this.name = data.name;
    this.slug = data.slug;
    this.angular_module = data.angular_module;
    this.version = data.version;
    this.parent_theme = data.parent_theme;
  }
}
