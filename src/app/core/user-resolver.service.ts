import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class UserResolverService implements Resolve<any> {

  constructor(private userService: UserService, private auth: AuthService) {
    console.log('userResolverService running...');
  }

  resolve(route: ActivatedRouteSnapshot) {

    return  this.userService.userDetails().take(1).map(user => {
      if (user) {
        console.log('userResolverService returned... ', user);
        return user;
      }
    });
  }

}
