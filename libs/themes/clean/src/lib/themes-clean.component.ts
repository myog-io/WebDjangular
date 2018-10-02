import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, Compiler, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'webdjangular-pudim',
  styleUrls: [
    './themes-clean.component.scss'
  ],
  templateUrl: './themes-clean.component.html'
})

export class ThemesCleanComponent implements OnInit, OnDestroy {
  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  private componentRef: ComponentRef<{}>;

  constructor(
    private activeRoute: ActivatedRoute,
    private injector: Injector) {
  }

  ngOnInit() {

    this.activeRoute.data.subscribe(data => {
      console.log(data);
      if (this.componentRef) {
        this.componentRef.destroy();
        this.componentRef = null;
      }
      this.container.clear();
      this.componentRef = this.container.createComponent(data.bodyFactory, 0, this.injector)
    })

  }
  ngOnDestroy() {

  }
}

