import {Injectable} from '@angular/core';
import {Post} from "../models/post";
import {DatastoreService} from "../../../../../webangular/app/@core/data/datastore.service";
import {JsonApiQueryData} from "angular2-jsonapi";

@Injectable({
    providedIn: 'root'
})
export class PostServiceService {

    private posts:Post[] = [];


    constructor(private datastore: DatastoreService) {

    }

    getPosts() {
        this.datastore.findAll(Post,
            {

            }
        ).subscribe(
            (posts: JsonApiQueryData<Post>) => {
                this.posts = posts.getModels();
            },
        );

    }




}
