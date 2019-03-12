import { Component, Input, OnInit } from '@angular/core';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CityModel } from "@plugins/provider/src/lib/data";
import { HttpHeaders } from "@angular/common/http";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";


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

  public formCoverage: FormGroup;
  public formSubmited: boolean = false;
  public coverageLoaded: boolean = false;
  public hasCoverage: boolean = false;


  constructor(private datastore: WebAngularDataStore,
    private formBuilder: FormBuilder,
    public modalService: NgbModal) {

    this.formCoverage = this.formBuilder.group({
      postal_code: ['', [Validators.required, Validators.minLength(8)]],
      address_number: ['', [Validators.required]]
    });

  }

  ngOnInit() {
    //// TODO: Make Recursive The find
    //this.datastore.findAll(CityModel,{page:{size:100},order:'name',field:'name'}).subscribe((query)=>{
    //  this.cities = query.getModels();
    //  this.loading = false;
    //})
  }

  onSubmit() {
    if (this.formCoverage.valid) {
      this.formSubmited = true;
      this.coverageLoaded = false;
      this.findCoverage().then(
        (city: CityModel) => {
          this.coverageLoaded = true;
          this.hasCoverage = true;
        },
        (error) => {
          this.coverageLoaded = true;
          this.hasCoverage = false;

        }
      ).catch((error: any) => {
        this.coverageLoaded = true;
        this.hasCoverage = false;
      });

    }
  }

  findCoverage(): Promise<CityModel> {
    return new Promise((resolve, reject) => {
      const postalCode = this.formCoverage.get('postal_code').value;

      if (postalCode.length >= 8) {
        const url = `/api/provider/city/${postalCode}/postal_code/`;
        this.datastore.findRecord(
          CityModel,
          null,
          null,
          new HttpHeaders({ 'Authorization': 'none' }),
          url
        ).subscribe((city: CityModel) => {
          resolve(city);
        }, (error) => {
          reject(error);
        })
      }
    });
  }



}
