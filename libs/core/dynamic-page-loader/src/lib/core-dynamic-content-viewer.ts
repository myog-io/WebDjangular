import { Component, ComponentFactoryResolver, Injector, ElementRef, Output, Input, EventEmitter, ComponentFactory, ComponentRef, ViewEncapsulation } from '@angular/core'

import { PluginProviderPricingInternetHorizontalComponent } from '@plugins/provider/src/lib/components/plans/pricing/internet-horizontal/internet-horizontal.component';
import { PluginProviderPricingInternetVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/internet-vertical/internet-vertical.component';
import { PluginProviderPricingTelephoneVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/telephone-vertical/telephone-vertical.component';
import { PluginProviderPricingTvVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/tv-vertical/tv-vertical.component';
import { CoreCmsGalleryComponent } from '@core/cms/src/lib/components/gallery/gallery.component';
import { CoreCmsMapsComponent } from '@core/cms/src/lib/components/maps/maps.component';
import { PluginPricingComboVerticalComponent } from '@plugins/provider/src/lib/components/plans/pricing/combo-vertical/combo-vertical.component';
import { PluginProviderCheckoutComponent } from '@plugins/provider/src/lib/components/checkout/checkout.component';
import { PluginProviderCityCoverageComponent } from '@plugins/provider/src/lib/components/city-coverage/city-coverage.component';
import { PluginProviderPlansComponent } from '@plugins/provider/src/lib/components/plans/plans.component';
import { PluginProviderCityListComponent } from '@plugins/provider/src/lib/components/city-list/city-list.component';


export const embeddedComponents = [
  CoreCmsMapsComponent,
  CoreCmsGalleryComponent,
  PluginProviderPricingInternetHorizontalComponent,
  PluginProviderPricingInternetVerticalComponent,
  PluginProviderPricingTelephoneVerticalComponent,
  PluginProviderPricingTvVerticalComponent,
  PluginPricingComboVerticalComponent,
  PluginProviderCheckoutComponent,
  PluginProviderCityCoverageComponent,
  PluginProviderPlansComponent,
  PluginProviderCityListComponent
]

export class EmbeddedComponents {
  components = embeddedComponents;
}

@Component({
  selector: 'wda-content-viewer',
  template: '',
  encapsulation:  ViewEncapsulation.None
})
export class ContentViewer {
  private hostElement: HTMLElement;
  private embeddedComponentFactories: Map<string, ComponentFactory<any>> = new Map();
  private embeddedComponents: ComponentRef<any>[] = [];

  @Output()
  docRendered = new EventEmitter();

  constructor(
    componentFactoryResolver: ComponentFactoryResolver,
    elementRef: ElementRef,
    embeddedComponents: EmbeddedComponents,
    private injector: Injector,
  ) {
    this.hostElement = elementRef.nativeElement;
    embeddedComponents.components.forEach((component:any) => {
      const factory = componentFactoryResolver.resolveComponentFactory(component);
      this.embeddedComponentFactories.set(factory.selector, factory);
    })
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

    if (!content) { return; }

    this.embeddedComponentFactories.forEach((factory, selector) => {
      const embeddedComponentElements = this.hostElement.querySelectorAll(selector);
      embeddedComponentElements.forEach((element) => {
        //convert NodeList into an array, since Angular dosen't like having a NodeList passed
        //for projectableNodes
        const projectableNodes = [Array.prototype.slice.call(element.childNodes)]

        const embeddedComponent = factory.create(this.injector, projectableNodes, element)

        //apply inputs into the dynamic component
        //only static ones work here since this is the only time they're set
        for (const attr of (element as any).attributes) {
          embeddedComponent.instance[attr.nodeName] = attr.nodeValue;
        }
        this.embeddedComponents.push(embeddedComponent);
      })
    });
}

ngDoCheck() {
  this.embeddedComponents.forEach(comp => comp.changeDetectorRef.detectChanges());
}

ngOnDestroy() {
  // destroy these components else there will be memory leaks
  this.embeddedComponents.forEach(comp => comp.destroy());
  this.embeddedComponents.length = 0;
}
}
