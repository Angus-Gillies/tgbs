import { Component, Compiler } from '@angular/core';
import { routerTransition } from './core/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ routerTransition ]
})


export class AppComponent {
 // public isLoggedIn: Boolean;

  constructor( private _compiler: Compiler) {
    this._compiler.clearCache();
  }

  prepareRoute(outlet) {
    return outlet.activatedRouteData.animation;
  }



}
