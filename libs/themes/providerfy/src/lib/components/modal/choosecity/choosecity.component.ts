import {Component, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {JsonApiQueryData} from "angular2-jsonapi";
import {HttpClient} from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { CityModel } from '@plugins/provider/src/lib/data';
import { Observable } from 'rxjs';


@Component({
  selector: 'webdjangular-choosecity',
  templateUrl: './choosecity.component.html',
  styleUrls: ['./choosecity.component.scss']
})
export class ThemeProviderfyModalChoosecityComponent {

  form: FormGroup;
  city_list: CityModel[];
  cities: Observable<CityModel[]>;
  loading = true;
  placeholder = "Onde você está?"

  constructor(public activeModal: NgbActiveModal, private http: HttpClient, private datastore: WebAngularDataStore,
              private formBuilder: FormBuilder, private clientUserService: ClientUserService ) {

    this.form = this.formBuilder.group({
      city: ['', Validators.required]
    });

    this.getCities();

  }

  getCities(): void {
  
    this.cities = this.datastore.findAll(CityModel, {ordering:'name',fields:"id,name",page:{size:100}}).map(
      (query, index) => {
        this.loading = false;
        this.city_list = query.getModels();
        return this.city_list;
      }
    )
  }

  selectChange($event){
    if($event){
      this.placeholder = '';
    }
  }

  onSubmit() {
    //this.activeModal.close();
    const city_id = this.form.get('city').value;
    const cityModel = this.city_list.find(city=>city.id===city_id);
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
