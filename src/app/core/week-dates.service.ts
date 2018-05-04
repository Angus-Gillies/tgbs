import { Injectable, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { format, startOfWeek, addDays } from 'date-fns';



@Injectable()
export class WeekDatesService implements OnInit {

 private currentDate = new Date();
 private nextWeek: any = '';
 public weeks = [];
 public weekBeginning: any = '';

  constructor() {  this.getWeeks(this.currentDate); }

  ngOnInit() {
    // const result = format(new Date(2017, 12, 21), 'DD/MM/YYYY');
    // return result;
  }

  getWeeks(currentDate) {

    const nextWeek: any = '';

    this.weekBeginning = addDays(startOfWeek(new Date(currentDate), {weekStartsOn: 1}), 7);
    let formatted = format(this.weekBeginning, 'dddd Do MMMM');
    this.weeks.push(formatted);

    let count = 1;
    for (let _i = 0; _i < 2; _i++) {
      this.nextWeek = addDays(this.weekBeginning, 7 * count);
      formatted = format(this.nextWeek, 'dddd Do MMMM');
      this.weeks.push(formatted);
      count++;
    }
    return this.weeks;
  }
}
