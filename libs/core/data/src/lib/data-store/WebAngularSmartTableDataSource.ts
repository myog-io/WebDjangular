import { Injectable } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { WebAngularSmartTableDataSourceOptions } from './WebAngularSmartTableDataSourceOptions';
import { map } from 'rxjs/operators';
import { WebAngularDataStore } from '@core/services/src/lib/WebAngularDataStore.service';
import { AbstractModel } from '../models';

@Injectable()
export class WebAngularSmartTableDataSource extends LocalDataSource {
  public conf: WebAngularSmartTableDataSourceOptions;
  public customUrl: string = null;
  public model: any = null;
  protected meta: any = null;

  constructor(private datastore: WebAngularDataStore) {
    super();
  }

  get smartTableSettings() {
    return this.conf.smartTableSettings;
  }

  getElements(): Promise<any> {
    let findOptions: any = this.buildFilterOptions();
    findOptions.page = this.buildPageOptions();
    const model = this.model as AbstractModel;
    findOptions.include = this.model.include;
    if (this.sortConf.length > 0) {
      findOptions.ordering = this.buildSortOptions();
    }

    let fields = Object.keys(this.smartTableSettings.columns);
    findOptions['fields'] = fields.join(',');

    if ('filters' in this.smartTableSettings) {
      let filters = this.smartTableSettings['filters'];
      Object.keys(filters).forEach(key => {
        findOptions[key] = filters[key];
      });
    }

    return this.datastore
      .findAll(this.model, findOptions, null, this.customUrl)
      .pipe(
        map(res => {
          this.meta = res.getMeta();
          this.data = res.getModels();
          return this.data;
        })
      )
      .toPromise();
  }

  protected buildPageOptions() {
    let options = {};

    if (this.pagingConf['page'] !== 'undefined') {
      options[this.conf.pagerPageKey] = this.pagingConf['page'];
    }

    if (this.pagingConf['perPage'] !== 'undefined') {
      options[this.conf.pagerLimitKey] = this.pagingConf['perPage'];
    }

    return options;
  }

  protected buildSortOptions(): string {
    let sorting = [];
    this.sortConf.forEach(fieldConf => {
      if (fieldConf.direction.toUpperCase() == 'DESC') {
        sorting.push('-' + fieldConf.field);
      } else {
        sorting.push(fieldConf.field);
      }
    });
    return sorting.join(',');
  }

  buildFilterOptions() {
    let filters = {};
    for (let i = 0; i < this.filterConf.filters.length; i++) {
      //filters[this.filterConf.filters[i].field + '__contains'] = this.filterConf.filters[i].search;
      if (this.filterConf.filters[i].search) {
        filters[this.filterConf.filters[i].field] = this.filterConf.filters[
          i
        ].search;
      }
    }

    return filters;
  }

  count(): number {
    if (this.meta != null) {
      if (typeof this.meta['meta']['pagination'] !== 'undefined') {
        return this.meta.meta.pagination.count;
      }
    }
    return 0;
  }
}
