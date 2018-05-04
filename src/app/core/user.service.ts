import { Injectable, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface User {
  uid: string;
  displayName: string;
  email: string;
  memNo: number;
  avail: string;
}


@Injectable()
export class UserService implements OnInit {

  private userCollection: AngularFirestoreCollection<User>;
  public user: Observable<User[]>;

  private golfersCollection: AngularFirestoreCollection<User>;
  public golfers: Observable<User[]>;


  constructor(public authService: AuthService, private afs: AngularFirestore) {
   console.log('UserService Running...');
  }


  ngOnInit() {
    this.userDetails();
    this.getGolfersDetails();
  }

  userDetails() {
    if (this.authService.authState != null && this.authService.authState.length === 0 ) {
      this.authService.authState.uid = 0;
    }

    if ( this.authService.authState == null ) {
      this.user = Observable.of(null);
    }

    if (this.authService.authState != null) {
      this.userCollection = this.afs.collection<User>('users', ref => ref.where('uid', '==', this.authService.authState.uid));
      this.user = this.userCollection.valueChanges();
    }
    return this.user;
  }

  getGolfersDetails() {
    this.golfersCollection = this.afs.collection<User>('users');
    this.golfers = this.golfersCollection.valueChanges();
    return this.golfers;
  }

  get userID() {
    return this.authService.currentUserId;
  }

  // get userDetails() {
  //   this.userCol = this.afs.collection('users', ref => ref.where('uid', '==', '' + this.user.uid + ''));
  //   this.users = this.userCol.valueChanges();
  //   return this.users;
  // }
  //
  // get currentUserState() {
  //   if (this.authService.authState != null) {
  //     this.userState = this.authService.authState;
  //      return this.userState;
  //   }
  // }
  //
  // get currentUserId(): string {
  //   if (this.isLoggedIn) {
  //     this.user.uid = this.authService.authState.uid;
  //   }
  //   return this.user.uid;
  // }


}
