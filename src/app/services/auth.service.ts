import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authStateChanged : Subject<any> = new Subject<any>();

  constructor(private http : HttpClient) { }

  login(email : string, password : string) {
    return new Promise((resolve, reject) => {
      // POST request to server with email and password
      let url = 'http://localhost:8080/authenticate'; 
      let requestBody = {
        username : email,
        password : password
      };
      this.http.post<any>(url, requestBody).toPromise().then((response) => {
        let token = 'Bearer '+ response.token;
        localStorage.setItem('token', token);

        let user = response.user;
        localStorage.setItem('user', JSON.stringify(user));
        this.authStateChanged.next(user);
        resolve({ code : 200});
      }).catch((error) => {
        resolve({ code : error.status});
      });
    });
  }

  userLoggedIn() {
    let user = JSON.parse(localStorage.getItem('user'));
    return user;
  }

  userToken() {
    let token = localStorage.getItem('token');
    return token;
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.authStateChanged.next(null);
  }
}
