import { Component, Input, OnInit } from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';

@Component({
  selector: 'plugin-provider-coverage',
  templateUrl: 'city-coverage.component.html',
})
export class PluginProviderCityCoverageComponent implements OnInit {

  @Input() title: string = 'CIDADES ATENDIDAS';
  @Input() titleColor: string = null;
  @Input() background: string = '';
  @Input() session_id: string = 'banner-cobertura';
  //private cities = []
  public loading = false;
  constructor(private datastore: WebAngularDataStore) {
  }

  ngOnInit() {
    //// TODO: Make Recursive The find
    //this.datastore.findAll(CityModel,{page:{size:100},order:'name',field:'name'}).subscribe((query)=>{
    //  this.cities = query.getModels();
    //  this.loading = false;
    //})
  }

}
