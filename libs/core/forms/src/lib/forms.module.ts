import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';
import { FormioModule } from 'angular-formio';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule, FormioModule],
  exports: [FormsComponent]
})
export class FormsModule {}
