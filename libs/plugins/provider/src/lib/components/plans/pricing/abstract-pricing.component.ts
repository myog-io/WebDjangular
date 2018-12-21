import { Input, OnInit } from "@angular/core";
import { ProductModel } from "libs/plugins/store/src/lib/data/models/Product.model";
import { WebAngularDataStore } from "@webdjangular/core/services";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { JsonApiQueryData, Attribute } from "angular2-jsonapi";
import { Subject } from "rxjs";

export class PluginProviderAbstractPricingComponent implements OnInit {

  @Input() skus: string;
  @Input() ids: string;
  @Input() class = "col-md-6 col-sm-6 p-0 m-0";
  loading = true;
  public entries: ProductModel[];
  private include = null;
  public entriesChanged: Subject<ProductModel[]> = new Subject();

  constructor(
    public datastore: WebAngularDataStore,
    public modalService: NgbModal) {
  }
  emitChanges(){
    this.entriesChanged.next(this.entries);
  }
  ngOnInit() {

    let options = {};
    let order:string[] = null;
    options['page'] = { number: 1, size: 10 };
    if (this.skus) {
      options['sku__in'] = this.skus;
      order = this.skus.split(",");
    } else if (this.ids) {
      options['ids__in'] = this.ids;
      order = this.ids.split(",");
    }
    if (order) {
      options['page']['size'] = order.length
      if(this.include){
        options['include'] = this.include;
      }


      this.datastore.findAll(ProductModel, options).subscribe((query: JsonApiQueryData<ProductModel>) => {
        let entries = query.getModels();
        this.entries = [];
        for (let i = 0; i < order.length; i++) {
          const element = order[i];
          this.entries.push(entries.find((entry) => entry.id == element || entry.sku == element));

        }
        console.log(this.entries);
        this.loading = false;
        this.emitChanges();
      });
    }
  }

  openModal(content) {
    this.modalService.open(content, { size: 'lg', centered: true })
  }
}
