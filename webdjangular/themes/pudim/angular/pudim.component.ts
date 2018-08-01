import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ViewEncapsulation} from "@angular/core";
import {PostServiceService} from "./blog/services/post-service.service";



@Component({
    selector: 'ngx-pudim',
    styleUrls: [
        './pudim.component.scss'
    ],
    templateUrl: './pudim.component.html'
})

export class PudimComponent implements OnInit{
    constructor(private router: Router,
                private postService: PostServiceService

                ) {
    }

    ngOnInit(){

        this.postService.getPosts();



    }

}

