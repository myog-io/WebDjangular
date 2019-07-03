import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-adult-content',
  templateUrl: './adult-content.component.html',
  styleUrls: ['./adult-content.component.scss']
})
export class ThemeIspwebbyModalAdultContentComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
