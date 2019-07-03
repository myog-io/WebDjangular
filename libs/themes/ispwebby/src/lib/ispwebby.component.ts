import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { CoreDynamicPageLoaderComponent } from '@core/dynamic-page-loader/src/lib/core-dynamic-page-loader.component';

@Component({
  selector: 'theme-ispwebby',
  styleUrls: ['./ispwebby.component.scss', './styles/styles.scss'],
  templateUrl: './ispwebby.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ThemeIspwebbyComponent extends CoreDynamicPageLoaderComponent {}
