import { Injectable } from "@angular/core";
import { LazyMapsAPILoaderConfigLiteral } from "@agm/core";
import { WDAConfig } from "@core/services/src/lib/wda-config.service";

@Injectable()
export class GoogleMapsLazyConfig implements LazyMapsAPILoaderConfigLiteral {
  public apiKey: string;
  public language = 'pt'; // https://developers.google.com/maps/faq#languagesupport
  constructor(private wdaConfig: WDAConfig) {
    this.wdaConfig.getCoreConfig('cms_core').then((data) => {
      if (data.hasOwnProperty('google_maps_api_key')) {
        this.apiKey = data.google_maps_api_key;
      }
    })
  }
}
