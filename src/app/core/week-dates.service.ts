import { Injectable, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { format, startOfWeek, addDays } from 'date-fns';
import {User} from './user.service';
import {AuthService} from './auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {store} from '@angular/core/src/render3/instructions';

export interface Week {
  weekBeginning: any;
  course: string;
  teeDate: any;
  teeTime: string;
  days: Array<string>;
  Monday: Array<string>;
  Tuesday: Array<string>;
  Wednesday: Array<string>;
  Thursday: Array<string>;
  Friday: Array<string>;
  Saturday: Array<string>;
  Sunday: Array<string>;
}
export interface WeekID extends Week {
  id: string;
}


@Injectable()
export class WeekDatesService implements OnInit {

  private weekCollection: AngularFirestoreCollection<Week>;
  public week: Observable<Week[]>;

  private weekDocument: AngularFirestoreDocument<Week>;
  public weekDoc: Observable<Week[]>;


 private currentDate = new Date().getTime();
 private nextWeek: any = '';
 public weeksBeginning = [];
 public weekBeginning: any = '';


  constructor(public authService: AuthService, private afs: AngularFirestore) {
    this.getWeekCollectionDetails();
    this.getWeeks(this.currentDate);
    this.checkWeekExists(this.weeksBeginning, this.week);
  }

  ngOnInit() {

  }

  getWeekCollectionDetails() {
    this.weekCollection = this.afs.collection<Week>('week', ref => ref.orderBy('weekBeginning', 'desc').limit(3));
    this.week = this.weekCollection.snapshotChanges()
      .map(actions => {
        actions.sort((a,b) => {
          return a < b ? -1 : 1;
        });
        return actions.map(a => {
          const data = a.payload.doc.data() as Week;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    return this.week;
  }


  checkWeekExists(currentWeeks, storedWeeks) {
    console.log('CurrrentWeeks are: ' + currentWeeks);
    if (currentWeeks) {
      let formattedStoredElement;
      let storedweeks = [];
      let storedFormatedDates = [];
      storedWeeks.subscribe(
        values => {
          values.forEach(function (storedWeekElement) {
            console.log( storedWeekElement );
            formattedStoredElement = format(storedWeekElement.weekBeginning.seconds * 1000, 'dddd Do MMMM');
            storedWeekElement.formattedDate = format(storedWeekElement.weekBeginning.seconds * 1000, 'dddd Do MMMM');
            storedFormatedDates.push(formattedStoredElement);
            storedweeks.push([{'format': storedWeekElement.formattedDate}, {'seconds' : storedWeekElement.weekBeginning.seconds}]);
          });

          let weekDoesNotExist = currentWeeks.filter(function (n) {
              return !this.has(n);
            },
            new Set(storedFormatedDates));

          console.log("This week doesn't exist: " + weekDoesNotExist);

          // create a new Week document if one does not exist in Firestore
          if (weekDoesNotExist.length > 0 && currentWeeks.length >= values.length) {
            this.createWeekDocument(weekDoesNotExist);
          }
        }
      );
    }

  }


  createWeekDocument (weekbeginning) {

    // reformat date for firebase entry
    const regex = /(\d+)(st|nd|rd|th)/i;
    let stringDate = weekbeginning[0];
    let d = new Date();
    const year = d.getFullYear();
    const space = ' ';
    const dayMonth = stringDate.replace(regex, "$1");
    const convertedDate = dayMonth.concat(space, year);
    const timeStamp = new Date(convertedDate);

    this.afs.collection<Week>('week').add({
      weekBeginning: timeStamp,
      course: 'TBC',
      teeDate: timeStamp,
      teeTime: 'TBC',
      Monday: [],
      Tuesday: [],
      Wednesday:[] ,
      Thursday: [],
      Friday: [],
      Saturday:[] ,
      Sunday: [],
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    })
      .catch(function(error) {
        console.error('Error adding document: ', error);
      });
  }




  getWeeks(currentDate) {
    this.weekBeginning = startOfWeek(new Date(currentDate), {weekStartsOn: 0});
    let formatted = format(this.weekBeginning, 'dddd Do MMMM');
    this.weeksBeginning.push(formatted);

    let count = 1;
    for (let _i = 0; _i < 2; _i++) {
      this.nextWeek = addDays(this.weekBeginning, 7 * count);
      formatted = format(this.nextWeek, 'dddd Do MMMM');
      this.weeksBeginning.push(formatted);
      count++;
    }
    return this.weeksBeginning;
  }
}
