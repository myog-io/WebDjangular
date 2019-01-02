import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { WebAngularDataStore } from "@webdjangular/core/services";
import { NbToastrService } from "@nebular/theme";
import { JsonApiQueryData } from "angular2-jsonapi";
import { AbstractModel } from "@webdjangular/core/data-models";

@Component({
  selector: 'wda-export-json',
  styleUrls: ['./export.component.scss'],
  templateUrl: 'export.component.html'
})
export class AdminExportComponent implements OnInit, OnDestroy {

  formGroup = this.fb.group({
    model: [null, Validators.required],
  });

  public loading = true;
  public loading_infos = [];
  private models = [];
  public options = [];
  public promises: Promise<any>[] = [];
  constructor(
    private fb: FormBuilder,
    private datastore: WebAngularDataStore,
    private toaster: NbToastrService,
  ) { }
  ngOnDestroy() {

  }
  ngOnInit() {
    this.models = Reflect.getMetadata('JsonApiDatastoreConfig', this.datastore.constructor).models;
    for (const key in this.models) {
      if (this.models.hasOwnProperty(key)) {
        this.options.push({ 'value': key, 'label': key });

      }
    }
    this.loading = false;

  }
  onSubmit() {
    this.promises = [];
    this.loading_infos = [];
    if (this.formGroup.get('model').value) {
      const models = this.formGroup.get('model').value;
      const data = new Array();
      this.loading = true

      for (let i = 0; i < models.length; i++) {
        const model_name = models[i];
        // TODO: Check Model Dependcy First to get data in the correct order
        if (this.models[model_name]) {
          this.loading_infos.push({
            value: 0,
            text: `${model_name}`
          });
          this.promises.push(
            this.loadDataRecursivly(model_name, i)
          )
          Promise.all(this.promises)
            .then((results: any[]) => {
              if (results.length == models.length) {
                let new_data = [];
                for (let k = 0; k < results.length; k++) {
                  new_data = new_data.concat(results[k]);

                }
                this.loading = false;
                this.saveTextAsFile(JSON.stringify(new_data, null, 2), `${models.join('-')}.json`);
              }
            })
        }
      }
    }
  }
  saveTextAsFile(data, filename) {

    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    const blob = new Blob([data], { type: 'text/json' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')
    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      const e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      e.initEvent('click', true, false);
      a.dispatchEvent(e);
    }
  }

  loadDataRecursivly(model_name: string, index: number, page = 1): Promise<any> {
    // this.loading_percentage = (i * 100) / models.length;
    const model = this.models[model_name];
    return new Promise((resolve, reject) => {
      this.datastore.findAll(model,
        {
          page: { size: 50, number: page },
          include: model.include
        }).subscribe((data: JsonApiQueryData<any>) => {
          this.loading_infos[index].value = (page * 100) / data.getMeta().meta.pagination.pages;
          const array_data = [];
          const models = data.getModels();
          for (let i = 0; i < models.length; i++) {
            const element: AbstractModel = models[i];

            array_data.push([model_name, this.toObject(element)]);
          }

          if (page < data.getMeta().meta.pagination.pages) {
            page++;

            this.loadDataRecursivly(model_name, index, page).then((data_array) => {
              for (let j = 0; j < array_data.length; j++) {
                const element = array_data[j];
                data_array.push(element)
              }
              resolve(data_array)
            })
          } else {
            resolve(array_data)
          }

        })
    })
  }

  private toObject(entity: AbstractModel): any {
    const attributes = entity.getAttributeMetada();
    const data = {};
    for (const key in attributes) {
      if (attributes.hasOwnProperty(key)) {
        data[key] = entity[key];
      }
    }

    const hasMany = entity.hasMany;
    if (hasMany) {
      for (let i = 0; i < hasMany.length; i++) {
        const key = hasMany[i].propertyName;
        if (entity.hasOwnProperty(key)) {
          for (let j = 0; j < entity[key].length; j++) {
            if (entity[key][j].code) {
              data[`${key}.code`][j] = entity[key][j].code;
            } else if (entity[key].sku) {
              data[`${key}.sku`][j] = entity[key][j].sku;
            } else if (entity[key].slug) {
              data[`${key}.slug`][j] = entity[key][j].slug;
            } else if (entity[key].id) {
              data[`${key}.id`][j] = entity[key][j].id;
            }
          }
        }
      }
    }


    const belongsTo = entity.belongsTo;
    if (belongsTo) {
      for (let i = 0; i < belongsTo.length; i++) {
        const key = belongsTo[i].propertyName;
        if (entity.hasOwnProperty(key)) {
          if (entity[key]['code']) {
            data[`${key}.code`] = entity[key].code;
          } else if (entity[key]['slug']) {
            data[`${key}.slug`] = entity[key].slug;
          } else if (entity[key]['id']) {
            data[`${key}.id`] = entity[key].id;
          }
        }
      }
    }

    return data;
  }
}
