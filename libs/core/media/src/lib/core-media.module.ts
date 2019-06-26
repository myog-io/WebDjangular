import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMediaComponent } from './view-media/view-media.component';
import { RouterModule } from '@angular/router';
import { MediaService } from './core-media.service';
import { ThemeModule } from '@core/admin/src/lib/@theme';
import { ChunkFileUploadModule } from '@core/chunk-file-upload/src/lib/chunk-file-upload.module';
import { CoreSharedSafePipe } from '@core/shared/src/lib/pipes/safe/safe.module';
import { BuilderFormModule } from '@core/builder/src/lib/builder-form.module';
import { WdaUploaderModule } from './wda-uploader/wda-uploader.module';
@NgModule({
  imports: [
    ThemeModule,
    CommonModule,
    ChunkFileUploadModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ViewMediaComponent }
    ]),
    CoreSharedSafePipe,
    BuilderFormModule,
    WdaUploaderModule
  ],
  exports: [ ],
  providers: [MediaService],
  declarations: [ViewMediaComponent]
})
export class CoreMediaModule { }
