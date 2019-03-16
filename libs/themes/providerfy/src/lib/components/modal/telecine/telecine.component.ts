import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-telecine',
  templateUrl: './telecine.component.html',
  styleUrls: ['./telecine.component.scss', '../styles/tv-channels.scss']
})
export class ThemeProviderfyModalTelecineComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
