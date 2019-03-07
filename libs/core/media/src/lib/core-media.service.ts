import {Injectable} from '@angular/core';
import {NbAuthService} from '@nebular/auth';

import {HttpClient} from '@angular/common/http';
import {
  FileUploaderService,
  UploaderLinksOptions,
  UploaderServiceOptions
} from '@core/chunk-file-upload/src/lib/file-uploader.service';
import {FileItem} from '@core/chunk-file-upload/src/lib/file-item.class';
import {FileUploaderOptions} from '@core/chunk-file-upload/src/lib/file-uploader.class';

//import { AbstractService } from './abstract.service';
@Injectable()
export class MediaService extends FileUploaderService {

  public links: UploaderLinksOptions = {
    downloadEntry: '/api/media/#id#/',
    updateEntry: '/api/media/#id#/',
    createEntry: '/api/media/',
    deleteEntry: '/api/media/#id#/',
  };

  public options: UploaderServiceOptions = {
    createMethod: 'POST',
    updateMethod: 'PATCH',
    authorizationHeaderName: "Authorization",
    tokenPattern: 'JWT #token#',
    token: null,
    chunkSize: 1024 * 1024 * 3,
    totalChunkParamName: 'total_chunks',
    currentChunkParamName: 'current_chunk',
    fileParamName: 'file',
    idAttribute: 'id',
  };

  /**
   * Creates an instance of view media service.
   * @param http
   * @param authService
   */
  constructor(
    public http: HttpClient,
    private authService: NbAuthService,
  ) {
    super(http);

  }
  /**
   * Determines whether before upload on
   * @param item
   * @param options
   * @returns before upload
   */
  public onBeforeUpload(item: FileItem, options: FileUploaderOptions): Promise<any> {
    return new Promise((resolve, reject) => {
      this.authService.getToken().subscribe(
        (result) => {
          this.options.token = result['token'];
          resolve(true);
        },
        (err) => {
          resolve(false);
        }
      );
    });
  }
}
