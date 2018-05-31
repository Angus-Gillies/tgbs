import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Router } from  '@angular/router';
import { Form, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { WeekDatesService } from '../core/week-dates.service';
import { UserService } from '../core/user.service';
import { AuthService } from '../core/auth.service';
import {map} from 'rxjs/operators';
import {forEach} from '@angular/router/src/utils/collection';
import {format} from "date-fns";





@Component({
  selector: 'app-week-card',
  templateUrl: './week-card.component.html',
  styleUrls: ['./week-card.component.css'],
  animations: [

  ]
})
export class WeekCardComponent implements OnChanges {

  @Input() currentUser: any;
  @Input() golfers: any;
  @Input() date: any;


  constructor(private weekService: WeekDatesService,
              private userService: UserService,
              public authService: AuthService,
              private router: Router) { }

  weeks = this.weekService.getWeekCollectionDetails();
  user = this.currentUser;

  getWeeks(weeks) {
    weeks.subscribe(
      values => {
        console.log(values);
        return values;
      }
    );
  }



  // slide toggle code

  play = [false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,
    false,false,false,false,false,false,false];

  day(index, item){
    return item.id;
  }

  week(index, item){
    return item.weeksBeginning;
  }

  availChange(event) {
   const weektimeStamp = event.source._elementRef.nativeElement.parentElement.className;

   console.log(this.weeks);

   let availWeeks = this.getWeeks(this.weeks);

    // this.weeks.subscribe(
    //   values => {
    //     test = values;
    //     console.log(test);
    //   }
    // );

  }



    ngOnChanges( changes: SimpleChanges) {

    this.weeks.subscribe(
      values => {
        console.log(values);
        }
    );


    for (const property in changes) {
      if (property === 'currentUser') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      }
    }
  }





}
