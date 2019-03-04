import { Injectable, Optional, Inject } from '@angular/core';
import { DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig, JsonApiModel, ModelType, ModelConfig, } from 'angular2-jsonapi';
import { Observable } from 'rxjs';
import { UserModel, GroupModel, PermissionModel } from '@core/users/src/lib/models';
import { PageModel, BlockModel, MenuItemModel, MenuModel } from '@core/cms/src/lib/models';
import { ContentTypeModel, CoreConfigGroupModel, CoreConfigInputModel, CoreConfigModel, AbstractModel, AddressModel } from '@core/data/src/lib/models';
import { CityModel, StreetModel, ResellerModel, CondoModel, ChannelModel } from '@plugins/provider/src/lib/data';
import { PostalCodeRangeModel } from '@plugins/provider/src/lib/data/models/PostalCodeRangeModel';
import { ProductModel } from '@plugins/store/src/lib/data/models/Product.model';
import { ProductTypeModel } from '@plugins/store/src/lib/data/models/ProductType.model';
import { ProductAttributeModel } from '@plugins/store/src/lib/data/models/ProductAttribute.model';
import { ProductAttributeOptionModel } from '@plugins/store/src/lib/data/models/ProductAttributeOption.model';
import { HttpClient } from '@angular/common/http';
import { CategoryModel } from '@plugins/store/src/lib/data/models/Category.model';
import { CartItemModel } from '@plugins/store/src/lib/data/models/CartItem.model';
import { CartModel } from '@plugins/store/src/lib/data/models/Cart.model';
import { EmailModel } from '@core/data/src/lib/models/Email.model';
import { OrderLineModel } from "@plugins/store/src/lib/data/models/OrderLine.model";
import { OrderModel } from "@plugins/store/src/lib/data/models/Order.model";
import { FormModel } from '@core/cms/src/lib/models/Form.model';
import { FormActionModel } from '@core/cms/src/lib/models/FormAction.model';
import { FormFieldModel } from '@core/cms/src/lib/models/FormField.model';
import { FormSubmitionModel } from '@core/cms/src/lib/models/FormSubmition.model';



// tslint:disable-next-line:variable-name
function cleanEmptyRecursive(attribute) {
  if (attribute === '') {
    attribute = null;
  } else if (attribute instanceof JsonApiModel) {
    const index = Object.getOwnPropertySymbols(attribute)[0] as any;
    const attributesMetadata: any = attribute[index];
    attribute = getDirtyAttributes(attributesMetadata);
  } else if (attribute instanceof Array || typeof (attribute) == 'object') {
    for (const i in attribute) {
      if (attribute.hasOwnProperty(i)) {
        attribute[i] = cleanEmptyRecursive(attribute[i]);
      }
    }
  }
  return attribute
}

function getDirtyAttributes(attributesMetadata: any): { string: any } {
  const dirtyData: any = {};

  for (const propertyName in attributesMetadata) {
    if (attributesMetadata.hasOwnProperty(propertyName)) {
      const metadata: any = attributesMetadata[propertyName];

      if (metadata.hasDirtyAttributes) {
        const attributeName = metadata.serializedName != null ? metadata.serializedName : propertyName;
        dirtyData[attributeName] = metadata.serialisationValue ? metadata.serialisationValue : metadata.newValue;
        dirtyData[attributeName] = cleanEmptyRecursive(dirtyData[attributeName]);
      }

    }
  }
  return dirtyData;
}

const config: DatastoreConfig = {
  baseUrl: '/api',
  // TODO: Load all This Dynamic
  // HARDCODE INCLUDES GOES HERE
  models: {
    Address: AddressModel, // Core
    User: UserModel, // User
    Group: GroupModel, // Core
    Email: EmailModel, //Core
    CoreConfig: CoreConfigModel, //Core

    Page: PageModel, // CMS
    Block: BlockModel, // CMS
    Permission: PermissionModel, // CMS
    ContentType: ContentTypeModel, // CMS
    CoreConfigGroup: CoreConfigGroupModel, // CMS
    CoreConfigInput: CoreConfigInputModel, // CMS
    Form: FormModel, // CMS
    FormAction: FormActionModel, // CMS
    FormField: FormFieldModel, // CMS
    FormSubmition: FormSubmitionModel, // CMS
    MenuItem: MenuItemModel, // CMS
    Menu: MenuModel, // CMS

    City: CityModel, // Provider
    PostalCodeRange: PostalCodeRangeModel, // Provider
    Street: StreetModel, // Provider
    Reseller: ResellerModel, // Provider
    Condo: CondoModel, // Provider
    Channel: ChannelModel, // Provider

    Product: ProductModel, // Store
    ProductCategory: CategoryModel, // Store
    ProductType: ProductTypeModel, // Store
    ProductAttribute: ProductAttributeModel, // Store
    ProductAttributeOption: ProductAttributeOptionModel, // Store
    CartItem: CartItemModel, // Store
    Cart: CartModel, // Store
    Order: OrderModel, // Store
    OrderLine: OrderLineModel // Store
  },
  //overrides: {
  //  getDirtyAttributes: getDirtyAttributes
  //}
};

