import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form;
  roleOptions;
  user;
  selectedRole;
  options: string[] = [];
  filteredOptions: Observable<string[]>;
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

  ngOnInit(): void {
    this.filteredOptions = this.managerEmail.valueChanges
      .pipe(
        startWith(''),
        map((value : string) => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  save() {
    this.usersService.save(this.form.value);
    this.router.navigateByUrl('/users');
  }

  toggleEdit() {
    if(!this.canEditManager){
      this.managerEmail.disable();
      this.managerEmail.setValue(this.user.email);
    }
    else {
      this.managerEmail.enable();
      this.managerEmail.reset();
      this.options = this.usersService.getByRole(this.selectedRole);
    }
  }
  
  get canEditManager() {
    let currentRoleIndex = this.roleService._roles.indexOf(this.user.role);
    if (currentRoleIndex >= 2) return false;
    let selectedRoleIndex = this.roleService._roles.indexOf(this.selectedRole);
    return (selectedRoleIndex - currentRoleIndex) > 1 ;
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

}
