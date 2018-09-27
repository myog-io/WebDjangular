import {Component, OnInit, ViewContainerRef, ViewChild, ComponentRef, Compiler} from '@angular/core';
import {Router} from "@angular/router";
import {ViewEncapsulation} from "@angular/core";
import { DynamicComponentLoader } from '../../webangular/app/dynamic-component-loader/dynamic-component-loader.service';


@Component({
    selector: 'ngx-pudim',
    styleUrls: [
        './pudim.component.scss'
    ],
    templateUrl: './pudim.component.html'
})

export class PudimComponent implements OnInit{
    public data: any;

    @ViewChild('container', { read: ViewContainerRef })
    container: ViewContainerRef;

    private componentRef: ComponentRef<{}>;

    constructor(private router: Router,
        private componentLoader: DynamicComponentLoader,
        private compiler: Compiler) {
    
    }

    ngOnInit(){

        
        let metadata = {
            selector: `runtime-component-sample`,
            template: this.data.content
        };

        let factory = this.componentLoader.createComponentFactorySync(metadata,null,this.compiler);
        
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
        this.componentRef = this.container.createComponent(factory);

    }

}

