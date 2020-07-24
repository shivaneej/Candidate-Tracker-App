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
  }

  getInterviewers() {
    let url = 'http://localhost:8080/users/interviewers';
    return this.http.get(url);
  }

  getManagers(id) {
    let url = 'http://localhost:8080/users/managers/' + id;
    return this.http.get(url);
  }

  changePassword(oldPassword, newPassword) {
    return new Promise((resolve, reject) => {
      // POST request to server with email and password
      let url = 'http://localhost:8080/users/password/';
      let requestBody = {
        oldPassword : oldPassword,
        newPassword : newPassword
      };
      this.http.put<any>(url, requestBody).toPromise().then((response) => {
        resolve({ code : 200});
      }).catch((error) => {
        resolve({ code : error.status, error : error.error});
      });
    });
  }
}

