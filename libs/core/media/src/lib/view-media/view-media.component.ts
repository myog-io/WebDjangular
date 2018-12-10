import { Component, OnInit } from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { Router } from '@angular/router';
import { MediaModel } from '../models/Media.model';
import { FileUploader, FileItem } from '@webdjangular/core/chunk-file-upload';
import { ViewMediaService } from './view-media.service';
import { ModelPaginatorControls } from 'libs/core/builder/src/lib/model-paginator/model-paginator.controls';



@Component({
  selector: 'webdjangular-view-media',
  templateUrl: './view-media.component.html',
  styleUrls: ['./view-media.component.scss']
})
export class ViewMediaComponent implements OnInit {
  page: number = 1;
  medias: MediaModel[] = [];
  uploader: FileUploader;
  modelPaginatorConfig = {
    modelToPaginate: MediaModel,
    useDatastore: this.datastore,
    pageSize: 8
  }

  modelPaginatorControls: ModelPaginatorControls;


  constructor(
    private datastore: WebAngularDataStore,
    private router: Router,
    private mediaService: ViewMediaService) { }

  ngOnInit() {

    this.uploader = new FileUploader({
      uploaderService: this.mediaService,
      authToken: "pre_token",
      //url: this.media_url,
      disableMultipart: false,
      //additionalParameter: {
      //    request: this.request.id
      //},
      isHTML5: true
      // currentChunkParam: 'current_chunk',
      // totalChunkParam: 'total_chunks',
      // chunkMethod: 'PUT',
    });
    // Have no Idea why, but this removes the error "Access-Control-Allow-Origin"
    this.uploader.onBeforeUploadItem = item => {
      item.withCredentials = false;
    };

    this.uploader.onCompleteChunk = (item: FileItem, response: any, status, headers) => {
      if (response.data.id) {
        item.setId(response.data.id)
      }
    };

    this.uploader.onSuccessItem = (item: FileItem, response: any, status, headers) => {

    };

    this.uploader.onCompleteAll = () => {
      this.getMedias()
    };

    this.uploader.onErrorItem = (item: FileItem, response: any, status, headers) => {

    };

    this.uploader.onRemoveItem = (item: FileItem) => {
      if (item.getId()) {
        this.datastore.deleteRecord(MediaModel, item.getId()).subscribe(r => {
          console.log('Removed');
        });
      }
    };
  }

  getMedias() {
    this.modelPaginatorControls.makeQuery();
  }
  nextPage() {
    this.page++;
    this.getMedias();
  }
  backPage() {
    this.page--;
    this.getMedias();
  }

  delete(event, media) {
    event.preventDefault()
    this.datastore.deleteRecord(MediaModel, media.id).subscribe(r => {
      this.getMedias()
    });
  }

  hideOverlay() {
    //document.getElementById("dragDropOverlayText").style.display = "none";
    //document.getElementById("dragDropOverlayBackdrop").style.display = "none";
  }

  showOverlay() {
    //document.getElementById("dragDropOverlayText").style.display = "block";
    //document.getElementById("dragDropOverlayBackdrop").style.display = "block";
  }

  onFileOver(e): void {
    if (e == false) {
      this.hideOverlay();
    }
    else {
      this.showOverlay();
    }
  }
  onFileSelected(e): boolean {
    this.hideOverlay();
    this.startUploader();
    return true;
  }

  startUploader(): void {
    this.uploader.uploadAll();
  }

  copyLink(event, url) {
    event.preventDefault();
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = url;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  modelPaginatorControlsGetter($event) {
    this.modelPaginatorControls = $event;
  }
}
