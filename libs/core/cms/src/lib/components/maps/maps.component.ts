import { Component, OnInit, Input } from '@angular/core';
import { MapTypeStyle } from '@agm/core';

@Component({
  selector: 'cms-maps',
  styleUrls: ['maps.component.scss'],
  template: `
    <agm-map
      *ngIf="!loading"
      [latitude]="lat"
      [longitude]="lng"
      [disableDefaultUI]="true"
      [styles]="styles"
      [zoom]="zoom"
    >
      <span *ngFor="let item of pins">
        <agm-marker
          [latitude]="item.lat"
          [longitude]="item.lng"
          [markerClickable]="item?.title ? true : false"
        >
          <agm-info-window>
            <strong>{{ item?.title }}</strong>
          </agm-info-window>
        </agm-marker>
      </span>
    </agm-map>
  `
})
export class CoreCmsMapsComponent implements OnInit {
  // TODO: Improve
  @Input() pins: any[] = [];
  @Input() zoom = 7.5;
  @Input() color: string;
  lat: number;
  lng: number;
  loading = true;
  public styles: MapTypeStyle[];
  ngOnInit() {
    // Centering the pins
    let minLat: number = 999999;
    let maxLat: number = -99999;
    let minLon: number = 99999;
    let maxLon: number = -99999;

    for (let i = 0; i < this.pins.length; i++) {
      const item: any = this.pins[i];
      if (item.lat && item.lng) {
        maxLat = Math.max(item.lat, maxLat);
        minLat = Math.min(item.lat, minLat);
        maxLon = Math.max(item.lng, maxLon);
        minLon = Math.min(item.lng, minLon);
      }
    }
    this.lat = (maxLat + minLat) / 2;
    this.lng = (maxLon + minLon) / 2;
    if (this.color) {
      this.styles = [
        {
          featureType: 'all',
          elementType: 'all',
          stylers: [{ hue: this.color }]
        },
        {
          featureType: 'water',
          elementType: 'all',
          stylers: [{ hue: this.color }, { saturation: 0 }, { lightness: 50 }]
        },
        {
          featureType: 'poi',
          elementType: 'all',
          stylers: [{ visibility: 'off' }]
        }
      ];
    }
    this.loading = false;
  }
}
