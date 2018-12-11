import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { Theme } from "@webdjangular/core/interfaces";
import 'rxjs/add/operator/map';
import { UrlSegment } from '@angular/router';
import { WebAngularDataStore } from './WebAngularDataStore.service';
import { PageModel } from '@webdjangular/core/cms-models';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { ClientUserService } from './client-user.service';

@Injectable({
  providedIn: 'root',
})
export class WDAConfig {

  private locale_list: object;
  private locale_active: string;
  private plugins: object;
  private theme: Theme;


  constructor(private http: HttpClient,
    private datastore: WebAngularDataStore,
    private clientUser: ClientUserService) {

  }

  public WDAInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get('/api/core_init/').subscribe(
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

  public getThemePath() {
    //return '@webdjangular/themes/clean#ThemesCleanModule'
    //console.log(this.theme);
    //return "../../../../../libs/themes/clean/src/index.ts#ThemesCleanModule"
    return '@webdjangular/themes/' + this.theme.slug + '#' + this.theme.angular_module;
    //return "../../../themes/" + this.theme.slug + "/" + this.theme.slug + ".module#" + this.theme.angular_module;
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

  /* DOING HERE FOR NOW, NOT SURE WHERE SHOULD BE THE CORRECT PLACE */
  public getHome(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(PageModel, { slug: 'home' }).subscribe(
        (response: JsonApiQueryData<PageModel>) => {
          let models = response.getModels();
          let page: PageModel = models[0];
          resolve(page);
        },
        (error: any) => {
          reject(error);
        }
      )
    });
  }

  public getPage(path: UrlSegment[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(PageModel, { slug: path.join('|') }).subscribe(
        (response: JsonApiQueryData<PageModel>) => {
          let models = response.getModels();
          resolve(models[0]);
        },
        (error: any) => {
          reject(error);
        }
      )
    });
  }

}
