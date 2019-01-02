import { Component, Input, OnInit } from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { CityModel } from '../../data/models/City.model';

@Component({
  selector: 'plugin-provider-plans-list',
  template: `
  <section [id]="title_id">
    <div class="container">
        <div class="col-md-12">
            <h3 class="pt-4 pb-3 mb-0 text-center text-uppercase" [style.color]="titleColor" [style.background]="background">{{title}}</h3>
            <ul *ngIf="cities.length > 0">
                <li class="pb-3" *ngFor="let city of cities;">
                  <i class="icon text-primary fas fa-map-marker-alt"></i> {{city.name}}
                </li>
            </ul>
        </div>
    </div>
</section>
<ng-template #loading_holder>
  <div class="col-12 text-center">
    <i class="fas fa-spinner fa-spin fa-5x"></i>
  </div>
</ng-template>

  `,
})
export class PluginProviderCityListComponent implements OnInit {

  @Input() title: string = 'CIDADES ATENDIDAS';
  @Input() titleColor: string = null;
  @Input() background: string = null;
  @Input() title_id: string = 'cidades-atendidas';
  private cities = []
  public loading = true;
  constructor(private datastore: WebAngularDataStore) {
  }

  ngOnInit() {
    // TODO: Make Recursive The find
    this.datastore.findAll(CityModel,{page:{size:100},order:'name',field:'name'}).subscribe((query)=>{
      this.cities = query.getModels();
      this.loading = false;
    })
  }

}
