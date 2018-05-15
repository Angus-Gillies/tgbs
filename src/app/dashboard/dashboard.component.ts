import {Component, HostBinding, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { WeekDatesService } from '../core/week-dates.service';

import { WeekCardComponent } from '../week-card/week-card.component';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/retry';


import { Cards } from '../core/animations';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    Cards

  ]
})
export class DashboardComponent implements OnInit {

  @HostBinding('@cards') public cards = true;

  public currentUser: any;
  public golfers: any;

  weekBeginning = [];


  constructor(private route: ActivatedRoute,
              afs: AngularFirestore,
              public auth: AuthService,
              public userService: UserService,
              private weeks: WeekDatesService) {

    this.weekBeginning = this.weeks.weeksBeginning;
  }

  ngOnInit() {


    this.userService.user.subscribe((user) => {
        this.currentUser = user;
        console.log('currentUser set from userService.');
      },
      error => {  //  error returned
        console.log('Error reading user from userService');
        Observable.throw(error);
      },
      () => { // observable completed
        console.log('Subscription userService Completed');
      });

    console.log('currentUser set to: ', this.currentUser);

    this.userService.golfers.subscribe((golfers) => {
      this.golfers = golfers;
      console.log('users retrieved from userService');
    });

  //   this.auth.userDetails.subscribe(
  //     result => {
  //     console.log(result);
  //   },
  //     error => {  //  error returned
  //       Observable.throw(error);
  //     },
  //     () => { // observable completed
  //       console.log('Subscription to auth.user Completed');
  //     });

   }




}
