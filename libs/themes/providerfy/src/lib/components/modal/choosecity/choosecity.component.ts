import { Component, HostListener, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { ClientUserService } from '@core/services/src/lib/client-user.service';
import { CityModel } from '@plugins/provider/src/lib/data';
import { Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'webdjangular-choosecity',
  templateUrl: './choosecity.component.html',
  styleUrls: ['./choosecity.component.scss'],
})
export class ThemeProviderfyModalChoosecityComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    city: new FormControl("", [Validators.required])
  });
  cities: CityModel[];
  loading = true;
  sub: Subscription;
  cookieSub: Subscription;

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private datastore: WebAngularDataStore,
    private clientUserService: ClientUserService,
    private location: Location,
  ) {

  }
  ngOnInit() {

    this.cookieSub = this.clientUserService.clientCookieChange.subscribe((data) => {
      // Closing the Modal,because cookie has already being set
      this.activeModal.close();
    })

  }
  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
      this.sub = null;
    }
  }
  ngAfterViewInit() {
    this.getCities();
    if (this.clientUserService.clientUser.data.hasOwnProperty('city')) {
      this.form.get('city').setValue(this.clientUserService.clientUser.data['city'].id);
    }
  }
  getCities(): void {
    this.sub = this.datastore
      .findAll(CityModel, {
        ordering: 'name',
        fields: 'id,name,redirect_url',
        page: { size: 100 }
      }).subscribe((query) => {
        this.loading = false;
        this.cities = query.getModels();
      });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let elmnt = document.getElementById('chooseCitySubmit');
    elmnt.scrollIntoView();
  }

  onFocus() {
    //document.getElementById("chooseCitySubmit").focus({preventScroll:false});
  }

  onSubmit() {

    const city_id = this.form.get('city').value;
    const cityModel = this.cities.find(city => city.id === city_id);
    if (cityModel.redirect_url) {
      window.open(cityModel.redirect_url, '_self');
    } else {
      this.clientUserService.clientUser.data['city'] = {
        id: cityModel.id,
        name: cityModel.name
      };
      this.clientUserService.updateCookie();
      this.activeModal.close();
    }
  }
}
