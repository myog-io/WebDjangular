import { Component } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
@Component({
  selector: 'wda-urls',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class UrlsComponent {
    private url = null;
    private domain = null;
    constructor( private route: ActivatedRoute) {
        this.domain = document.location.hostname;
        this.url = document.location.protocol + '//' +  this.domain;
        route.url.subscribe((segments: UrlSegment[]) =>{
            if(segments.length <= 0){
                this.HomePage();
            }else{
                this.LoadPages(segments);
            }
        });
    }

    private HomePage(){
        console.log("YAYYYY WWE SHOULD FIND WHAT's The Content of the Home page");
    }
    private LoadPages(segments: UrlSegment[]){
        console.log("NOW LOAD OTHER FUCKING PAGE",segments);

    }
}
