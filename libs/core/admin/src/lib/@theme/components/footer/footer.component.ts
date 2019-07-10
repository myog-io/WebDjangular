import { Component } from '@angular/core';
import { environment } from '@wda-admin/environments/environment';

@Component({
  selector: 'webdjangular-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by"><a href="http://webdjangular.com/" target="_blank">WebDjangular</a> {{ env.version }} | Created with ♥ by
      <b><a href="https://myog.io" target="_blank">MyOG</a></b> 2019</span>
    <div class="socials">
     
      <a href="https://github.com/MyOwnGamesLLC/WebDjangular" target="_blank" class="ion ion-social-github"></a>
      <!--<a href="#" target="_blank" class="ion ion-social-facebook"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-twitter"></a>-->
      <!--<a href="#" target="_blank" class="ion ion-social-linkedin"></a>-->
    </div>
  `
})
export class FooterComponent {
  env = environment
}
