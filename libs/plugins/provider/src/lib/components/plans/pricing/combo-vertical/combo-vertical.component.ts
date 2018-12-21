import { Component, OnInit, Input } from '@angular/core';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { ProductModel } from 'libs/plugins/store/src/lib/data/models/Product.model';

@Component({
  selector: 'plugin-provider-plan-pricing-combo-vertical',
  templateUrl: './combo-vertical.component.html',
  styleUrls: ['./combo-vertical.component.scss']
})
export class PluginPricingComboVerticalComponent implements OnInit {
  @Input() sku_net:string;
  @Input() sku_tv:string;
  @Input() sku_phone:string;
  @Input() internet_call = "2X VELOCIDADE";
  @Input() tv_call = "50% DESCONTO";

  loading = true;
  net:ProductModel;
  tv:ProductModel;
  phone:ProductModel;
  total:number = 0;
  constructor(private datastore: WebAngularDataStore) { }

  ngOnInit() {
    let options = {};
    options['page'] = { number: 1, size: 3 };
    let skus = [];
    if(this.sku_net) skus.push(this.sku_net)
    if(this.sku_tv) skus.push(this.sku_tv)
    if(this.sku_phone) skus.push(this.sku_phone)

    options['sku__in'] = skus.join(",");
    this.datastore.findAll(ProductModel,options).subscribe((query) =>{
      let entries:ProductModel[] = query.getModels();
      this.net = entries.find( (product) => product.sku == this.sku_net );
      this.tv = entries.find( (product) => product.sku == this.sku_tv );
      this.phone = entries.find( (product) => product.sku == this.sku_phone );
      if(this.net && this.net.pricing){
        this.total += parseFloat(this.net.pricing.list);
      }else{
        console.log("NOT FOUND",entries);
      }
      if(this.tv && this.tv.pricing){
        this.total += parseFloat(this.tv.pricing.list);
      }else{
        console.log("NOT FOUND",entries);
      }
      if(this.phone && this.phone.pricing){
        this.total += parseFloat(this.phone.pricing.list);
      }else{
        console.log("NOT FOUND",entries);
      }
      // TODO: Apply Discount???

      this.loading = false;
    } )
  }

}
