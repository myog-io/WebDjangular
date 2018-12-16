import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { FileUploaderService, UploaderLinksOptions, UploaderServiceOptions, FileUploaderOptions, FileItem } from '@webdjangular/core/chunk-file-upload';
import { HttpClient } from '@angular/common/http';

//import { AbstractService } from './abstract.service';
@Injectable()
export class ViewMediaService extends FileUploaderService {

  public links: UploaderLinksOptions = {
    downloadEntry: '/api/media/#id#/',
    updateEntry: '/api/media/#id#/',
    createEntry: '/api/media/',
    deleteEntry: '/api/media/#id#/',
  }
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
  }
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
    const promise = new Promise((resolve, reject) => {
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
    return promise;
  }
}
