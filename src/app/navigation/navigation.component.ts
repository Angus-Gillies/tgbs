import {Component, OnInit, Inject, HostBinding} from '@angular/core';


import { AuthService } from '../core/auth.service';
import { UserService } from '../core/user.service';
import { MatDialog } from '@angular/material';


import { LoginFormDialogComponent } from '../login-form-dialog/login-form-dialog.component';





@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],


})
export class NavigationComponent implements OnInit {




 public currentUser: any;


  constructor(public auth: AuthService, public userService: UserService, public dialog: MatDialog) {

  }

  ngOnInit() {
    if (this.userService.user) {
      this.userService.user.subscribe((user) => {
        this.currentUser = user;
      });
    }

    // this.currentUser = this.userService.userDetails;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginFormDialogComponent, {  });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  signOut() {
    this.auth.signOut();
  }







}


