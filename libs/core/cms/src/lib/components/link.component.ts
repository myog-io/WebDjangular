import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'cms-link',
  template: `
    <a (click)="navigate($event)" [routerLinkActive]="routerLinkActive" href="{{link}}" >
    <ng-content></ng-content>
    </a>`,
})
export class CoreCmsLinkComponent{
  @Input() link: string;
  @Input() routerLinkActive = "active"
  @Input() target = '_self';
  @Input() alt: string;
  constructor(private router: Router) {

  }
  
  navigate($event) {
    $event.preventDefault();
    this.router.navigateByUrl(this.link);
  }

}