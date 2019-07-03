import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-combate',
  templateUrl: './combate.component.html',
  styleUrls: ['./combate.component.scss', '../styles/tv-channels.scss']
})
export class ThemeIspwebbyModalCombateComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
