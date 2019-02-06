import { Validators, FormBuilder } from "@angular/forms";
import { OnDestroy, OnInit, Component, ChangeDetectorRef } from "@angular/core";
import { Subscription } from "rxjs";
import { NbToastrService } from "@nebular/theme";
import { JsonApiQueryData } from "angular2-jsonapi";
import { WebAngularDataStore } from "@core/services/src/lib/WebAngularDataStore.service";
import { AbstractModel } from "@core/data/src/lib/models";
import { MediaModel } from "@core/media/src/lib/models/Media.model";

@Component({
  selector: 'wda-import-json',
  styleUrls: ['./import.component.scss'],
  templateUrl: 'import.component.html'
})
export class AdminImportComponent implements OnInit, OnDestroy {

  formGroup = this.fb.group({
    file: [null, Validators.required],
  });
  public options = [];
  private models = [];
  public loading = true;
  public loading_percentage = 0;
  public loading_text: string = null;
  public data = [];
  public subscription: Subscription;
  public uploadedFiles = {};
  public demo_object = [
    [
      "Page",
      {
        "title": "Home",
        "slug": "home",
        "content": "<h1>Hello World!</h1>",
        "header.slug": "header",
        "footer.slug": "footer"
      }
    ],
  ];
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private datastore: WebAngularDataStore,
    private toaster: NbToastrService,
  ) { }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsText(file);
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
        
        try {
          this.data = JSON.parse(reader.result as string);
          
        } catch (error) {
          this.toaster.danger(`Error Invalid File, Details: ${error}`, `Error!`, { duration: 5000 });
        }
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();

      };
    }
  }
  onSubmit(event) {
    this.loadRecursive();
    //this.toaster.success(`Changes have been saved`, `Success!`);
  }
  onChange(event) {
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
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getDataRelationship(model, data): Promise<AbstractModel> {
    let promises: Promise<boolean>[] = [];

    const entry = this.datastore.createRecord(model) as AbstractModel;

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (key === 'id') continue;
        if (key.search(/\./) >= 0) {
          // Let's check if theres a . in the middle to run Link or Download FUnctions
          let keys = key.split(/\./);
          if (keys[0] && keys[1]) {
            if (keys[1] === 'download') {
              // Let's Download the File
              let promise: Promise<boolean> = new Promise((resolve, reject) => {
                if (this.uploadedFiles.hasOwnProperty(data[key])) {
                  entry[keys[0]] = this.uploadedFiles[data[key]]
                  resolve(true);

                } else {
                  let newMedia = this.datastore.
                  createRecord(MediaModel, { file: data[key] });
                  newMedia.save().subscribe((media: any) => {
                    entry[keys[0]] = media.safeFileUrl;
                    this.uploadedFiles[data[key]] = media.safeFileUrl;
                    resolve(true);
                  },
                  (error:any)=>{
                    resolve(true);
                  });
                }

              })
              promises.push(promise);
            } else if (entry.extraOptions[keys[0]].model) {
              const relationshipModel = entry.extraOptions[keys[0]].model;
              let belongsTo = null;
              if(entry.belongsTo){
                belongsTo = entry.belongsTo.find((en: any) => en.propertyName == keys[0]);
              }
              if (belongsTo) {
                let options = {
                  page: { size: 1, number: 1 },
                }
                options[keys[1]] = data[key];
                let promise: Promise<boolean> = new Promise((resolve, reject) => {
                  this.datastore.findAll(relationshipModel, options).subscribe(
                    (response: JsonApiQueryData<any>) => {
                      let entries = response.getModels();
                      if (entries[0]) {
                        if (entries[0][keys[1]] === data[key]) {
                          entry[keys[0]] = entries[0]
                          resolve(true);
                        } else {
                          reject("Not found the Correct Relationship");
                        }

                      }
                    },
                    (error: any) => {
                      reject(error);
                    }
                  );
                })
                promises.push(promise);
                continue;
              }
              let hasMany = null;
              if(entry.hasMany){
                hasMany = entry.hasMany.find((en: any) => en.propertyName == keys[0]);
              }
              if (hasMany && data[key].length) {
                let options = {
                  page: { size: data[key].length, number: 1 },
                }
                options[`${keys[1]}__in`] = data[key].join(",")
                let promise: Promise<boolean> = new Promise((resolve, reject) => {
                  this.datastore.findAll(relationshipModel, options).subscribe(
                    (response: JsonApiQueryData<any>) => {
                      let entries = response.getModels();
                      if (entries.length > 0) {
                        entry[keys[0]] = entries;
                      }
                      resolve(true);
                    },
                    (error: any) => {
                      reject(error);
                    }
                  );
                });
                promises.push(promise);
              }
            }
          }
        } else {
          if (data[key] instanceof Array) {
            if (data[key].length > 0) {
              entry[key] = data[key];
            } else {
              entry[key] = new Array();
            }
          } else {
            entry[key] = data[key];
          }
        }
      }
    }
    return Promise.all(promises)
      .then((results: boolean[]) => {
        return entry;
      })
  }
  private saveRecord(entry:AbstractModel,options:object,index:number) {
    this.subscription = entry.save(options).subscribe(
      (model) => {
        if (index >= this.data.length) {
          this.loading = false;
          this.toaster.success(`All Record Saved with Success`, `Success!`);
        } else {
          index++;
          this.loadRecursive(index);
        }
      },
      (error) => {
        this.loading = false;
        if (error.errors && error.errors.length > 0) {
          for (let i = 0; i < error.errors.length; i++) {
            // TODO: Check pointer to see if is for an specific field and set an error inside the field
            const err = error.errors[i];
            if(err.status == 404){
              entry.id = null;
              this.saveRecord(entry,options,index);
              return;
            }else{
              this.toaster.danger(`Error saving the Changes, Details: ${err.detail}`, `Error!`, { duration: 5000 });
            }

          }
          /* CONTINUE */
          if (index >= this.data.length) {
            this.loading = false;
            this.toaster.success(`All Record Saved with Success`, `Success!`);
          } else {
            index++;
            this.loadRecursive(index);
          }
        } else {
          this.toaster.danger(`Error saving the Changes`, `Error!`);
        }
      });
  }

  private loadRecursive(index = 1) {
    this.loading_percentage = (index * 100) / this.data.length;
    this.loading_text = `${index}/${this.data.length}`;
    this.loading = true;
    const model_name = this.data[index - 1][0];
    const data = this.data[index - 1][1];
    if (model_name in this.models) {
      const model = this.models[model_name];
      this.getDataRelationship(model, data).then((entry) => {
        let options = {}
        if (model.include) {
          options['include'] = model.include;
        }
        this.saveRecord(entry,options,index);
      });
    } else {
      this.toaster.danger(`Model ${model_name} not found in the available models`, `Error!`);

      if (index < this.data.length) {
        index++;
        this.loadRecursive(index);
      }
    }
    return;

  }

}
