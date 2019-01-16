import { Component, Input, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CityModel } from '../../data/models/City.model';
import { Subscription } from 'rxjs';
import { AgmMap, MapTypeStyle } from '@agm/core';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';

@Component({
  selector: 'plugin-provider-plans-list',
  styleUrls: ['city-list.component.scss'],
  templateUrl: 'city-list.component.html',
})
export class PluginProviderCityListComponent implements OnInit, OnDestroy {

  @Input() title = 'CIDADES ATENDIDAS';
  @Input() titleColor: string = null;
  @Input() background: string = null;
  @Input() title_id = 'cidades-atendidas';
  @Input() show_map = true
  @Input() color = '#00b8bc';
  @Input() zoom = 7.5;
  public cities = []
  public loading = true;
  public sub: Subscription
  public lat: number;
  public lng: number;
  public styles: MapTypeStyle[]
  constructor(
    private datastore: WebAngularDataStore,
  ) {
    this.styles = [
      {
        featureType: "all",
        elementType: "all", stylers: [
          { hue: this.color }
        ]
      },
      {
        featureType: "water",
        elementType: "all", stylers: [
          { hue: this.color },
          { saturation: 0 }, { lightness: 50 }
        ]
      },
      {
        featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }]
      }
    ];
  }

  ngOnInit() {
    // TODO: Make Recursive The find
    this.sub = this.datastore.findAll(CityModel, { page: { size: 100 }, order: 'name', field: 'name' }).subscribe((query) => {
      this.cities = query.getModels();

      let count = 0;
      let minLat: number = 999999;
      let maxLat: number = -99999;
      let minLon: number = 99999;
      let maxLon: number = -99999;

      for (let i = 0; i < this.cities.length; i++) {
        const city = this.cities[i];
        if (city.lat && city.long) {
          count += 1;
          maxLat = Math.max(city.lat, maxLat);
          minLat = Math.min(city.lat, minLat);
          maxLon = Math.max(city.long, maxLon);
          minLon = Math.min(city.long, minLon);
        }
      }
      this.lat = (maxLat + minLat) / 2;
      this.lng = (maxLon + minLon) / 2;
      this.loading = false;
    })
  }
  ngOnDestroy() {
    this.sub.unsubscribe()
    this.sub = null;
  }

}
