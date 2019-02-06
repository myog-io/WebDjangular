import { Inject, Injectable, Optional } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/map';
import { UrlSegment } from '@angular/router';
import { WebAngularDataStore } from './WebAngularDataStore.service';
import { JsonApiQueryData } from 'angular2-jsonapi';
import { ClientUserService } from './client-user.service';
import { Theme } from '@core/interfaces/src/lib/theme';
import { PageModel } from '@core/cms/src/lib/models';

@Injectable({
  providedIn: 'root',
})
export class WDAConfig {

  private locale_list: any;
  private locale_active: string;
  private plugins: any;
  private core_config: any;
  private theme: Theme;
  private data: any;
  private loading = false;
  private compleLoading: any = null;
  private website: object;
  public init_url = '/api/core_init/';
  public get_home_url = '/api/page/get_home/';
  public get_page_url = '/api/page/#path#/get_page';
  public include = 'header,footer,layout';

  constructor(
    private http: HttpClient,
    private datastore: WebAngularDataStore,
    private clientUser: ClientUserService,
    @Optional() @Inject('APP_BASE_HREF') baseHref: string,
  ) {

    if (baseHref) {
      this.init_url = `${baseHref}${this.init_url}`;
      this.get_home_url = `${baseHref}${this.get_home_url}`;
      this.get_page_url = `${baseHref}${this.get_page_url}`;
    }
  }

  public WDAInit(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.data) {
        resolve(this.data)
      } else if (this.loading) {
        this.compleLoading = () => {
          resolve(this.data);
        }
      } else {
        this.loading = true;
        // Ading Authorization None to Header to skip JWT AUTH on Public Requests
        this.http.get(this.init_url, { headers: { Authorization: 'none' } }).subscribe(
          (data: any) => {
            this.populateWDAConfig(data.data);
            this.data = data.data;
            this.loading = false;
            if (this.compleLoading) {
              this.compleLoading();
              this.compleLoading = null;
            }
            resolve(data.data);
          },
          (error: any) => {
            /* TODO: error o WDA Init */
            this.loading = false;
            reject(error);
          });
      }
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
    if (data.core_config) {
      this.setCoreConfig(data.core_config);
    }
    if (data.website) {
      this.setWebsiteConfig(data.website);
    }
  }

  public getBaseWebsiteURL() {
    return `${this.website['protocol']}://${this.website['domain']}\/`;
  }

  public getCoreConfig(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.core_config) {
        resolve(this.core_config[name] ? this.core_config[name] : null);
      } else {
        this.WDAInit().then((data) => {
          resolve(this.core_config[name] ? this.core_config[name] : null);
        })
      }
    });
  }

  private setCoreConfig(data) {
    this.core_config = data
  }

  private setWebsiteConfig(data) {
    this.website = data;
  }

  public getTheme() {
    return this.theme;
  }

  public getThemePath() {
    //return '@themes/clean#ThemesCleanModule'
    //console.log(this.theme);
    //return "../../../../../libs/themes/clean/src/index.ts#ThemesCleanModule"
    return '@themes/' + this.theme.slug + '#' + this.theme.angular_module;
    //return "../../../themes/" + this.theme.slug + "/" + this.theme.slug + ".module#" + this.theme.angular_module;
  }

  public applyCustomStyle() {
    let custom_style: string = '';
    if (this.core_config && document) {
      if (this.core_config.hasOwnProperty('cms_core')) {
        if (this.core_config['cms_core']['custom_style']) {
          custom_style = this.core_config['cms_core']['custom_style'];
        }
      }
      if (custom_style) {
        let style: HTMLStyleElement = document.createElement('style');
        style.innerHTML = custom_style;  // TODO: minify .replace(/\t?\n?\s?/gi, '');
        document.head.appendChild(style);
      }
    }
  }

  public applyCustomScript() {
    let custom_script: string = '';
    if (this.core_config && document) {
      if (this.core_config.hasOwnProperty('cms_core')) {
        if (this.core_config['cms_core']['custom_script']) {
          custom_script = this.core_config['cms_core']['custom_script'];
        }
      }
      if (custom_script) {
        let script: HTMLScriptElement = document.createElement('script');
        script.innerHTML = custom_script; // TODO: minify .replace(/\t?\n?\s?/gi, '');
        document.body.appendChild(script);
      }
    }
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
      this.datastore.findRecord(PageModel, null, { include: this.include }, new HttpHeaders({ Authorization: 'none' }),
        this.get_home_url).subscribe(
          (page: PageModel) => {
            page.setHome();
            resolve(page);
          },
          (error: any) => {
            reject(error);
          }
        )
    });
  }

  public getPage(path: UrlSegment[]): Promise<PageModel | any> {
    return new Promise((resolve, reject) => {

      this.datastore.findRecord(PageModel,
        null, { include: this.include }, new HttpHeaders({ Authorization: 'none' }),
        this.get_page_url.replace('#path#', path.join('|'))).subscribe(
          (page: PageModel) => {
            resolve(page);
          },
          (error: any) => {
            reject(error);
          }
        )
    });
  }

  public getErrorPage(errorCode): Promise<any> {
    return new Promise((resolve, reject) => {
      this.datastore.findAll(PageModel, {
        slug: errorCode,
        include: this.include
      }, new HttpHeaders({ Authorization: 'none' })).subscribe(
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


}
