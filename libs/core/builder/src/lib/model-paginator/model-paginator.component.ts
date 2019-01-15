import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { ModelPaginatorControls } from './model-paginator.controls';

@Component({
  selector: 'wda-model-paginator',
  styleUrls: ['./model-paginator.component.scss'],
  templateUrl: './model-paginator.component.html',
})
export class ModelPaginatorComponent implements OnChanges, OnInit {
  @Input() options = {};
  @Input() alignNumbersTo: string = "justify-content-center";

  @Output() controls = new EventEmitter<ModelPaginatorControls>();

  paginatorControls = new ModelPaginatorControls();

  ngOnInit(): void {
    this.startPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {

    if (typeof changes['options'] !== 'undefined') {
      if (typeof changes['options'].currentValue !== 'undefined') {
        this.options = changes['options'].currentValue;
      }
    }
  }

  private startPaginator(){
    this.paginatorControls.initControls(this.options);
    this.controls.emit(this.paginatorControls);
  }
}
