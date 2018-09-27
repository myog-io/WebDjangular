import {NgModule} from '@angular/core';
import {ThemeModule} from '../../webangular/app/@theme/theme.module';
import {PudimComponent} from './pudim.component';
import {PudimRoutingModule} from "./pudim-routing.module";

import {FooterComponent, HeaderComponent} from "./components";

import { DynamicComponentLoaderModule } from '../../webangular/app/dynamic-component-loader/dynamic-component-loader.module';



const COMPONENTS = [
    PudimComponent,
    HeaderComponent,
    FooterComponent,

];

@NgModule({
    imports: [
        PudimRoutingModule,
        ThemeModule,
        DynamicComponentLoaderModule.forChild(PudimComponent)
    ],
    exports: [
        ...COMPONENTS,
    ],
    declarations: [
        ...COMPONENTS,
    ],
})
export class PudimModule {
}
