import {Attribute, JsonApiModel} from 'angular2-jsonapi';
import { Observable } from 'rxjs';

import 'reflect-metadata';
import {applyMixins} from "rxjs/internal-compatibility";

export class SEOModel {

  @Attribute()
  seo_title: string;

  @Attribute()
  seo_description: string;
}
