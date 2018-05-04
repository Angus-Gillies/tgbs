import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthResolver implements Resolve<any> {

  constructor( public afAuth: AngularFireAuth, private authService: AuthService) {
    console.log('authResolverService running...');
  }

    resolve(route: ActivatedRouteSnapshot) {
    return  this.authService.afAuth.authState.take(1).map(auth => {
      if (auth) {
        console.log('authResolverService returned...', auth);
        return auth;
      }
      });
    }

}
