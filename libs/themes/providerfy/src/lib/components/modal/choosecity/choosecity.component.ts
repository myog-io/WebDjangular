import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';

import {CityModel} from "@webdjangular/plugins/provider-data";
import {JsonApiQueryData} from "angular2-jsonapi";
import {HttpClient} from "@angular/common/http";
import {WebAngularDataStore} from "@webdjangular/core/services";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ClientUserService} from "@webdjangular/core/services";

@Component({
  selector: 'webdjangular-choosecity',
  templateUrl: './choosecity.component.html',
  styleUrls: ['./choosecity.component.scss']
})
export class ThemeProviderfyModalChoosecityComponent {

  private form: FormGroup;
  private cities: any;
  public loading = true;
  public placeholder = "Onde você está?"

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private datastore: WebAngularDataStore,
              private formBuilder: FormBuilder, private clientUserService: ClientUserService ) {

    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    });

    this.getCities().then(data => {
      this.cities = data;
    });

  }

  public getCities(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(CityModel, {ordering:'name',page:{size:100}}).subscribe(
        (response: JsonApiQueryData<CityModel>) => {
          let cities = response.getModels();
          resolve(cities);
          this.loading = false;
        },
        (error: any) => {
          reject(error);
        }
      )
    });
  }
  selectChange($event){
    if($event){
      this.placeholder = '';
    }
  }
  onSubmit() {
    //this.activeModal.close();

    const cityModel = this.cities.find(city=>city.id===this.form.get('city').value);
    this.clientUserService.clientUser.data['city'] = {
      id: cityModel.id,
      name: cityModel.name
    };
    this.clientUserService.updateCookie();
    // TODO: remake it with a better way
    window.location.reload();
  }

}
