import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';

import { PermissionModel } from '@webdjangular/core/users-models';

import { ExtraOptions } from '@webdjangular/core/decorator';
import { AbstractModel } from '@webdjangular/core/data-models';
import { MediaForm } from '../forms/Media.form';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

@JsonApiModelConfig({
  type: 'media'
})
export class MediaModel extends AbstractModel {
  constructor(_datastore, data?: any) {
    super(_datastore, data);
  }


  public static formClassRef = MediaForm;

  @Attribute()
  id: string;

  @Attribute()
  alt: string;

  @Attribute()
  file: string;

  @Attribute()
  content_type: string;

  @Attribute()
  extension: string;

  @Attribute()
  bytes: number;

  @Attribute()
  current_chunk: number;

  @Attribute()
  total_chunks: number;

  @Attribute()
  created: Date;

  @Attribute()
  updated: Date;

  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }
  get safeFileUrl(): SafeUrl {
    // For some reason the file is comming wiwth the domain from the API, and we dont want it!
    return this.file.replace("http://localhost:4201", "")
    //return this._sanitizer.bypassSecurityTrustUrl(this.file);
  }
  set pk(value) { }
}
