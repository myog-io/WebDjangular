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
  constructor(private router: Router) { }

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
      const splited = image.url.split('?');
      const url = splited[0];
      const splited_params = splited[1] ? splited[1].split('&') : null;
      const query_params = {};
      let params = null;
      if (splited_params.length > 0) {
        for (let i = 0; i < splited_params.length; i++) {
          const key_value = splited_params[i].split('=');
          query_params[key_value[0]] = key_value[1];
        }
        params = { queryParams: query_params }
      }


      this.router.navigate([url], params);
    }
  }
}
