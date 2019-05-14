import { Input, OnInit } from '@angular/core';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonApiQueryData, Attribute } from 'angular2-jsonapi';
import { Subject } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { WDAConfig } from '@core/services/src/lib/wda-config.service';
export class PluginProviderAbstractPricingComponent implements OnInit {
  @Input() title: string;
  @Input() title_id: string;
  @Input() titleColor: string;
  @Input() headline: string;
  @Input() background: string;
  @Input() discount: number;

  @Input() skus: string;
  @Input() ids: string;
  @Input() class = 'col-12 col-md-6 p-0 m-0';
  loading = true;
  public model = ProductModel;
  public entries: ProductModel[];
  private providerConfig = null;
  protected include = null;
  public entriesChanged: Subject<ProductModel[]> = new Subject();

  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal,
    public wdaConfig: WDAConfig,
  ) {

  }
  emitChanges() {
    this.entriesChanged.next(this.entries);
  }
  ngOnInit() {
    this.wdaConfig.getCoreConfig('provider').then(data => {
      this.providerConfig = data;
    });
    let options = {};
    let order: string[] = null;
    options['page'] = { number: 1, size: 10 };
    if (this.skus) {
      options['sku__in'] = this.skus;
      order = this.skus.split(',');
    } else if (this.ids) {
      options['ids__in'] = this.ids;
      order = this.ids.split(',');
    }
    if (order) {
      options['page']['size'] = order.length;
      if (this.include) {
        options['include'] = this.include;
      }

      options['fields'] = [
        'price',
        'pricing_list',
        'base_price',
        'data',
        'name',
        'sku',
        'channel_count',
        'channel_hd_count'
      ].join(',');

      this.datastore
        .findAll(this.model, options)
        .subscribe((query: JsonApiQueryData<ProductModel>) => {
          let entries = query.getModels();
          this.entries = [];
          for (let i = 0; i < order.length; i++) {
            const element = order[i];
            this.entries.push(
              entries.find(entry => entry.id == element || entry.sku == element)
            );
          }
          this.loading = false;
          this.emitChanges();
        });
    }
  }
  getSvaScm(value) {
    const sva_total = Math.floor(value * this.providerConfig.sva_total) / 100;
    return [sva_total.toFixed(2), (value - sva_total).toFixed(2)];
  }
  getContent(plan: ProductModel) {
    if (plan) {
      const replaces = {
        'price': plan.price,
        'discounted_price': (plan.price - this.discount).toFixed(2),
      }
      // Getting Total Price SVA and SCM
      let sva_scm = this.getSvaScm(plan.price);
      replaces['price_sva'] = sva_scm[0];
      replaces['price_scm'] = sva_scm[1];
      // Getting Discounted Price SVA and SCM
      sva_scm = this.getSvaScm(plan.price - this.discount);
      replaces['discounted_sva'] = sva_scm[0];
      replaces['discounted_scm'] = sva_scm[1];


      for (const key in replaces) {
        if (replaces.hasOwnProperty(key)) {
          const rep = replaces[key];
          plan.description = plan.description.replace(`{{${key}}}`, rep);
        }
      }
    }
    return plan.description ? plan.description : plan.name;
  }

  /**
   * 
   * @param content 
   * @param plan 
   */
  openModal(content: string) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
