import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { RegisterComponent } from '../register/register.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { AuthGuard } from './auth.guard.service';

import { AuthResolver } from './auth-resolver.service';
import {UserResolverService} from './user-resolver.service';
import {GolferResolverService} from './golfer-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent, data: {animation: 'home'}, resolve: {auth: AuthResolver, usr: UserResolverService, golfer: GolferResolverService}},
  { path: 'register', component: RegisterComponent, data: {animation: 'register'}, resolve: {auth: AuthResolver, usr: UserResolverService}},
  { path: 'dashboard', component: DashboardComponent, data: {animation: 'dashboard'}, resolve: {auth: AuthResolver, usr: UserResolverService}, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthResolver, UserResolverService]
})

export class AppRoutingModule {}
