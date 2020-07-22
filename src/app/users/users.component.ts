import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import groupBy from '../helper';
import { RoleService } from '../services/role.service';
import { AuthService } from '../services/auth.service';
import { Role } from '../models/role';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  dataLoading : boolean = false;
  usersByRole;
  rolesToDisplay : Role[];
  columnHeader = { 'name': 'Name', 'email': 'Email', 'contact' : 'Contact' };


  constructor(private usersService : UsersService, 
    private roleService : RoleService,
    private authService : AuthService) {
      let currentRole = this.authService.userLoggedIn().role; 
      let role : Role = new Role(currentRole.role, currentRole.roleString, currentRole.heirarchyLevel)
      this.roleService.rolesToDisplay(role).subscribe(roles => {
        this.rolesToDisplay = roles;
      });
  }

  ngOnInit(): void {
    this.dataLoading = true;
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
    });
  }
}
