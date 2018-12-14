import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {WebAngularDataStore} from "@webdjangular/core/services";
import {AbstractForm} from "@webdjangular/core/data-forms";
import {ProductModel} from "../../../data/models/Product.model";
import {BuilderFormFieldConfig} from "@webdjangular/core/builder";


@Component({
  selector: 'wda-store-edit-product',
  styleUrls: ['./edit-product.component.scss'],
  templateUrl: './edit-product.component.html'
})
export class EditProductComponent implements OnInit {

  private readonly id: string;
  before_title: string = "Editing";
  form: AbstractForm;
  loading: boolean = false;

  private selecting_product_type: boolean;

  private scaffoldFieldsAttributes: BuilderFormFieldConfig[] = [

  ];

  constructor(private route: ActivatedRoute,
              private datasource: WebAngularDataStore) {

    this.id = this.route.params['value'].id;
    if (!this.id) {
      this.before_title = "Creating a new";
      this.selecting_product_type = true;
    } else {
      this.selecting_product_type = false;
    }
    let entity = new ProductModel(datasource);
    this.form = entity.getForm();
    this.form.generateForm();
  }

  ngOnInit() {
    this.form.get('product_type').valueChanges.subscribe((value)=>{
      if(this.form.get('product_type').get('id').value){
        this.selecting_product_type = false;
        this.getProductAttributes();
      } else {
        this.selecting_product_type = true;
      }
    });
  }

  getProductAttributes() {
    /*
    this.scaffoldFieldsAttributes = [];

    for(let attribute of this.form.get('product_type').get('attributes').value) {
      let attributeScaffold: BuilderFormFieldConfig = {
        name: attribute['code'],
        label: attribute['name'],
        type:  attribute['type'],
        //validation: validatprs, attribute['required']
      };
      this.scaffoldFieldsAttributes.push(attributeScaffold);
      this.form.generateForm();
    }

    console.log(this.scaffoldFieldsAttributes);
    //this.scaffoldFieldsAttributes

    /*
      {
      type: 'select',
      label: 'Type',
      name: 'product_type',
      wrapper_class: 'col-12',
      placeholder: 'Select the Product Type',
      //value: null,
      options_model: ProductTypeModel
    },

      code: "n_pages  "
      name: "Número de páginas"
      required: false
      type: "text"
     */
  }


}
