import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ResellerModel } from '../../../data';
import { ErrorResponse, JsonApiQueryData, JsonApiModel } from 'angular2-jsonapi';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'plugin-provider-admin-import-reseller',
    templateUrl: './import-reseller.component.html',
    styleUrls: ['./import-reseller.component.scss']
})
export class PluginProviderAdminImportResellerComponent implements OnInit, OnDestroy {
    public formGroup = this.fb.group({
        file: [null, Validators.required]
    });
    public options = [];
    private models = [];
    public loading = true;
    public loading_percentage = 0;
    public loading_text: string = null;
    public data = [];
    public subscription: Subscription;
    public uploadedFiles = {};
    
    constructor(
        private fb: FormBuilder,
        private cd: ChangeDetectorRef,
        private datastore: WebAngularDataStore,
        private toaster: NbToastrService
    ) { }
    ngOnInit() {

    }
    onFileChange(event) {
        const reader = new FileReader();
        this.loading = true;
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsText(file);
            reader.onload = () => {
                let data:string = reader.result as string;
                this.formGroup.patchValue({
                    file: data
                });

                var rows = data.split('\n');
                let i = 0;

                for (let i = 0; i < rows.length; i++) {
                    const row = rows[i];
                    if(i == 0) continue;

                    let col = row.split(',');
                    if(col[0] && col[1]) {
                        this.data.push({
                            'name': col[0],
                            'taxvat': col[1].replace(/\D/g,''),
                            'email': col[2] ? col[2] : null,
                            'active': col[3] ? Boolean(col[3]) : true,
                            'is_employee': col[4] ? Boolean(col[4]) : false
                        });
                    }
                }
                
                // try {
                    
                //     //console.log(reader.result)
                //     //this.data = JSON.parse(reader.result as string);
                // } catch (error) {
                //     this.toaster.danger(
                //         `Error Invalid File, Details: ${error}`,
                //         `Error!`,
                //         { duration: 5000 }
                //     );
                // }
                // need to run CD since file load runs outside of zone
                this.cd.markForCheck();
                
            };
            
        }
        this.loading = false;
    }
    onSubmit(event) {
        this.loading = true;
        this.loadRecursive();
    }
    private loadRecursive(index = 1) {
        this.loading_percentage = (index * 100) / this.data.length;
        this.loading_text = `${index}/${this.data.length}`;
        this.loading = true;
       
        //this.toaster.danger(
        //    `Model ${model_name} not found in the available models`,
        //    `Error!`
        //);
        const data = this.data[index-1];
        let taxvat = data['taxvat'];
        this.datastore.findRecord(ResellerModel, taxvat, null, null, `/api/v1/provider/reseller/${taxvat}/by_taxvat/` ).subscribe(
            (reseller: ResellerModel) => {
                //
                reseller.name = data['name'];
                reseller.taxvat = data['taxvat'];
                reseller.email = data['email'];
                reseller.active = data['active'];
                reseller.is_employee = data['is_employee'];

                if(reseller.hasDirtyAttributes){ 
                    reseller.save().subscribe(
                        (reseller: ResellerModel) => {
                            
                        },
                        (error: ErrorResponse) => {
                            
                            this.toaster.danger(
                                `Erro ao atualizar o revendedor com o CPF/CNPJ ${taxvat}` ,
                                `Error!`
                            );
                        }, 
                        () => {
                            this.loadNextRecursive(index);
                        }
                    );
                } else {
                    this.loadNextRecursive(index);
                }

                
            },
            (errorResponse: any) => {
                for (let j = 0; j < errorResponse['errors'].length; j++) {
                    const error = errorResponse['errors'][j];
                    if(error['status'] == "404") {
                        
                        this.datastore.createRecord(ResellerModel, data).save().subscribe(
                            (reseller: ResellerModel) => {
                                
                            },
                            (error: ErrorResponse) => {
                                this.toaster.danger(
                                    `Erro ao criar o revendedor com o CPF/CNPJ ${taxvat}` ,
                                    `Error!`
                                );
                            }, 
                            () => {
                                this.loadNextRecursive(index);
                            }
                        )

                    }
                }
            }
        );

        
    
    }

    private loadNextRecursive(index) {
        if (index < this.data.length) {
            index++;
            this.loadRecursive(index);
        } else {
            this.loading = false;
            
            this.toaster.success(
                `Importação completa com sucesso!` ,
                `Success!`
            );

        }
    }

    private saveRecord(entry: ResellerModel, options: object, index: number) {
    
    }
    onChange(event) { }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}