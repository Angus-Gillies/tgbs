import {Component, Input, OnChanges, SimpleChanges, SimpleChange} from '@angular/core';

import { WeekDatesService } from '../core/week-dates.service';
import { UserService } from '../core/user.service';
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


  constructor(private weekService: WeekDatesService, private userService: UserService) { }

  weeks = this.weekService.getWeekCollectionDetails();
  dates = this.date;
  weekBeginningDate = this.weekService.weeksBeginning;



  ngOnChanges( changes: SimpleChanges) {

    this.weeks.subscribe(
      values => {
        console.log(values);
        }
    );




    console.log(this.weeks);

    for (const property in changes) {
      if (property === 'currentUser') {
        console.log('Previous:', changes[property].previousValue);
        console.log('Current:', changes[property].currentValue);
        console.log('firstChange:', changes[property].firstChange);
      }
    }

  }



}
