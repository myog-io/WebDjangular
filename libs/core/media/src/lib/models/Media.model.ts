import {
  JsonApiModelConfig,
  Attribute,
  HasMany,
  BelongsTo
} from 'angular2-jsonapi';
import { AbstractModel } from '@core/data/src/lib/models';
import { PermissionModel } from '@core/users/src/lib/models';
import { SafeUrl } from '@angular/platform-browser';

@JsonApiModelConfig({
  type: 'Media'
})
export class MediaModel extends AbstractModel {
  constructor(_datastore, data?: any) {
    super(_datastore, data);
  }

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
  is_secure: boolean;

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
    return this.file.replace('http://localhost:4201', '');
    //return this._sanitizer.bypassSecurityTrustUrl(this.file);
  }
  set pk(value) {}
}
