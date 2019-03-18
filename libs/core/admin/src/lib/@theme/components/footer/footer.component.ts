import { Component } from '@angular/core';

@Component({
  selector: 'webdjangular-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"
      >Created with ♥ by
      <b><a href="https://myog.io" target="_blank">MyOG</a></b> 2019</span
    >
    <div class="socials">
      <!--<a href="#" target="_blank" class="ion ion-social-github"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-facebook"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-twitter"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    </div>
  `
})
export class FooterComponent { }
