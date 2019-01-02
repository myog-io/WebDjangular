import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'image-gallery',
  styleUrls: ['gallery.component.scss'],
  templateUrl: './gallery.component.html',
})
export class CoreCmsGalleryComponent implements OnInit {
  @Input() arrows: boolean = null;
  @Input() indicators: boolean = null;
  @Input() images: any[];
  @Input() pauseOnHover = true;
  @Input() interval = 5000;
  constructor(private router: Router) {

  }

  ngOnInit() {

    if (this.arrows === null) {
      this.arrows = this.images.length > 1;
    }
    if (this.indicators === null) {
      this.indicators = this.images.length > 1;
    }
    //this.indicators = true;
  }

  action(image: any) {
    if (image.url) {
      this.router.navigate([image.url]);
    }
  }

}
