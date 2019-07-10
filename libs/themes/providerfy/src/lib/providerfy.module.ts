import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ThemeProviderfyComponent } from './providerfy.component';
import { ThemeProviderfyHeaderComponent } from './components/header/header.component';
import { ThemeProviderfyTopHeaderComponent } from './components/header/top-header/top-header.component';
import { ThemeProviderfyHeaderMenuComponent } from './components/header/menu/menu.component';
import { ThemeProviderfyFooterComponent } from './components/footer/footer.component';
import { ThemeProviderfyBottomFooterComponent } from './components/footer/bottom-footer/bottom-footer.component';
import { ThemeProviderfySignatureFooterComponent } from './components/footer/signature-footer/signature-footer.component';
import { ThemeProviderfyModalWecallyouComponent } from './components/modal/wecallyou/wecallyou.component';
import { ThemeProviderfyModalChoosecityComponent } from './components/modal/choosecity/choosecity.component';
import { ThemeProviderfyModalAdultContentComponent } from './components/modal/adult-content/adult-content.component';
import { ThemeProviderfyModalCombateComponent } from './components/modal/combate/combate.component';
import { ThemeProviderfyModalCrackleComponent } from './components/modal/crackle/crackle.component';
import { ThemeProviderfyModalHBOComponent } from './components/modal/hbo/hbo.component';
import { ThemeProviderfyModalPacoteInternacionalComponent } from './components/modal/pacote-internacional/pacote-internacional.component';
import { ThemeProviderfyModalPlayboytvComponent } from './components/modal/playboytv/playboytv.component';
import { ThemeProviderfyModalPremiereComponent } from './components/modal/premiere/premiere.component';
import { ThemeProviderfyModalSexpriveComponent } from './components/modal/sexprive/sexprive.component';
import { ThemeProviderfyModalSexyhotComponent } from './components/modal/sexyhot/sexyhot.component';
import { ThemeProviderfyModalTelecineComponent } from './components/modal/telecine/telecine.component';
import { ThemeProviderfyModalVenusComponent } from './components/modal/venus/venus.component';
import { ThemeProviderfyModalChannelsComponent } from './components/modal/channels/channels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { CoreDynamicPageLoaderModule } from '@core/dynamic-page-loader/src/lib/core-dynamic-page-loader.module';

import { LayoutComponent } from '@themes/providerfy/src/lib/components/layout/layout.component';
import { LayoutFullContentComponent } from '@themes/providerfy/src/lib/components/layout/full-content/full-content.component';
import { LayoutRightSidebarComponent } from '@themes/providerfy/src/lib/components/layout/right-sidebar/right-sidebar.component';
import { LayoutLeftSidebarComponent } from '@themes/providerfy/src/lib/components/layout/left-sidebar/left-sidebar.component';
import { NbCheckboxModule } from '@nebular/theme';

const LAYOUTS = [
  LayoutComponent,
  LayoutFullContentComponent,
  LayoutRightSidebarComponent,
  LayoutLeftSidebarComponent
];

const COMPONENTS = [
  ...LAYOUTS,
  ThemeProviderfyComponent,
  ThemeProviderfyHeaderComponent,
  ThemeProviderfyTopHeaderComponent,
  ThemeProviderfyHeaderMenuComponent,

  ThemeProviderfyFooterComponent,
  ThemeProviderfyBottomFooterComponent,
  ThemeProviderfySignatureFooterComponent,

  ThemeProviderfyModalWecallyouComponent,
  ThemeProviderfyModalChoosecityComponent,
  ThemeProviderfyModalChannelsComponent,
  ThemeProviderfyModalAdultContentComponent,
  ThemeProviderfyModalCombateComponent,
  ThemeProviderfyModalCrackleComponent,
  ThemeProviderfyModalHBOComponent,
  ThemeProviderfyModalPacoteInternacionalComponent,
  ThemeProviderfyModalPlayboytvComponent,
  ThemeProviderfyModalPremiereComponent,
  ThemeProviderfyModalSexpriveComponent,
  ThemeProviderfyModalSexyhotComponent,
  ThemeProviderfyModalTelecineComponent,
  ThemeProviderfyModalVenusComponent

  /*
  ProviderPlansComponent,
  ProviderPricingInternetHorizontalComponent,
  ProviderPricingInternetVerticalComponent,
  ProviderPricingTvVerticalComponent,
  ProviderPricingTelephoneVerticalComponent
  */
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NbCheckboxModule,

    NgSelectModule,
    CoreDynamicPageLoaderModule,
    NgxMaskModule.forRoot(),
    RouterModule.forChild([
      // TODO: remove the redirect to the page (remove these errors from routes as well) and make the error showing inside the page that gave the error.
      { path: '**', pathMatch: 'full', component: ThemeProviderfyComponent }
    ])
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [
    ThemeProviderfyModalWecallyouComponent,
    ThemeProviderfyModalChoosecityComponent,
    ThemeProviderfyModalChannelsComponent,
    ThemeProviderfyModalAdultContentComponent,
    ThemeProviderfyModalCombateComponent,
    ThemeProviderfyModalCrackleComponent,
    ThemeProviderfyModalHBOComponent,
    ThemeProviderfyModalPacoteInternacionalComponent,
    ThemeProviderfyModalPlayboytvComponent,
    ThemeProviderfyModalPremiereComponent,
    ThemeProviderfyModalSexpriveComponent,
    ThemeProviderfyModalSexyhotComponent,
    ThemeProviderfyModalTelecineComponent,
    ThemeProviderfyModalVenusComponent,
    ThemeProviderfyTopHeaderComponent,
    ThemeProviderfyHeaderMenuComponent
  ]
})
export class ThemeProviderfyModule { }
