import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'plugin-provider-dialog',
    template: `
  <div class="modal-header">
    <h5 class="modal-title" id="modal-title" [innerHtml]="title"></h5>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body" [innerHtml]="body">
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class PluginProviderDialogComponent implements OnInit {
    public title:string = "Ops!";
    public body:string = "Body <b>message</b>"

    constructor(public modal: NgbActiveModal) { 
    }

    ngOnInit() {
    }


}
