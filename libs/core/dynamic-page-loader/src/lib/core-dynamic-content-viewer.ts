import {
  Component,
  ComponentFactoryResolver,
  Injector,
  ElementRef,
  Output,
  Input,
  EventEmitter,
  ComponentFactory,
  ComponentRef,
  ViewEncapsulation
} from '@angular/core';

import { PluginProviderPricingInternetHorizontalComponent } from '@plugins/provider/src/lib/components/plans/pricing/internet-horizontal/internet-horizontal.component';
import { PluginProviderPricingInternetComponent } from '@plugins/provider/src/lib/components/plans/pricing/internet/internet.component';
import { PluginProviderPricingTelephoneVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/telephone-vertical/telephone-vertical.component';
import { PluginProviderPricingTvVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/tv-vertical/tv-vertical.component';
import { CoreCmsGalleryComponent } from '@core/cms/src/lib/components/gallery/gallery.component';
import { CoreCmsMapsComponent } from '@core/cms/src/lib/components/maps/maps.component';
import { PluginPricingComboVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/combo-vertical/combo-vertical.component';
import { PluginProviderCheckoutComponent } from '@plugins/provider/src/lib/components/checkout/checkout.component';
import { PluginProviderCityCoverageComponent } from '@plugins/provider/src/lib/components/city-coverage/city-coverage.component';
import { PluginProviderPlansComponent } from '@plugins/provider/src/lib/components/plans/plans.component';
import { PluginProviderCityListComponent } from '@plugins/provider/src/lib/components/city-list/city-list.component';
import { PluginProviderError500Component } from '@plugins/provider/src/lib/components/errors/500/500.component';
import { PluginProviderError404Component } from '@plugins/provider/src/lib/components/errors/404/404.component';
import { ThemeProviderfyTopHeaderComponent } from '@themes/providerfy/src/lib/components/header/top-header/top-header.component';
import { ThemeProviderfyHeaderMenuComponent } from '@themes/providerfy/src/lib/components/header/menu/menu.component';
import { CoreCmsLinkComponent } from '@core/cms/src/lib/components/link.component';
import { CoreCmsFormComponent } from '@core/cms/src/lib/components/form/form.component';
import { PluginProviderGenerateLinkFormComponent } from '@plugins/provider/src/lib/components/terms/generate-link/generate-link.component';
import { PluginProviderSendEmailFormComponent } from '@plugins/provider/src/lib/components/terms/send-email/send-email.component';

export const embeddedComponents = [
  CoreCmsMapsComponent,
  CoreCmsGalleryComponent,
  CoreCmsLinkComponent,
  CoreCmsFormComponent,
  PluginProviderPricingInternetHorizontalComponent,
  PluginProviderPricingInternetComponent,
  PluginProviderPricingTelephoneVerticalComponent,
  PluginProviderPricingTvVerticalComponent,
  PluginPricingComboVerticalComponent,
  PluginProviderCheckoutComponent,
  PluginProviderCityCoverageComponent,
  PluginProviderPlansComponent,
  PluginProviderCityListComponent,
  PluginProviderError404Component,
  PluginProviderError500Component,
  PluginProviderSendEmailFormComponent,
  PluginProviderGenerateLinkFormComponent,
  ThemeProviderfyTopHeaderComponent,
  ThemeProviderfyHeaderMenuComponent
];

export class EmbeddedComponents {
  components = embeddedComponents;
}

@Component({
  selector: 'wda-content-viewer',
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class ContentViewer {
  private hostElement: HTMLElement;
  private embeddedComponentFactories: Map<
    string,
    ComponentFactory<any>
  > = new Map();
  private embeddedComponents: ComponentRef<any>[] = [];

  @Output()
  docRendered = new EventEmitter();

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    elementRef: ElementRef,
    embeddedComponents: EmbeddedComponents,
    private injector: Injector
  ) {
    this.hostElement = elementRef.nativeElement;
    embeddedComponents.components.forEach((component: any) => {
      const factory = componentFactoryResolver.resolveComponentFactory(
        component
      );
      this.embeddedComponentFactories.set(factory.selector, factory);
    });
  }

  @Input()
  set content(content) {
    this.ngOnDestroy();
    if (content) {
      this.build(content);
      this.docRendered.emit();
    }
  }

  private build(content) {
    this.hostElement.innerHTML = content || '';

    if (!content) {
      return;
    }

    this.embeddedComponentFactories.forEach((factory, selector) => {
      const embeddedComponentElements = this.hostElement.querySelectorAll(
        selector
      );
      embeddedComponentElements.forEach(element => {
        //convert NodeList into an array, since Angular dosen't like having a NodeList passed
        //for projectableNodes
        const projectableNodes = [
          Array.prototype.slice.call(element.childNodes)
        ];

        const embeddedComponent = factory.create(
          this.injector,
          projectableNodes,
          element
        );

        //apply inputs into the dynamic component
        //only static ones work here since this is the only time they're set
        for (const attr of (element as any).attributes) {
          embeddedComponent.instance[attr.nodeName] = attr.nodeValue;
        }
        this.embeddedComponents.push(embeddedComponent);
      });
    });
  }

  ngDoCheck() {
    this.embeddedComponents.forEach(comp =>
      comp.changeDetectorRef.detectChanges()
    );
  }

  ngOnDestroy() {
    // destroy these components else there will be memory leaks
    this.embeddedComponents.forEach(comp => comp.destroy());
    this.embeddedComponents.length = 0;
  }
}
