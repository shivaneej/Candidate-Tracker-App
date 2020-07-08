import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from './role.service';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthGuard {

  constructor(private auth : AuthService, private router : Router, private roleService : RoleService) { }

  canActivate(route, state : RouterStateSnapshot) {
    let role = this.auth.userLoggedIn().role;
    let roles = this.roleService._roles;
    if(roles.indexOf(role) <= 2)
      return true;
    this.router.navigate(['/dashboard']);
    return false;
  }
}
