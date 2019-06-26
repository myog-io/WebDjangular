import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ResellerModel } from '../../../data';

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

        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsText(file);
            reader.onload = () => {
                this.formGroup.patchValue({
                    file: reader.result
                });

                try {
                    console.log(reader.result)
                    this.data = JSON.parse(reader.result as string);
                } catch (error) {
                    this.toaster.danger(
                        `Error Invalid File, Details: ${error}`,
                        `Error!`,
                        { duration: 5000 }
                    );
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
    private loadRecursive(index = 1) {
        this.loading_percentage = (index * 100) / this.data.length;
        this.loading_text = `${index}/${this.data.length}`;
        this.loading = true;
       
        //this.toaster.danger(
        //    `Model ${model_name} not found in the available models`,
        //    `Error!`
        //);

        if (index < this.data.length) {
            index++;
            this.loadRecursive(index);
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