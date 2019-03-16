import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'image-gallery',
  styleUrls: ['gallery.component.scss'],
  templateUrl: './gallery.component.html'
})
export class CoreCmsGalleryComponent implements OnInit {
  @Input() arrows: boolean = false;
  @Input() indicators: boolean = null;
  @Input() images: string;
  @Input() pauseOnHover = true;
  @Input() interval = 5000;

  public widthS = '768px';
  public widthM = '992px';
  public widthL = '1200px';

  image_array: any[];
  constructor(private router: Router) {}

  ngOnInit() {
    this.image_array = JSON.parse(this.images);
    if (this.image_array) {
      if (this.arrows === null) {
        this.arrows = this.image_array.length > 1;
      }
      if (this.indicators === null) {
        this.indicators = this.image_array.length > 1;
      }
    }
    //this.indicators = true;
  }

  action(image: any) {
    if (image.url) {
      this.router.navigate([image.url]);
    }
  }
}
