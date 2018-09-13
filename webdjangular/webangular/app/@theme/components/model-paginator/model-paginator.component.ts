import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

import { JsonApiModel, JsonApiQueryData, JsonApiMetaModel } from 'angular2-jsonapi';
import { ModelPaginatorControls } from './model-paginator.controls';


@Component({
  selector: 'webdjangular-model-paginator',
  styleUrls: ['./model-paginator.component.scss'],
  templateUrl: './model-paginator.component.html',
})


export class ModelPaginatorComponent {
    @Input() options = {};
    @Input() alignNumbersTo: string = "justify-content-center";

    @Output() controls = new EventEmitter<ModelPaginatorControls>();

    protected paginatorControls = new ModelPaginatorControls();

    constructor() {

    }

    ngOnInit() {
        
    }

    ngOnChanges(changes: SimpleChanges){
        if (typeof changes['options'] !== 'undefined'){
            if (typeof changes['options'].currentValue !== 'undefined'){
                this.paginatorControls.initControls(changes['options'].currentValue);
                this.controls.emit(this.paginatorControls);
            }
        }
    }
}
