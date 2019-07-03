import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-premiere',
  templateUrl: './premiere.component.html',
  styleUrls: ['./premiere.component.scss', '../styles/tv-channels.scss']
})
export class ThemeIspwebbyModalPremiereComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
