import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from './forms.component';

@NgModule({
  declarations: [FormsComponent],
  imports: [CommonModule],
  exports: [FormsComponent]
})
export class FormsModule {}
