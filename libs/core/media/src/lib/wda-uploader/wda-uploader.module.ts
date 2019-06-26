import { NgModule } from '@angular/core';
import { ChunkFileUploadModule } from '@core/chunk-file-upload/src/lib/chunk-file-upload.module';
import { WdaUploaderComponent } from './wda-uploader.component';
import { MediaService } from '../core-media.service';
@NgModule({
  imports: [
    ChunkFileUploadModule,
  ],
  exports: [ WdaUploaderComponent],
  providers: [MediaService],
  declarations: [WdaUploaderComponent]
})
export class WdaUploaderModule { }
