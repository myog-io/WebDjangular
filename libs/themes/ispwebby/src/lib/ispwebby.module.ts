import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ThemeIspwebbyComponent } from './ispwebby.component';
import { ThemeIspwebbyHeaderComponent } from './components/header/header.component';
import { ThemeIspwebbyTopHeaderComponent } from './components/header/top-header/top-header.component';
import { ThemeIspwebbyHeaderMenuComponent } from './components/header/menu/menu.component';
import { ThemeIspwebbyFooterComponent } from './components/footer/footer.component';
import { ThemeIspwebbyBottomFooterComponent } from './components/footer/bottom-footer/bottom-footer.component';
import { ThemeIspwebbySignatureFooterComponent } from './components/footer/signature-footer/signature-footer.component';
import { ThemeIspwebbyModalWecallyouComponent } from './components/modal/wecallyou/wecallyou.component';
import { ThemeIspwebbyModalChoosecityComponent } from './components/modal/choosecity/choosecity.component';
import { ThemeIspwebbyModalAdultContentComponent } from './components/modal/adult-content/adult-content.component';
import { ThemeIspwebbyModalCombateComponent } from './components/modal/combate/combate.component';
import { ThemeIspwebbyModalCrackleComponent } from './components/modal/crackle/crackle.component';
import { ThemeIspwebbyModalHBOComponent } from './components/modal/hbo/hbo.component';
import { ThemeIspwebbyModalPacoteInternacionalComponent } from './components/modal/pacote-internacional/pacote-internacional.component';
import { ThemeIspwebbyModalPlayboytvComponent } from './components/modal/playboytv/playboytv.component';
import { ThemeIspwebbyModalPremiereComponent } from './components/modal/premiere/premiere.component';
import { ThemeIspwebbyModalSexpriveComponent } from './components/modal/sexprive/sexprive.component';
import { ThemeIspwebbyModalSexyhotComponent } from './components/modal/sexyhot/sexyhot.component';
import { ThemeIspwebbyModalTelecineComponent } from './components/modal/telecine/telecine.component';
import { ThemeIspwebbyModalVenusComponent } from './components/modal/venus/venus.component';
import { ThemeIspwebbyModalChannelsComponent } from './components/modal/channels/channels.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { CoreDynamicPageLoaderModule } from '@core/dynamic-page-loader/src/lib/core-dynamic-page-loader.module';

import { LayoutComponent } from '@themes/ispwebby/src/lib/components/layout/layout.component';
import { LayoutFullContentComponent } from '@themes/ispwebby/src/lib/components/layout/full-content/full-content.component';
import { LayoutRightSidebarComponent } from '@themes/ispwebby/src/lib/components/layout/right-sidebar/right-sidebar.component';
import { LayoutLeftSidebarComponent } from '@themes/ispwebby/src/lib/components/layout/left-sidebar/left-sidebar.component';
import { NbCheckboxModule } from '@nebular/theme';

const LAYOUTS = [
  LayoutComponent,
  LayoutFullContentComponent,
  LayoutRightSidebarComponent,
  LayoutLeftSidebarComponent
];

const COMPONENTS = [
  ...LAYOUTS,
  ThemeIspwebbyComponent,
  ThemeIspwebbyHeaderComponent,
  ThemeIspwebbyTopHeaderComponent,
  ThemeIspwebbyHeaderMenuComponent,

  ThemeIspwebbyFooterComponent,
  ThemeIspwebbyBottomFooterComponent,
  ThemeIspwebbySignatureFooterComponent,

  ThemeIspwebbyModalWecallyouComponent,
  ThemeIspwebbyModalChoosecityComponent,
  ThemeIspwebbyModalChannelsComponent,
  ThemeIspwebbyModalAdultContentComponent,
  ThemeIspwebbyModalCombateComponent,
  ThemeIspwebbyModalCrackleComponent,
  ThemeIspwebbyModalHBOComponent,
  ThemeIspwebbyModalPacoteInternacionalComponent,
  ThemeIspwebbyModalPlayboytvComponent,
  ThemeIspwebbyModalPremiereComponent,
  ThemeIspwebbyModalSexpriveComponent,
  ThemeIspwebbyModalSexyhotComponent,
  ThemeIspwebbyModalTelecineComponent,
  ThemeIspwebbyModalVenusComponent

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
      { path: '**', pathMatch: 'full', component: ThemeIspwebbyComponent }
    ])
  ],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  entryComponents: [
    ThemeIspwebbyModalWecallyouComponent,
    ThemeIspwebbyModalChoosecityComponent,
    ThemeIspwebbyModalChannelsComponent,
    ThemeIspwebbyModalAdultContentComponent,
    ThemeIspwebbyModalCombateComponent,
    ThemeIspwebbyModalCrackleComponent,
    ThemeIspwebbyModalHBOComponent,
    ThemeIspwebbyModalPacoteInternacionalComponent,
    ThemeIspwebbyModalPlayboytvComponent,
    ThemeIspwebbyModalPremiereComponent,
    ThemeIspwebbyModalSexpriveComponent,
    ThemeIspwebbyModalSexyhotComponent,
    ThemeIspwebbyModalTelecineComponent,
    ThemeIspwebbyModalVenusComponent,
    ThemeIspwebbyTopHeaderComponent,
    ThemeIspwebbyHeaderMenuComponent
  ]
})
export class ThemeIspwebbyModule { }
