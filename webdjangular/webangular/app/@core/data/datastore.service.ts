import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {DatastoreConfig, JsonApiDatastore, JsonApiDatastoreConfig} from 'angular2-jsonapi';
import {Post} from "../../../../themes/pudim/angular/blog/models/post";


const config: DatastoreConfig = {
    baseUrl: 'http://localhost:8000/api',
    models: {
        posts: Post
    }
};

@Injectable({
    providedIn: 'root'
})
@JsonApiDatastoreConfig(config)
export class DatastoreService extends JsonApiDatastore {
    constructor(http: HttpClient) {
        super(http);
    }
}

