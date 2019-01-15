import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {WebAngularDataStore} from "@webdjangular/core/services";
import {FormModel} from "./models/Form.model"
import {JsonApiQueryData} from "angular2-jsonapi";
import {PageModel} from "@webdjangular/core/cms-models";


@Component({
  selector: 'wda-forms',
  styleUrls: [],
  templateUrl: './forms.component.html'
})

export class FormsComponent implements OnInit {

  @Input() slug: string;

  form: FormModel;

  private prePopulateData: object = {};


  constructor(private http: HttpClient,
              private datastore: WebAngularDataStore,) {

  }

  ngOnInit() {
    this.getForm().then(form => {
      this.form = form;
      this.form.content = JSON.parse(form.content);
    })
  }

  public getForm(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(FormModel, {slug: this.slug}).subscribe(
        (response: JsonApiQueryData<FormModel>) => {
          let forms = response.getModels();
          resolve(forms[0]);
        },
        (error: any) => {
          reject(error);
        }
      )
    });
  }


}
