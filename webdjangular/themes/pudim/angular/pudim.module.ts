import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../webangular/app/@theme/theme.module';
import {PudimComponent} from './pudim.component';
import {PudimRoutingModule} from "./pudim-routing.module";

import {FooterComponent, HeaderComponent} from "./components";

import {
    TestTypographyComponent, TestTablesComponent, TestAlertsComponent, TestBadgesComponent, TestBreadcrumbComponent, TestButtonsComponent,
    TestCardsComponent, TestCollapseComponent, TestFormComponent, TestJumbotronComponent, TestListsComponent, TestModalComponent,
    TestNavsComponent, TestPaginationComponent
} from "./test";



const COMPONENTS = [
    PudimComponent,
    HeaderComponent,
    FooterComponent,

    TestTypographyComponent,
    TestTablesComponent,
    TestAlertsComponent,
    TestBadgesComponent,
    TestBreadcrumbComponent,
    TestButtonsComponent,
    TestCardsComponent,
    TestCollapseComponent,
    TestFormComponent,
    TestJumbotronComponent,
    TestListsComponent,
    TestModalComponent,
    TestNavsComponent,
    TestPaginationComponent

];

@NgModule({
    imports: [
        PudimRoutingModule,
        ThemeModule,
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
