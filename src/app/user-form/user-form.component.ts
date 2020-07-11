import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleService } from '../services/role.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { USER_PERMISSION } from '../services/guards/permissions';

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
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  constructor( private builder: FormBuilder, 
    private usersService : UsersService,
    private router : Router, 
    private authService : AuthService,
    private roleService : RoleService,
    private snackBar: MatSnackBar ) { 
    
    this.user = this.authService.userLoggedIn();
    this.roleOptions = this.roleService.rolesToDisplay(this.user.role.roleString);
    let pattern = "^(\\+\\d{1,3}[- ]?)?0?[7-9]{1}\\d{9}$";
    this.form = builder.group({
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      email : ['', [ Validators.required, Validators.email]],
      contact : ['', [Validators.required, Validators.pattern(pattern)]],
      role : ['', Validators.required],
      manager : [this.user.email, [Validators.required, Validators.email]],
    });
    if(!this.canEditManager)
      this.manager.disable();
  }

  ngOnInit(): void {
    this.filteredOptions = this.manager.valueChanges
      .pipe(
        startWith(''),
        map((value : string) => this._filter(value)),
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value?.toLowerCase();
    return this.options.filter(option => option.email.toLowerCase().includes(filterValue));
  }

  save() {
    let processedFormData = this.processManagerData(this.form.value, this.options);
    if(processedFormData === null) {
      this.snackBar.open("Could not create user", "Dismiss", {
        duration: 2000,
      });
      return;
    }    
    this.usersService.save(processedFormData);
    this.router.navigateByUrl('/users');
  }

  processManagerData(formData, options) {
    let manager = options.filter(m => {
      return m.email === formData.manager;
    });
    if(!manager[0]) return null;
    let processedFormData = Object.assign({}, formData);
    processedFormData.manager = manager[0].id;
    return processedFormData;
  }

  toggleEdit() {
    if(!this.canEditManager){
      this.manager.disable();
      this.manager.setValue(this.user.email);
    }
    else {
      this.manager.enable();
      this.manager.reset();
      this.usersService.getByRole(this.selectedRole).subscribe(options => {
        this.options = options as any;
      });
    }
  }
  
  get canEditManager() {
    if(!USER_PERMISSION.writeManager.includes(this.user.role.roleString)) return false;
    let currentRoleIndex = this.roleService._roles.indexOf(this.user.role.roleString);
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
  get manager() {
    return this.form.get('manager');
  }

}
