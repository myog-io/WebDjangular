import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {WebAngularDataStore} from "@webdjangular/core/services";
import {AbstractForm} from "@webdjangular/core/data-forms";
import {ProductModel} from "../../../data/models/Product.model";
import {ProductForm} from "../../../data/forms/Product.form";


@Component({
  selector: 'wda-store-edit-product',
  styleUrls: ['./edit-product.component.scss'],
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {
  private id: string;
  before_title: string = "Editing";
  form: ProductForm;
  loading: boolean = false;

  constructor(private route: ActivatedRoute,
              private datasource: WebAngularDataStore) {

    this.id = this.route.params['value'].id;
    if (!this.id) {
      this.before_title = "Creating a new"
    }
    this.form = new ProductModel.formClassRef(datasource);
    this.form.generateForm();


  }

  ngOnInit() {

  }
}
