import { JsonApiModel, JsonApiQueryData } from 'angular2-jsonapi';

export class ModelPaginatorControls{

	currentPage: number = 1;
    totalPages: number = 1;
    totalEntries: number = 0;
    pageSize: number = 10;

    unparsedPaginatorMeta = null;
    entries = [];

    options = {};

    initControls(options){
    	this.options = options;

        if (this.options['pageSize'] !== 'undefined'){
            this.pageSize = this.options['pageSize'];
        }
        
    	this.makeQuery();
    }

    makeQuery(){
    	if (typeof this.options['useDatastore'] !== 'undefined'){
    		if (typeof this.options['useDatastore']['findAll'] !== 'undefined'){
    			this.options['useDatastore'].findAll(this.options['modelToPaginate'], {
		    		page: {
		    			size: this.pageSize,
		    			number: this.currentPage
		    		}
		    	}).subscribe(
		            (r: JsonApiQueryData<JsonApiModel>) => {
		                this.updatePaginationControls(r.getMeta(), r.getModels());
		            }
		        );
    		}
    	}
    }

    updatePaginationControls(returnMeta, returnEntries){
    	this.unparsedPaginatorMeta = returnMeta;
    	this.entries = returnEntries;

    	if (typeof this.unparsedPaginatorMeta['meta'] !== 'undefined'){
    		if (typeof this.unparsedPaginatorMeta['meta']['pagination'] !== 'undefined'){
    			this.totalPages = this.unparsedPaginatorMeta['meta']['pagination']['pages'];
    			this.totalEntries = this.unparsedPaginatorMeta['meta']['pagination']['count'];
    			this.currentPage = this.unparsedPaginatorMeta['meta']['pagination']['page'];
    		}
    	}
    }


    getCount(){
    	return this.totalEntries;
    }

    getCurrentPage(){
    	return this.currentPage;
    }

    getTotalPages(){
    	return this.totalPages;
    }

    getPagesArray(){
    	let a = [];
    	for(let i=0; i < this.getTotalPages(); i++){
    		a.push(i+1);
    	}
    	return a;
    }

    isCurrentPage(page=1){
    	if( page == this.getCurrentPage()){
    		return true;
    	}

    	return false;
    }

    hasNextPage(){
    	if (this.totalPages > this.currentPage){
    		return true;
    	}

    	return false;
    }

    hasPrevPage(){
    	if (this.currentPage > 1){
    		return true;
    	}

    	return false;
    }

    changePage(page=1){
    	if (page > 0 && page <= this.getTotalPages()){
    		this.currentPage = page;
    		this.makeQuery();
    	}
    }

    getEntries(){
    	return this.entries;
    }
}