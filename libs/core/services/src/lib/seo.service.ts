import {Inject, Injectable} from '@angular/core';
import {Meta, MetaDefinition, Title} from "@angular/platform-browser";
import {PageModel} from "@core/cms/src/lib/models";
import {DOCUMENT} from "@angular/common";
import {WDAConfig} from "@core/services/src/lib/wda-config.service";


@Injectable()
export class SEOService {

  private pageMetas: HTMLMetaElement[] = [];
  private linkCanonical: HTMLLinkElement = null;
  private cms_core: any;

  constructor(public meta: Meta,
              public title: Title,
              public wdaConfig: WDAConfig,
              @Inject(DOCUMENT) public document) {
    this.wdaConfig.getCoreConfig('cms_core').then((data) => {
      this.cms_core = data;
    });
  }


  setTitleByPage(page: PageModel) {

    let title: string = '';
    let site_title: string = '';
    let title_separator: string = '';
    let title_placeholder: string = '';

    if (this.cms_core.hasOwnProperty('site_title')) {
      site_title = this.cms_core['site_title'];
    }
    if (this.cms_core.hasOwnProperty('site_title_separator')) {
      title_separator = this.cms_core['site_title_separator'];
    }

    if (page.is_home && !page.seo_title) {
      title_placeholder = `${site_title}`;
    } else {
      if (page.seo_title) {
        title = page.seo_title;
      } else {
        title = page.title;
      }
      if (this.cms_core.hasOwnProperty('site_title_placeholder')) {
        title_placeholder = this.cms_core['site_title_placeholder'].replace('${title}', title)
          .replace('${title_separator}', title_separator)
          .replace('${site_title}', site_title);
      } else {
        title_placeholder = `${title} ${title_separator} ${site_title}`;
      }
    }
    this.title.setTitle(title_placeholder);
  }

  createMetaByPage(page: PageModel) {
    this.resetPageMetas();

    if (page.is_searchable) {
      this.addPageMetaTag({name: 'robots', content: 'INDEX, FOLLOW'});

      let description: string;
      if (page.seo_description) {
        description = page.seo_description;
      } else {
        // TODO: It is not a good seo, maybe warn the admin somehow.
        let div = document.createElement("div");
        div.innerHTML = page.content;
        let text = div.textContent || div.innerText || "";
        text = text.replace(/\s\s+/g, ' ').trim();
        if (text.length > 180) {
          description = `${text.slice(0, 180)}...`;
        } else {
          description = text;
        }
      }
      this.addPageMetaTag({name: 'description', content: description});
      this.setCanonicalURL(window.location.href.split('?')[0]); // TODO: #38 get the right Path Absolute
      this.addPageMetaTag({name: 'og:locate', content: this.wdaConfig.getCurrentLocale()});

      const localeList = this.wdaConfig.getLocaleList();
      for (let locale in localeList) {
        if (localeList[locale] != this.wdaConfig.getCurrentLocale()) {
          this.addPageMetaTag({name: 'og:locale:alternate', content: localeList[locale]});
        }
      }

      // Facebook

      // Twitter
    } else {
      this.addPageMetaTag({name: 'robots', content: 'NOINDEX, NOFOLLOW'});
    }


  }

  private addPageMetaTag(meta: MetaDefinition) {
    this.pageMetas.push(this.meta.addTag(meta));
  }

  private resetPageMetas() {
    if (this.pageMetas.length > 0) {
      while (this.pageMetas.length) {
        let pageMeta = this.pageMetas.pop();
        this.meta.removeTagElement(pageMeta);
      }
    }
  }

  private setCanonicalURL(url) {
    if (this.linkCanonical === null) {
      this.linkCanonical = document.createElement('link');
      this.linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(this.linkCanonical);
    }
    this.linkCanonical.setAttribute('href', url);  // Google and everybody
    this.addPageMetaTag({property: 'og:url', content: url}) // Facebook
  }

  /*

  details:
    noindex - Prevents the page from being indexed.
    nofollow - Prevents the Google bots from following links from this page.
    nosnippet - Prevents a text snippet or video preview from being shown in the search results.
                For video, a static image will be shown instead, if possible.
    noarchive - Prevents Google from showing the Cached link for a page.
    unavailable_after:[date] - Lets you specify the exact time and date you want to stop crawling
                               and indexing of this page.
    noimageindex - Lets you specify that you do not want your page to appear as the referring page
                   for an image that appears in Google search results.
    none - Equivalent to `noindex, nofollow`.

    <meta name="google" content="nositelinkssearchbox" />
    When users search for your site, Google Search results sometimes display a search box specific to your site,
    along with other direct links to your site. This meta tag tells Google not to show the sitelinks search box



  most important meta tag: description
  It is the 160 character snippet used to summarize a web page’s content
    {name: 'description', content: 'description here'}



  facebook/open graph

  The title of the page.
    {property: 'og:title', content: 'title here'}

  The description of the page.
    {property: 'og:description', content: 'description here'}

  The image you want to use when the page is shared.
  min width 300px and min height 200px
  You can have multiples images if you want to show like a gallery
    {property: 'og:image', content: 'path absolute img'}

  The type of object or page: ex article, music.album, video.movie, website
    {property: 'og:type', content: 'website'}




  The location of the information. By default, the locale value is en_US
  and is not needed UNLESS the language is not English or it is outside the United States.
    {property: 'og:locale', content: 'language'}




  <meta charset="utf-8">





  facebook title
  facebook description
  facebook image

  twitter title
  twitter description
  twitter image

   */


  // TODO: #40 improve SEO after the Page Classes is done
  // e.g.: if the page is an article,
  //      og:type = article
  //      article:published_time - datetime - When the article was first published.
  //      article:modified_time  - datetime - When the article was last changed.
  //      article:expiration_time - datetime - When the article is out of date after.
  //      article:author - profile array - Writers of the article.


}
