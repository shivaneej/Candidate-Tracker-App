import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  _roles = ['Root', 'Admin', 'OPS', 'Recruiter', 'Interviewer'];
  constructor() { }

  rolesToDisplay(role : string) {
    return this._roles.slice(this._roles.indexOf(role) + 1);
  }
}
