import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService{

  constructor(http: HttpClient) { 
    let url = 'http://localhost:8080/users/'; 
    super(url, http);
  }

  getByRole(role : string) {
    let url = 'http://localhost:8080/users/role/' + role.toLowerCase();
    return this.http.get(url);
    return of([ 
      { id : 1, email : 'one@wissen.com'}, 
      { id : 2, email : 'two@wissen.com'}, 
      { id : 3, email : 'three@wissen.com' }]);
  }

  changePassword(oldPassword, newPassword) {
    // POST request
    console.log("Change password from " + oldPassword + " to " + newPassword);  
  }
}

