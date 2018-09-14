import { Injectable } from '@angular/core'
import {HttpClient} from '@angular/common/http';
import {Theme} from "../interfaces/theme";
import 'rxjs/add/operator/map';


@Injectable({
    providedIn: 'root',
})
export class WDAConfig {

    private locale_list: object;
    private locale_active: string;
    private plugins: object;
    private theme: Theme;


    constructor(private http: HttpClient) {

    }

    public WDAInit(): Promise<any> {
        return new Promise((resolve, reject) => {
             let data = this.http.get('/api/init/').subscribe(
             (data: any) => {
                 this.populateWDAConfig(data.data);
                 resolve(data.data);
             },
             (error: any) => {
                 /* TODO: error on WDA Init */
                 reject(error);
              })
        });



    }

    private populateWDAConfig(data: any) {
        if (data.theme) {
            this.setTheme(data.theme);
        }
        if (data.locale_list) {
            this.setLocaleList(data.locale_list);
        }
        if (data.locale_active) {
            this.setCurrentLocale(data.locale_active);
        }
    }




    public getTheme() {
        return this.theme;
    }

    public getThemePath(){
        return "../../themes/"+ this.theme.name + "/angular/" + this.theme.name  + ".module#"+ this.theme.module;
    }

    public setTheme(data: any) {
        this.theme = new Theme(data);
    }

    public getPlugins() {
        return this.plugins;
    }

    private addPlugin(plugin: any) {

    }

    public getLocaleList() {
        return this.locale_list;
    }

    private setLocaleList(locale_list: any) {
        this.locale_list = locale_list;
    }

    public getCurrentLocale() {
        return this.locale_active;
    }

    public setCurrentLocale(locale: any) {
        /* TODO: make sure the locale is available on locale_list */
        this.locale_active = locale;
        /* TODO: dispatch a event onLocaleChange */
    }



}