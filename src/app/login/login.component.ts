import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form;
  authPending : boolean = false;
  hide : boolean = true;
  @ViewChild(FormGroupDirective) formDirective;

  constructor(
    private builder: FormBuilder, 
    private router : Router, 
    private route : ActivatedRoute,
    private authService : AuthService,
    private snackBar: MatSnackBar ) {
      // let emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
      this.form = builder.group({
        email : ['', [ Validators.required, Validators.email]],
        password : ['', Validators.required],
      })
  }

  get email(){
    return this.form.get('email');
  }

  get password(){
    return this.form.get('password');
  }

  async login() {
    this.authPending = true;
    let authStatus : any = await this.authService.login(this.email.value, this.password.value);
    this.authPending = false;
    if(authStatus.code !== 200){
      this.formDirective.resetForm();
      let errorMessage = "Something went wrong";
      switch(authStatus.code) {
        case 401 : 
          errorMessage = "Invalid credentials";
          break;
        case 403 : 
          errorMessage = "Account disabled";
          break;
      }
      this.snackBar.open(errorMessage, "Dismiss", { duration: 2000 });
    } else {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      this.router.navigateByUrl(returnUrl);
    }
  }


  ngOnInit(): void {
  }

}
