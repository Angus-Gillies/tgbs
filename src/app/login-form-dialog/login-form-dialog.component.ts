import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AuthService } from '../core/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };


@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['./login-form-dialog.component.css']
})
export class LoginFormDialogComponent implements OnInit {

  userForm: FormGroup;
  newUser = true; // to toggle login or signup form
  passReset = false; // set to true when password reset is triggered
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email',
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    },
  };

  // loginForm: FormGroup;
  //
  // isNewUser = true;
  // errorMessage = '';
  // error: {name: string, message: string} = {name: '', message: ''};

  gettingData = false;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public dialogRef: MatDialogRef<LoginFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    // Login Form
    this.buildForm();

    // this.loginForm = this.fb.group({
    //   'email': ['', [
    //     Validators.required,
    //     Validators.email
    //   ]
    //   ],
    //   'password': ['', [
    //     Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
    //     Validators.minLength(6),
    //     Validators.maxLength(25)
    //   ]
    //   ],
    //   'region': ['', [
    //   ]
    //   ],
    // });
  }


  signup() {
    this.authService.emailSignUp(this.userForm.value['email'], this.userForm.value['password']);
  }

  login() {
    this.gettingData = true;
    this.authService.emailLogin(this.userForm.value['email'], this.userForm.value['password'])
      .then( () => {
        this.router.navigate(['/dashboard']);
      }).then( () => {
      this.dialogRef.close();
     // this.gettingData = false;
    } );
  }

  resetPassword() {
    this.authService.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true);
  }


  // clearErrorMessage() {
  //   this.errorMessage = '';
  //   this.error = {name: '', message: ''};
  // }

  // changeForm() {
  //   this.isNewUser = !this.isNewUser;
  // }
  //
  // signOut() {
  //   this.authService.signOut();
  // }
  //
  // onNoClick(): void {
  //   this.dialogRef.close();
  // }


  // onLoginEmail(): void {
  //   this.clearErrorMessage();
  //   if (this.validateForm(this.email.value, this.password.value)) {
  //     this.authService.emailLogin(this.email.value, this.password.value)
  //       .then(() => {
  //         this.gettingData = true;
  //         this.router.navigate(['/dashboard'])
  //           .then(() => {
  //             this.userService.currentUserId;
  //           })
  //           .then(() => {
  //             this.dialogRef.close();
  //             this.gettingData = false;
  //           });
  //       }).catch(_error => {
  //       this.error = _error;
  //       this.router.navigate(['/']);
  //     });
  //   }
  // }

  // Using getters will make your code look pretty
  // get email() { return this.loginForm.get('email'); }
  //
  // get password() { return this.loginForm.get('password'); }

  buildForm() {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
      ]],
    });

    this.userForm.valueChanges.subscribe((data) => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  // Updates validation state on form changes.
  onValueChanged(data?: any) {
    if (!this.userForm) { return; }
    const form = this.userForm;
    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field) && (field === 'email' || field === 'password')) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          if (control.errors) {
            for (const key in control.errors) {
              if (Object.prototype.hasOwnProperty.call(control.errors, key) ) {
                this.formErrors[field] += `${(messages as {[key: string]: string})[key]} `;
              }
            }
          }
        }
      }
    }
  }

  // validateForm(email: string, password: string): boolean {
  //   if (email.length === 0) {
  //     this.errorMessage = 'Please enter Email!';
  //     return false;
  //   }
  //
  //   if (password.length === 0) {
  //     this.errorMessage = 'Please enter Password!';
  //     return false;
  //   }
  //
  //   if (password.length < 6) {
  //     this.errorMessage = 'Password should be at least 6 characters!';
  //     return false;
  //   }
  //
  //   this.errorMessage = '';
  //
  //   return true;
  // }

}