@Injectable()
@JsonApiDatastoreConfig(config)
export class WebAngularDataStore extends JsonApiDatastore {

  constructor(
    protected http: HttpClient,
    @Optional() @Inject('APP_BASE_HREF') baseHref: string,
  ) {
    super(http);
    if (baseHref && this.datastoreConfig.baseUrl.search(baseHref) === -1) {
      this.datastoreConfig.baseUrl = `${baseHref}${this.datastoreConfig.baseUrl}`;
    }
  }

  public getRelationships(data: any): any {
    let relationships: any;
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        if (data[key] instanceof AbstractModel) {

          relationships = relationships || {};

          if (data[key].id) {
            relationships[key] = {
              data: this.buildSingleRelationshipData(data[key])
            };
          }
        } else if (data[key] instanceof Array && data[key].length > 0 && this.isValidToManyRelation(data[key])) {

          relationships = relationships || {};

          const relationshipData = data[key]
            .filter((model: AbstractModel) => model.id)
            .map((model: AbstractModel) => this.buildSingleRelationshipData(model));

          relationships[key] = {
            data: relationshipData
          };
        } else if (data[key] instanceof Array && data[key].length <= 0) {
          relationships = relationships || {};
          // Cleaning to Many Relationship
          relationships[key] = {
            data: []
          };
        }
      }
    }
    return relationships;
  }

  /**
   * This Function Cleans the Attributes from the Request and send to the Model
   * For now we don't want to do that, because could have read_only dynamic attributes added to the backend
   * TODO: Improve how we manage Dynamic Attributes
   * @param hasManyFields
   * @param modelConfig
   * @param extraOptions
   * @param model
   */

  saveHasManyRelationship<T extends JsonApiModel>(hasManyFields = [], modelConfig = {}, extraOptions = {}, model: JsonApiModel): Observable<any> {
    return new Observable(observe => {
      for (let i = 0; i < hasManyFields.length; i++) {
        let url = `${modelConfig['type']}/${model.pk}/relationships/${hasManyFields[i].relationship}/`;
        let pointer = [];
        let typeToSend = modelConfig['type'];

        /*
           Check if we don't have a different type in the backend
           That property is the "resource_name" that can be set on the ViewSet
           or in the Model. In the case of updating relationships, the resouce_name
           has to be set in the model, if it is not set, the code will get the model
           name to use as "resource_name". Some models we cannot change, such as Permission and Group
           which are built in Djangos code and there is no way to override those models.
           Because of that we have an additional configuration <backendResourceName> in the angular
           model where we can set this name.
         */
        /*
        if (typeof extraOptions[hasManyFields[i].propertyName]['backendResourceName'] !== 'undefined') {
          typeToSend = extraOptions[hasManyFields[i].propertyName]['backendResourceName'];
        }
        if (typeof model[hasManyFields[i].propertyName] !== 'undefined') {
          for (let j = 0; j < model[hasManyFields[i].propertyName].length; j++) {
            pointer.push({
              id: model[hasManyFields[i].propertyName][j].pk,
              type: typeToSend
            });
          }
        }*/
        let body: any = {
          data: null // TODO: Improve this
        };
        this.http.patch(url, body, { headers: this.buildHttpHeaders() }).subscribe(
          (r) => {
            if (i + 1 == hasManyFields.length) {
              observe.complete();
            } else {
              observe.next(r);
            }
          });
      }
    });
  }

  //protected buildUrl<T extends JsonApiModel>(
  //  modelType: ModelType<T>,
  //  params?: any,
  //  id?: string,
  //  customUrl?: string
  //): string {
  //  // TODO: use HttpParams instead of appending a string to the url
  //  const queryParams: string = this.toQueryString(params);
  //
  //  if (customUrl) {
  //    return queryParams ? `${customUrl}?${queryParams}` : customUrl;
  //  }
  //
  //  const modelConfig: ModelConfig = Reflect.getMetadata('JsonApiModelConfig', modelType);
  //
  //  const baseUrl = modelConfig.baseUrl || this.datastoreConfig.baseUrl;
  //  const apiVersion = modelConfig.apiVersion || this.datastoreConfig.apiVersion;
  //  const modelEndpointUrl: string = modelConfig.modelEndpointUrl || modelConfig.type;
  //
  //  const url: string = [baseUrl, apiVersion, modelEndpointUrl, id].filter((x) => x).join('/');
  //
  //  return queryParams ? `${url}?${queryParams}` : url;
  //}

}
