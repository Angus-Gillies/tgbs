import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { NotifyService } from './notify.service';

import { Observable } from 'rxjs/Observable';


@Injectable()
export class AuthService implements OnInit {

  authState: any = [];
  isLoggedIn = false;


  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private notify: NotifyService) {
    console.log('authService running');

    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  ngOnInit() {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth;
    });

    console.log('authState is: ', this.authState);
  }




    // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => this.notify.update('Password update email sent', 'info'))
      .catch((error) => this.handleError(error));
  }


  //// Email/Password Auth ////
  emailSignUp(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
      })
      .catch(error => this.handleError(error) );
  }


  emailLogin(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.isLoggedIn = true;
      })
      .catch(error => this.handleError(error) );
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error);
    this.notify.update(error.message, 'error');
  }

  get currentUserName(): string {
    return this.authState['email'];
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : '';
  }
}


