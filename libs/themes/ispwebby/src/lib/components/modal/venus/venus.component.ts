import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-venus',
  templateUrl: './venus.component.html',
  styleUrls: ['./venus.component.scss', '../styles/tv-channels.scss']
})
export class ThemeIspwebbyModalVenusComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
