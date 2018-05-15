import { environment } from '../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './core/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { NavigationComponent} from './navigation/navigation.component';
import { LoginFormDialogComponent } from './login-form-dialog/login-form-dialog.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { NotifyService } from './core/notify.service';
import { UserComponent } from './user/user.component';

import { AuthService } from './core/auth.service';
import { AuthResolver } from './core/auth-resolver.service';
import { UserService } from './core/user.service';
import * as firebase from 'firebase';

import { UserResolverService } from './core/user-resolver.service';
import { AuthGuard } from './core/auth.guard.service';
import { GolferResolverService } from './core/golfer-resolver.service';
import { WeekDatesService } from './core/week-dates.service';
import { WeekCardComponent } from './week-card/week-card.component';



@NgModule ({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginFormDialogComponent,
    HomeComponent,
    DashboardComponent,
    RegisterComponent,
    UserComponent,
    WeekCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    LoginFormDialogComponent
  ],
  providers: [
    NotifyService,
    AuthService,
    AuthResolver,
    UserService,
    UserResolverService,
    AuthGuard,
    GolferResolverService,
    WeekDatesService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

