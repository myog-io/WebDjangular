import {Component, ViewEncapsulation} from "@angular/core";
import {CoreDynamicPageLoaderComponent} from "@webdjangular/core/dynamic-page-loader";

@Component({
  selector: 'theme-providerfy',
  styleUrls: ['./providerfy.component.scss', './styles/styles.scss'],
  templateUrl: './providerfy.component.html',
  encapsulation: ViewEncapsulation.None
})

export class ThemeProviderfyComponent extends CoreDynamicPageLoaderComponent {

}
