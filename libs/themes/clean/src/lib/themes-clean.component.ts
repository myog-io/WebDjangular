import { Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, Compiler, Injector, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { ViewEncapsulation } from "@angular/core";
import { CoreDynamicComponentLoader } from '@webdjangular/core/dynamic-component-loader';
//import { PluginsModule } from '../../plugins/plugins.module';


@Component({
  selector: 'webdjangular-pudim',
  styleUrls: [
    './themes-clean.component.scss'
  ],
  templateUrl: './themes-clean.component.html'
})

export class ThemesCleanComponent implements OnInit, OnDestroy {
  public data: any;

  @ViewChild('container', { read: ViewContainerRef })
  container: ViewContainerRef;
  //private module;
  private componentRef: ComponentRef<{}>;

  constructor(private router: Router,
    private componentLoader: CoreDynamicComponentLoader,
    private compiler: Compiler,
    private injector: Injector) {
    //this.module = this.compiler.compileModuleAndAllComponentsSync(PluginsModule);
  }

  ngOnInit() {

    console.log(this.data.slug, this.data.content)
    const metadata = {
      selector: 'wda-' + this.data.slug,
      template: this.data.content
    };

    const factory = this.componentLoader.createComponentFactorySync(metadata, null, this.compiler);

    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }

    console.log("FACTORY", factory)
    this.container.clear();
    this.componentRef = this.container.createComponent(factory, 0, this.injector);

  }
  ngOnDestroy() {
    console.log("Destroyig");
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

}

