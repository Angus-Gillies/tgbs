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
import {st} from '@angular/core/src/render3';





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
  WeeksData: any;
  user: any;
  currentWeeks: any = this.getWeeks();
  checked = false;
  selectedDay: any = [];
  sliderWeek: number;
  sliderDay: number;


  // slide toggle code

  play = [false,false,false,false,false,false,false,
    false,false,false,false,false,false,false,
    false,false,false,false,false,false,false];

  playObj: any = {
    0 : {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    },
    1 : {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    },
    2 : {
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    }

  };

  playObj2 = [
    {name:'week0Day0'},
    {name:'week1Day1'}
    ];

  playObjTest = {
    week0 : {
      'Sunday': false,
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false
    },
    week1 : {
      'Sunday': false,
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false
    },
    week2 : {
      'Sunday': false,
      'Monday': false,
      'Tuesday': false,
      'Wednesday': false,
      'Thursday': false,
      'Friday': false,
      'Saturday': false
    }

  };

  ngOnChanges( changes: SimpleChanges) {
    this.user = this.currentUser;

   // this.WeeksData = this.subscribeToWeeks(this.weeks);

    console.log(this.WeeksData);

    if (this.user) {
      this.setToggles(this.currentWeeks, this.user[0].displayName);
    }

  }


  subscribeToWeeks(weeks) {
    const weekArray = [];
    weeks.subscribe(
      values => {
        values.forEach(function (storedWeekElement) {
          console.log('here is the weeks: ' + storedWeekElement );
          return weekArray.push(storedWeekElement);
        });
      }
    );
  }



  getWeeks() {
    this.weeks.subscribe((week) => {
        const weekArray = [];
        this.currentWeeks = week;
        console.log('currentWeek ' + this.currentWeeks + ' set from week-card component.');
        return weekArray.push(this.currentWeeks);
      },
      error => {  //  error returned
        console.log('Error reading week from week observer');
        Observable.throw(error);
      },
      () => { // observable completed
        console.log('Subscription userService Completed');
      });
  }

  day(index, item){
    return item.id;
  }

  week(index, item){
    return item.weeksBeginning;
  }

  sliderEvent(weekIndex, dayIndex) {
    console.log(weekIndex, dayIndex);
  }

  availChange(playobj, event, sliderWeek, sliderDay) {
    // let index = this.selectedDay.indexOf(playobj.name);
    //
    // if (event.checked) {
    //   if (index === -1) {
    //     this.selectedDay.push(playobj.name);
    //   } else {
    //     if (index !== -1) {
    //       this.selectedDay.splice(index, 1);
    //     }
    //   }
    //   console.log(this.selectedDay);
    // }


    const classes = event.source._elementRef.nativeElement.parentElement.className.split(/[,]/);
    const pickedDay = classes[1];

   const weektimeStamp = parseInt(classes[0], 10);
   let weekTimestamp, weekId, displayName, dayPlayer, nameMatch;

   this.sliderWeek = sliderWeek;
   this.sliderDay = sliderDay;

   for (let _i = 0; _i < this.currentWeeks.length; _i++) {

     weekTimestamp = this.currentWeeks[_i].weekBeginning.seconds;

      if (weekTimestamp === weektimeStamp) {
        // update firebase
        weekId = this.currentWeeks[_i].id;

        dayPlayer = this.currentWeeks[_i][pickedDay];
        displayName = this.currentUser[_i].displayName;
        nameMatch = dayPlayer.includes(displayName);

        // check if name already exists for that day
        if (nameMatch) {
         dayPlayer.splice( dayPlayer.indexOf(displayName), 1 );
         this.weekService.update(weekId, dayPlayer, pickedDay);
          this.playObj[this.sliderWeek][this.sliderDay] = false;
        } else {
          // Add player to that date
          dayPlayer.push(displayName);
          this.weekService.update(weekId, dayPlayer, pickedDay);
          this.playObj[this.sliderWeek][this.sliderDay] = true;
        }
      }
    }
  }

  setToggles(weeks, user) {

    for (let _w = 0; _w < this.currentWeeks.length; _w++) {

      if (this.currentWeeks[_w].Sunday.length !== 0) {
          if (this.currentWeeks[_w].Sunday.includes(user)) {
            this.playObj[_w][0] = true;
          }
      }

      if (this.currentWeeks[_w].Monday.length !== 0) {
          if (this.currentWeeks[_w].Monday.includes(user)) {
            this.playObj[_w][1] = true;
          }
      }

      if (this.currentWeeks[_w].Tuesday.length !== 0) {
          if (this.currentWeeks[_w].Tuesday.includes(user)) {
            this.playObj[_w][2] = true;
          }
      }

      if (this.currentWeeks[_w].Wednesday.length !== 0) {
        if (this.currentWeeks[_w].Wednesday.includes(user)) {
          this.playObj[_w][3] = true;
        }
      }

      if (this.currentWeeks[_w].Thursday.length !== 0) {
        if (this.currentWeeks[_w].Thursday.includes(user)) {
          this.playObj[_w][4] = true;
        }
      }

      if (this.currentWeeks[_w].Friday.length !== 0) {
        if (this.currentWeeks[_w].Friday.includes(user)) {
          this.playObj[_w][5] = true;
        }
      }

      if (this.currentWeeks[_w].Saturday.length !== 0) {
        if (this.currentWeeks[_w].Saturday.includes(user)) {
          this.playObj[_w][6] = true;
        }
      }
    }


  }




}
