import { Injectable } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';

import { WebAngularDataStore } from './WebAngularDataStore.service';

import { JsonApiModel, JsonApiQueryData } from 'angular2-jsonapi';

import { WebAngularSmartTableDataSourceOptions } from './WebAngularSmartTableDataSourceOptions';

import { map } from 'rxjs/operators';

@Injectable()
export class WebAngularSmartTableDataSource extends LocalDataSource  {
	public conf;
	protected meta: any = null;


	constructor(
		private datastore: WebAngularDataStore, 
		private model, 
		conf: WebAngularSmartTableDataSourceOptions | {} = {}
	){
		super();
		this.conf = new WebAngularSmartTableDataSourceOptions(conf);
	}

	get smartTableSettings(){
		return this.conf.smartTableSettings;
	}

	getElements(): Promise<any> {

		let findOptions: any = this.buildFilterOptions();
		findOptions.page = this.buildPageOptions();
		
		return this.datastore.findAll(this.model, findOptions).pipe(map(res => {
			this.meta = res.getMeta();
			this.data = res.getModels();

			return this.data;
		})).toPromise();
	}


	protected buildPageOptions(){
		let options = {};

		if (this.pagingConf['page'] !== 'undefined'){
			options[this.conf.pagerPageKey] = this.pagingConf['page'];
		}

		if (this.pagingConf['perPage'] !== 'undefined'){
			options[this.conf.pagerLimitKey] = this.pagingConf['perPage'];
		}

		return options;
	}

	buildFilterOptions(){
		let filters = {};

		for (let i=0; i < this.filterConf.filters.length; i++){
			//filters[this.filterConf.filters[i].field + '__contains'] = this.filterConf.filters[i].search;
			if( this.filterConf.filters[i].search ){
				filters[this.filterConf.filters[i].field] = this.filterConf.filters[i].search;
			}
			
		}
		
		return filters;
	}

	count(): number{
		if (this.meta != null){
			if (typeof this.meta['meta']['pagination'] !== 'undefined'){	
				return this.meta.meta.pagination.count;
			}
		}
		return 0;
	}




}