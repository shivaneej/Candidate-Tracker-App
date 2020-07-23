import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import groupBy from '../helper';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataLoading : boolean = false;
  rolesLoading : boolean = false;
  usersByRole;
  rolesToDisplay : Role[];
  columnHeader = { 'name': 'Name', 'email': 'Email', 'contact' : 'Contact' };


  constructor(private usersService : UsersService, 
    private roleService : RoleService,
    private authService : AuthService, private ref: ChangeDetectorRef, private snackbar : MatSnackBar) {}

  ngOnInit(): void {
    this.dataLoading = true;
    this.rolesLoading = true;
    this.ref.detectChanges();
    let currentRole = this.authService.userLoggedIn().role; 
    let role : Role = new Role(currentRole.role, currentRole.roleString, currentRole.heirarchyLevel)
    this.roleService.rolesToDisplay(role).subscribe(roles => {
      this.rolesToDisplay = roles;
      this.rolesLoading = false;
    }, err => {
      this.rolesLoading = false;
      this.snackbar.open("Could not fetch data", "Dismiss", { duration : 2000 });
    });
    this.usersService.getAll().pipe(
      map((users : any) => {
        return users.map((user) => {
            let name = user.firstName + " " + user.lastName;
            let role = user.role.roleString;
            return new SystemUser(user.id, name, user.email, role, user.contact, user.isActive);
        })
      }
    ))
    .subscribe(users => {
      this.usersByRole = groupBy(users, ( x: SystemUser ) => x.role);
      this.dataLoading = false;
    }, (error) => {
        this.dataLoading = false; 
        this.snackbar.open("Could not fetch data", "Dismiss", { duration : 2000 });
    });
  }
}
