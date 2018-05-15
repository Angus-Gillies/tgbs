import { Component, Compiler } from '@angular/core';
import { routerTransition } from './core/animations';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ]
})


export class AppComponent {
 // public isLoggedIn: Boolean;

  constructor( private _compiler: Compiler, db: AngularFirestore) {
    this._compiler.clearCache();
    const settings: firebase.firestore.Settings = { timestampsInSnapshots: true};
    db.app.firestore().settings(settings);
  }

  prepareRoute(outlet) {
    return outlet.activatedRouteData.animation;
  }



}
