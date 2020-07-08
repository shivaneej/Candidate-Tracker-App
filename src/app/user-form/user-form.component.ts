import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form;
  roleOptions;
  user;
  constructor( private builder: FormBuilder, 
    private usersService : UsersService,
    private router : Router, 
    private authService : AuthService,
    private roleService : RoleService ) { 
    
    this.user = this.authService.userLoggedIn();
    this.roleOptions = this.roleService.rolesToDisplay(this.user.role);
    let pattern = "^(\\+\\d{1,3}[- ]?)?0?[7-9]{1}\\d{9}$";
    this.form = builder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [ Validators.required, Validators.email]],
      contact : ['', [Validators.required, Validators.pattern(pattern)]],
      role : ['', Validators.required],
      managerEmail : [this.user.email, [Validators.required, Validators.email]],
    });
    if(!this.canEditManager)
      this.managerEmail.disable();
  }

  save() {
    this.usersService.save(this.form.value);
    this.router.navigateByUrl('/users');
  }
  
  get canEditManager() {
    return this.roleService._roles.indexOf(this.user.role) < 2;
  }
  get firstName() {
    return this.form.get('firstName');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get email() {
    return this.form.get('email');
  }
  get contact() {
    return this.form.get('contact');
  }
  get role() {
    return this.form.get('role');
  }
  get managerEmail() {
    return this.form.get('managerEmail');
  }

  ngOnInit(): void {
  }

}
