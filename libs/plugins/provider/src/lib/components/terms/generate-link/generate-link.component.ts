import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

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
  @Input() send_link: string = "send-terms";
  taxvat_mask = "000.000.000-000";
  link: string = null;
  linkForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    taxvat: new FormControl('', [Validators.required, Validators.minLength(10)]),
    company_name: new FormControl('', [Validators.minLength(4)]),
    taxvat_resp: new FormControl('', [Validators.minLength(10)]),
    internet: new FormControl(''),
    tv: new FormControl(''),
    phone: new FormControl(''),
    equip: new FormControl(''),
  })
  url: string = null;

  copy_text: string = "Copiar o link";

  constructor(@Inject(DOCUMENT) private document,
    private router: Router) {
    this.url = document.location.protocol + '//' + document.location.host;

  }

  ngOnInit() {
    this.linkForm.valueChanges.subscribe(form => {
      const data = this.linkForm.getRawValue();
      for (const k in data) {
        if (data.hasOwnProperty(k)) {
          if (data[k] === true) {
            data[k] = 1
          } else if (data[k] === "" || data[k] === false) {
            delete (data[k])
          }
        }
      }
      if (data.taxvat) {
        console.log(data.taxvat.length)
        if (data.taxvat.length > 14) {
          this.taxvat_mask = "00.000.000/0000-00";
        } else {
          this.taxvat_mask = "000.000.000-000";
        }
      }
      this.generateLink(data);
    });
  }
  generateLink(data) {
    if (data.internet || data.tv || data.phone || data.equip) {
      const tree = this.router.createUrlTree([this.send_link]).toString();
      const bdata = btoa(JSON.stringify(data));
      this.link = `${this.url}${tree}?data=${bdata}`;
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
