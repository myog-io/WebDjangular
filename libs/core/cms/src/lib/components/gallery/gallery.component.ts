import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryLayout } from 'ngx-gallery';

@Component({
  selector: 'image-gallery',
  template: `
    <ngx-gallery style="display:flex" [options]="galleryOptions" [images]="galleryImages"></ngx-gallery>
  `,
})
export class CoreCmsGalleryComponent implements OnInit {
  @Input() options: NgxGalleryOptions[] = []

  @Input() images: NgxGalleryImage[] = [];
  public galleryOptions: NgxGalleryOptions[];
  public galleryImages: NgxGalleryImage[];
  ngOnInit() {
    //TODO: Improve and make sure the options are concatenating
    this.galleryOptions = [
      {
        fullWidth: true,
        height: '500px',
        thumbnails: false,
        imageArrows: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false,
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '400px',
        fullWidth: true,
        thumbnails: false,
        imageArrows: false,
      },
      // max-width 400
      {
        breakpoint: 400,
        width: '100%',
        height: '300px',
        fullWidth: true,
        thumbnails: false,
        imageArrows: false,
      }
    ]
    if (this.options.length > 0) {
      this.galleryOptions = this.options;
    }
    this.galleryImages = this.images;
  }

}
