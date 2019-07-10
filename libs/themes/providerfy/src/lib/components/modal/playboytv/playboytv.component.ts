import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'webdjangular-playboytv',
  templateUrl: './playboytv.component.html',
  styleUrls: ['./playboytv.component.scss', '../styles/tv-channels.scss']
})
export class ThemeProviderfyModalPlayboytvComponent {
  constructor(public activeModal: NgbActiveModal) {}
}
