import { Component, OnInit, HostBinding } from '@angular/core';

import { Cards, Bounce } from '../core/animations';

import { AuthService } from '../core/auth.service';
import { WeekDatesService } from  '../core/week-dates.service';
import {UserService} from "../core/user.service";
import {Observable} from "rxjs/Observable";


@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    Cards,
    Bounce
  ]

})
export class HomeComponent implements OnInit {

  @HostBinding('@cards') public bob = true;
  //@HostBinding('@bounce') public bounce = true;
  bounce: any;

  public currentUser: any;
  public golfers: any;
  weekBeginning: any[] = [];

  // public posts: any;

  constructor( public authService: AuthService, public userService: UserService, public weeks: WeekDatesService) {
    this.weekBeginning = this.weeks.weeksBeginning;
  }



  ngOnInit() {

    this.userService.golfers.subscribe((golfers) => {
      this.golfers = golfers;
      console.log('users retrieved from userService');
    });
  }

}
