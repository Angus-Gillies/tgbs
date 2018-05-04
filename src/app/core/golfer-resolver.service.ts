import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';


@Injectable()
export class GolferResolverService implements Resolve<any> {

  constructor(private userService: UserService, private auth: AuthService) {
    console.log('userResolverService running...');
  }

  resolve(route: ActivatedRouteSnapshot) {

    return  this.userService.getGolfersDetails().take(1).map(golfer => {
      if (golfer) {
        console.log('userResolverService returned... ', golfer);
        return golfer;
      }
    });
  }

}
