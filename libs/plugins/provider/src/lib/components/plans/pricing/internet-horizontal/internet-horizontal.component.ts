import {Component, Input, OnInit} from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'plugin-provider-plan-pricing-internet-horizontal',
  templateUrl: './internet-horizontal.component.html',
  styleUrls: ['./internet-horizontal.component.scss']
})
export class PluginProviderPricingInternetHorizontalComponent implements OnInit {

  @Input() skus:string;
  @Input() ids:string;
  @Input() class = "col-md-6 col-sm-6 p-0 m-0";
  loading = true;
  private entries:ProductModel[];


  constructor(
    private datastore: WebAngularDataStore,
    private modalService: NgbModal) {
  }

  ngOnInit() {
    let options = {};
    let order;
    options['page'] = {number:1,size:10};
    if(this.skus){
      options['sku__in'] = this.skus;
      order = this.skus.split(",");
    }else if(this.ids){
      options['ids__in'] = this.ids;
      order = this.ids.split(",");
    }
    options['page']['size'] = order.length

    this.datastore.findAll(ProductModel,options).subscribe((query:JsonApiQueryData<ProductModel>) =>{
      let entries = query.getModels();
      this.entries = [];
      for (let i = 0; i < order.length; i++) {
        const element = order[i];
        this.entries.push(entries.find((entry)=> entry.id == element || entry.sku == element))
      }
      this.loading = false;
    });
  }
}
