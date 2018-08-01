import "reflect-metadata";
import {NgModule} from '@angular/core';
import {ThemeModule} from '../../../webangular/app/@theme/theme.module';
import {PudimComponent} from './pudim.component';
import {PudimRoutingModule} from "./pudim-routing.module";
import {JsonApiModule} from "angular2-jsonapi";


import {
    FooterComponent, HeaderComponent, PricingComponent
} from "./components";

import {
    BlogListingLayoutA1Component
} from "./blog/listing/layout-a1/layout-a1.component";
import {BlogListingLayoutB1Component} from "./blog/listing/layout-b1/layout-b1.component";
import {BlogPostDefaultComponent} from "./blog/post/default/default.component";


import {
    TestTypographyComponent, TestTablesComponent, TestAlertsComponent, TestBadgesComponent, TestBreadcrumbComponent, TestButtonsComponent,
    TestCardsComponent, TestCollapseComponent, TestFormComponent, TestJumbotronComponent, TestListsComponent, TestModalComponent,
    TestNavsComponent, TestPaginationComponent
} from "./test";

import { BlogLayoutRightSidebarComponent } from './blog/layouts/right-sidebar/right-sidebar.component';
import { BlogLayoutLeftSidebarComponent } from './blog/layouts/left-sidebar/left-sidebar.component';
import { BlogLayoutFullContentComponent } from './blog/layouts/full-content/full-content.component';





const COMPONENTS = [
    PudimComponent,
    HeaderComponent,
    FooterComponent,
    PricingComponent,

    BlogLayoutRightSidebarComponent,
    BlogLayoutLeftSidebarComponent,
    BlogLayoutFullContentComponent,

    BlogListingLayoutA1Component,
    BlogListingLayoutB1Component,
    BlogPostDefaultComponent,

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
        JsonApiModule
    ],
    exports: [
        ...COMPONENTS,
    ],
    declarations: [
        ...COMPONENTS
    ],
})
export class PudimModule {
}




