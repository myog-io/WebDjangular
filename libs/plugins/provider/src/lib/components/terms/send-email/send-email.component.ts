import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { FormSubmittedModel } from '@core/cms/src/lib/models/FormSubmittedModel';
import { ErrorResponse } from 'angular2-jsonapi';
import { FormModel } from '@core/cms/src/lib/models/Form.model';

@Component({
  selector: 'provider-terms-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.scss']
})
export class PluginProviderSendEmailFormComponent implements OnInit {
  public data: any = [];
  public isSending = false;
  public error: string = null;
  public success = false;
  @Input() form_id: string;
  @Input() data_key = 'body';
  private routeSub: Subscription;
  private form: FormModel;
  public loading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datastore: WebAngularDataStore,
    private activeRoute: ActivatedRoute
  ) {
    this.routeSub = this.activeRoute.queryParams.subscribe(params => {
      if (this.routeSub) {
        this.routeSub.unsubscribe();
        this.routeSub = null;
      }
      if (params.data) {
        //const json = atob(params.data);
        this.data = JSON.parse(atob(params.data));
      }
    });
    /*
    this.activeRoute.params.subscribe(params => {
      console.log(params)
      if (params.data) {
        //const json = atob(params.data);
        this.data = JSON.parse(atob(params.data));
      }
    })
    */
  }

  ngOnInit() {
    if (!this.data.name || !this.data.taxvat) {
      this.success = true;
    }
    this.loading = true;
    this.datastore.findRecord(FormModel, this.form_id).subscribe(
      data => {
        this.form = data;
        this.loading = false;
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  get body(): string {
    let body = '';
    let taxvat_text = 'portador do CPF';

    if (this.data.taxvat.length > 14) {
      taxvat_text = `portador do CPF <b>${
        this.data.taxvat_resp
      }</b>, responsavel pela empresa <b>${
        this.data.company_name
      }</b> registrada sob o CNPJ`;
    }
    body += `<p style="text-align:center" class="text-black">
      Eu&#160;<b>${this.data.name}</b>, ${taxvat_text} &#160;<b>${
      this.data.taxvat
    }</b>, declaro que estou ciente que as
      informações referente ao plano escolhido, valores de mensalidade,
      endereço, bonificação, fidelização estarão contidos na ordem de serviço que
      será assinado no ato da instalação.<br>Declaro ainda que:</p>
    `;

    body += "<ul class='text-black'>";
    if (this.data.internet) {
      body += `
      <li>
        Li, Entendi e aceito os <a href="https://www.lpnet.com.br/contrato/" target="_NEW">Termos do contrato SCM.</a>
      </li>
      <li>
        Li, Entendi e aceito os <a href="https://www.lpnet.com.br/contrato-sva" target="_NEW">Termos do contrato SVA.</a>
      </li>
      `;
    }
    if (this.data.phone) {
      body += `
      <li>
        Li, Entendi e aceito os <a href="https://www.lpnet.com.br/contrato-stfc" target="_NEW"> Termos do contrato STFC.</a>
      </li>
      `;
    }
    if (this.data.tv) {
      body += `
      <li>
      Li, Entendi e aceito os <a href="https://www.life.com.br/documentos/Contrato_SEAC.pdf" target="_NEW"> Termos do contrato SEAC LIFE.</a>
      </li>
      `;
      body += `
      <li>
      Li, Entendi e aceito os <a href="https://www.lpnet.com.br/contrato-seac-lpnet/" target="_NEW"> Termos do contrato SEAC LPNET.</a>
      </li>
      `;
    }
    if (this.data.equip) {
      body += `
      <li>
        Li, Entendi e aceito os <a href="https://www.lpnet.com.br/contrato-e-termos-de-uso-maxroteador/" target="_NEW"> Termos do contrato de Alugel de Equipamentos.</a>
      </li>
      `;
    }

    body += '</ul>';
    return body;
  }
  failed() {
    this.isSending = false;
    this.success = false;
    this.error =
      'Ocorreu um erro ao enviar seu email, por favor tente novamente!';
  }
  sendEmail() {
    this.isSending = true;
    const data = this.data;
    data[this.data_key] = this.body;
    this.datastore
      .createRecord(FormSubmittedModel, {
        form: this.form,
        data: data
      })
      .save()
      .subscribe(
        (formSubmitted: FormSubmittedModel) => {
          this.isSending = false;
          this.error = null;
          this.success = true;
          this.router.navigate(['.'], { relativeTo: this.route });
        },
        (error: ErrorResponse) => {
          this.failed();
        }
      );
    /*
    this.sendEmailService.sendEndmail(
      {
        to: this.emails,
        subject: this.subject,
        message: this.body,
      }
    ).subscribe((data: any) => {
      if (data.status) {
        this.isSending = false;
        this.error = null;
        this.route.navigate(['send']);
        this.success = true;
      } else {
        console.log(data);
        this.failed();
      }
    }, (error: any) => {
      this.failed();
      console.log(error)
    })

    */
  }
}
