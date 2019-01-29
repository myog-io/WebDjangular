import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input() type: string = 'boxed';
  @Input() layout_slug: string;

  constructor() {

  }

  ngOnInit() {
  }

}
