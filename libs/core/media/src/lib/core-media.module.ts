import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewMediaComponent } from './view-media/view-media.component';
import { RouterModule } from '@angular/router';
import { ChunkFileUploadModule } from '@webdjangular/core/chunk-file-upload';
import { ViewMediaService } from './view-media/view-media.service';
import { ThemeModule } from '@webdjangular/core/admin-theme';
import { CoreSharedSafePipe } from '@webdjangular/core/shared';
import { BuilderFormModule } from '@webdjangular/core/builder';
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
  ],
  providers: [
    ViewMediaService
  ],
  declarations: [ViewMediaComponent]
})
export class CoreMediaModule {}
