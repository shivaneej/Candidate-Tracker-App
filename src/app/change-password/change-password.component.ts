import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidators } from './password.validators';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form;
  constructor(
    private builder: FormBuilder, 
    private userService : UsersService,
    private router : Router, 
    private snackbar : MatSnackBar ) {
      this.form = builder.group({
        oldPassword : ['', [ Validators.required ]],
        newPassword : ['', Validators.required],
        confirmPassword : ['', Validators.required],   
      }, { validators: PasswordValidators.passwordsMatch });
  }

  async changePassword() {
    let response : any = await this.userService.changePassword(this.oldPassword.value, this.newPassword.value);
    if(response.code === 200) {
      this.snackbar.open("Password changed successfully", "Dismiss", { duration: 2000 });
      this.router.navigateByUrl('/dashboard');
    } else if(response.code === 400) {
      this.snackbar.open("Old password is incorrect", "Dismiss", { duration: 2000 });
    } else {
      this.snackbar.open(response.error, "Dismiss", { duration: 2000 });
    }
  }

  get oldPassword(){
    return this.form.get('oldPassword');
  }

  get newPassword(){
    return this.form.get('newPassword');
  }

  get confirmPassword(){
    return this.form.get('confirmPassword');
  }


  ngOnInit(): void {
  }

}
