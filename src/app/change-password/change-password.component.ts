import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PasswordValidators } from './password.validators';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

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
    private router : Router ) {
      this.form = builder.group({
        oldPassword : ['', [ Validators.required ]],
        newPassword : ['', Validators.required],
        confirmPassword : ['', Validators.required],   
      }, { validators: PasswordValidators.passwordsMatch });
  }

  changePassword() {
    this.userService.changePassword(this.oldPassword.value, this.newPassword.value);
    this.router.navigateByUrl('/dashboard');
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
