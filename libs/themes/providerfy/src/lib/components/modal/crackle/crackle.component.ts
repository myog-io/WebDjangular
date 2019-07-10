import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-crackle',
  templateUrl: './crackle.component.html',
  styleUrls: ['./crackle.component.scss', '../styles/tv-channels.scss']
})
export class ThemeProviderfyModalCrackleComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
