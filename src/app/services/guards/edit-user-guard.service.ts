import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from '../role.service';
import { USER_PERMISSION } from './permissions';
import { ResourceAccess } from './resource-access-guard.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard extends ResourceAccess{

  constructor(auth : AuthService, router : Router, roleService : RoleService) { 
    super(auth, router, roleService, USER_PERMISSION.write, '/users');
  }
}
