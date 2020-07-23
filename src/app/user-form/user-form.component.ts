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
import { Role } from '../models/role';
import { getRoleParent } from '../helpers/role-helper';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  form;
  roleOptions : Role[];
  user;
  selectedRole : Role;
  options: any[] = [];
  filteredOptions: Observable<string[]>;
  allRoles : Role[] = [] ;
  responsePending : boolean = false;
  constructor( private builder: FormBuilder, 
    private usersService : UsersService, private authService : AuthService, private roleService : RoleService,
    private router : Router, private snackBar: MatSnackBar ) { 
    
    this.user = this.authService.userLoggedIn();
    let currentRole = this.user.role;
    let role : Role = new Role(currentRole.role, currentRole.roleString, currentRole.heirarchyLevel)
    this.roleService.rolesToDisplay(role).subscribe(roles => { this.roleOptions = roles });
    this.roleService.getAll().pipe(
      map((roles : any) => {
        return roles.map((role) => new Role(role.role, role.roleString, role.heirarchyLevel))
      }),
    ).subscribe((roles : Role[]) => {
      this.allRoles = roles;
    });
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

  async save() {
    this.responsePending = true;
    let processedFormData = this.processManagerData(this.form.getRawValue(), this.options);
    if(processedFormData === null) {
      this.snackBar.open("Could not create user", "Dismiss", { duration: 2000 });
      return;
    }    
    let response : any = await this.usersService.save(processedFormData);
    this.responsePending = false;
    if(response.code !== 200){
      let errorMessage = "Something went wrong";
      if(response.code === 409) errorMessage = "User already exists";
      else if(response.code === 424) errorMessage = "Could not send confirmation email";
      this.snackBar.open(errorMessage, "Dismiss", { duration: 2000 });
    } else {
      this.snackBar.open("Successfully created user", "Dismiss", { duration: 2000 });
      this.router.navigateByUrl('/users');
    }
  }

  processManagerData(formData, options) {
    let processedFormData = Object.assign({}, formData);
    if(!this.manager.disabled) {
      let manager = options.filter(m => m.email === formData.manager );
      if(!manager[0]) return null;
      processedFormData.manager = { id : manager[0].id };
    } else
      processedFormData.manager = { id : this.user.id };
    processedFormData.role = (processedFormData.role as Role).mapFields();
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
      var selectedRoleParent = getRoleParent(this.allRoles, this.selectedRole);
      this.usersService.getByRole(selectedRoleParent.id).subscribe(options => {
        this.options = options as any;
      });
    }
  }
  
  get canEditManager() {
    if(!USER_PERMISSION.writeManager.includes(this.user.role.roleString)) return false;
    if(this.selectedRole === undefined) return false;    
    var selectedRoleParent = getRoleParent(this.allRoles, this.selectedRole);
    return (this.user.role.heirarchyLevel !== selectedRoleParent.hierarchy);
  }
  
  get firstName() { return this.form.get('firstName') }
  get lastName() { return this.form.get('lastName') }
  get email() { return this.form.get('email') }
  get contact() { return this.form.get('contact') }
  get role() { return this.form.get('role') }
  get manager() { return this.form.get('manager') }
}
