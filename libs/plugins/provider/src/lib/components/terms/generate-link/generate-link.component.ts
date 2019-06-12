import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { WDAValidators } from '@core/builder/src/lib/inputs/validators/custom.validators';

@Component({
  selector: 'provider-terms-form',
  templateUrl: './generate-link.component.html',
  styleUrls: ['./generate-link.component.scss']
})
export class PluginProviderGenerateLinkFormComponent implements OnInit {
  @Input() show_internet = true;
  @Input() show_phone = true;
  @Input() show_tv = true;
  @Input() show_equip = true;
  @Input() send_link: string = 'send-terms';
  private is_company = false;
  taxvat_mask = '000.000.000-009';
  link: string = null;
  linkForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    taxvat: new FormControl('', [
      Validators.required,
      WDAValidators.cpf()
    ]),
    company_name: new FormControl('', [Validators.minLength(4)]),
    taxvat_resp: new FormControl('', [WDAValidators.cpf()]),
    internet: new FormControl(''),
    tv: new FormControl(''),
    phone: new FormControl(''),
    equip: new FormControl('')
  });
  url: string = null;

  copy_text: string = 'Copiar o link';

  constructor(@Inject(DOCUMENT) private document, private router: Router) {
    this.url = document.location.protocol + '//' + document.location.host;
  }

  ngOnInit() {
    this.linkForm.valueChanges.subscribe(form => {
      const data = this.linkForm.getRawValue();
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          if (data[k] === true) {
            data[k] = 1;
          } else if (data[k] === '' || data[k] === false) {
            delete data[k];
          }
        }
      }
      if (data.taxvat) {
        if (data.taxvat.length > 14) {
          if (this.is_company === false) {
            this.is_company = true;
            this.taxvat_mask = '00.000.000/0000-00';
            this.linkForm.get('taxvat').setValidators([Validators.required, WDAValidators.cnpj()]);
            this.linkForm.get('taxvat').updateValueAndValidity({ emitEvent: false });
            this.linkForm.get('company_name').setValidators([Validators.required, Validators.minLength(4)]);
            this.linkForm.get('company_name').updateValueAndValidity({ emitEvent: false });
            this.linkForm.get('taxvat_resp').setValidators([Validators.required, WDAValidators.cpf()]);
            this.linkForm.get('taxvat_resp').updateValueAndValidity({ emitEvent: false });
          }
        } else {
          if (this.is_company) {
            this.is_company = false;
            this.taxvat_mask = '000.000.000-009';
            this.linkForm.get('taxvat').setValidators([Validators.required, WDAValidators.cpf()]);
            this.linkForm.get('taxvat').updateValueAndValidity({ emitEvent: false });
            this.linkForm.get('company_name').setValidators([]);
            this.linkForm.get('company_name').updateValueAndValidity({ emitEvent: false });
            this.linkForm.get('taxvat_resp').setValidators([]);
            this.linkForm.get('taxvat_resp').updateValueAndValidity({ emitEvent: false });
          }

        }
      }
      this.generateLink(data);
    });
  }
  generateLink(data) {
    if (this.linkForm.valid && data.name && data.email && data.taxvat) {
      if (data.internet || data.tv || data.phone || data.equip) {
        const tree = this.router.createUrlTree([this.send_link]).toString();
        const bdata = btoa(JSON.stringify(data));
        this.link = `${this.url}${tree}?data=${bdata}`;
      } else {
        this.link = null;
      }
    } else {
      this.link = null;
    }
  }
  cleanForm() {
    this.linkForm.reset();
    this.link = null;
  }
  copyLink() {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.link;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
}
