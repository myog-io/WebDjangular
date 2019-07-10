/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NB_AUTH_OPTIONS, NbTokenService } from '@nebular/auth';
import { getDeepFromObject } from '../helpers';
import { NbAuthService } from '@nebular/auth';

@Component({
  selector: 'webdjangular-logout',
  templateUrl: './logout.component.html'
})
export class NbLogoutComponent implements OnInit {
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    protected service: NbAuthService,
    protected tokenService: NbTokenService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router
  ) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.tokenService.clear().subscribe(result => {
      return this.router.navigate(['auth', 'login']);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
