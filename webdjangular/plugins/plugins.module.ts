import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestTypographyComponent, TestTablesComponent, TestAlertsComponent, TestBadgesComponent, TestBreadcrumbComponent, TestButtonsComponent, TestCardsComponent, TestCollapseComponent, TestFormComponent, TestJumbotronComponent, TestListsComponent, TestModalComponent, TestNavsComponent, TestPaginationComponent } from './test';


export const PLUGIN_COMPONENTS = [
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
        CommonModule,
    ],
    declarations: []
})
export class PluginsModule { }