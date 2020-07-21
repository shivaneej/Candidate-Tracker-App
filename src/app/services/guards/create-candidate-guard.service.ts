import { Injectable } from '@angular/core';
import { ResourceAccess } from './resource-access-guard.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { RoleService } from '../role.service';
import { CANDIDATE_PERMISSION } from './permissions';

@Injectable({
  providedIn: 'root'
})
export class CreateCandidateGuard extends ResourceAccess {

  constructor(auth : AuthService, router : Router, roleService : RoleService) { 
    super(auth, router, roleService, CANDIDATE_PERMISSION.create, '/candidates');
  }
}
