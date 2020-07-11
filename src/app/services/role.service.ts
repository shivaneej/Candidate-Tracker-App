import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DataService {
  _roles : Role[] = [];
  
  constructor(http: HttpClient) {  
    super('http://localhost:8080/roles', http);
  }

  rolesToDisplay(role : Role) {
    return this.getAll().pipe(
      map((roles : any) => {
        return roles.map((role) => {
            return new Role(role.role, role.roleString, role.heirarchyLevel)
        })
      }),
      map((roles : Role[])=> {
        let filteredData = roles.filter(r => {
            return r.hierarchy > role.hierarchy
        });
        return filteredData.sort((a, b) => (a.hierarchy > b.hierarchy) ? 1 : -1); 
      }) 
    );
  }
}
