import { Injectable, OnInit } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { format, startOfWeek, addDays } from 'date-fns';
import {User} from './user.service';
import {AuthService} from './auth.service';

export interface Week {
  weekBeginning: string;
  course: string;
  teeDate: string;
  teeTime: string;
  days: Array<string>;
}
export interface WeekID extends Week{
  id: string;
}


@Injectable()
export class WeekDatesService implements OnInit {

  private weekCollection: AngularFirestoreCollection<Week>;
  public week: Observable<Week[]>;


 private currentDate = new Date();
 private nextWeek: any = '';
 public weeksBeginning = [];
 public weekBeginning: any = '';

  constructor(public authService: AuthService, private afs: AngularFirestore) {
    this.getWeeks(this.currentDate);
  }

  ngOnInit() {
    // const result = format(new Date(2017, 12, 21), 'DD/MM/YYYY');
    // return result;
  }

  getWeekCollectionDetails() {
    this.weekCollection = this.afs.collection<Week>('week');
    this.week = this.weekCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Week;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    return this.week;
  }




  getWeeks(currentDate) {

    const nextWeek: any = '';

    this.weekBeginning = addDays(startOfWeek(new Date(currentDate), {weekStartsOn: 1}), 7);
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
