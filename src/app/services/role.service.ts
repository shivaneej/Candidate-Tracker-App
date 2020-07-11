import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DataService {
  _roles : any = [];
  
  constructor(http: HttpClient) {  
    super('http://localhost:8080/roles', http);
  }

  rolesToDisplay(role : any) {
    return this.getAll().pipe(
      map((roles : any)=> {
        let filteredData = roles.filter(r => {
            return r.heirarchyLevel > role.heirarchyLevel
        });
        return filteredData.sort((a, b) => (a.heirarchyLevel > b.heirarchyLevel) ? 1 : -1); 

      }) 
    );
  }
}
