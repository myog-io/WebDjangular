import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JsonApiQueryData} from "angular2-jsonapi";
import {HttpClient} from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { CityModel } from '@plugins/provider/src/lib/data';


@Component({
  selector: 'webdjangular-choosecity',
  templateUrl: './choosecity.component.html',
  styleUrls: ['./choosecity.component.scss']
})
export class ThemeProviderfyModalChoosecityComponent {

  form: FormGroup;
  cities: any;
  loading = true;
  placeholder = "Onde você está?"

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private datastore: WebAngularDataStore,
              private formBuilder: FormBuilder, private clientUserService: ClientUserService ) {

    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    });

    this.getCities().then(data => {
      this.cities = data;
    });

  }

  getCities(): Promise<any> {
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
    if (typeof window !== 'undefined') {
      window.location.reload(); // Error window on server need to do a IF?
    }
  }

}
