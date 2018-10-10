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

@JsonApiModelConfig({
  type: 'media'
})
export class MediaModel extends AbstractModel {
  public static formClassRef = MediaForm;

  @Attribute() id: string;

  @Attribute() file: string;

  @Attribute() alt: string;

  @Attribute() created: Date;

  @Attribute() updated: Date;
  permissions: PermissionModel[];

  get pk() {
    return this.id;
  }
  get safeFileUrl() {
    // For some reason the file is comming wiwth the domain from the API, and we dont want it!
    return this.file.replace("http://localhost:4201","")
    //return this.sanitization.bypassSecurityTrustStyle(this.file);
  }
  set pk(value) {}
}
