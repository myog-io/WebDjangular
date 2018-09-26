import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ViewEncapsulation} from "@angular/core";


@Component({
    selector: 'ngx-pudim',
    styleUrls: [
        './pudim.component.scss'
    ],
    templateUrl: './pudim.component.html'
})

export class PudimComponent implements OnInit{
    public data: any;
    constructor(private router: Router) {
    
    }

    ngOnInit(){

        console.log("INSIDE PUDIM",this.data);
    }

}

