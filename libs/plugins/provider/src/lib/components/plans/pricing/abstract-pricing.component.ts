import { Input, OnInit } from '@angular/core';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JsonApiQueryData, Attribute } from 'angular2-jsonapi';
import { Subject } from 'rxjs';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
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
  protected include = null;
  public entriesChanged: Subject<ProductModel[]> = new Subject();

  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal
  ) {}
  emitChanges() {
    this.entriesChanged.next(this.entries);
  }
  ngOnInit() {
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

  openModal(content) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }
}
