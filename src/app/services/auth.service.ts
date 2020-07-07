import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authStateChanged : Subject<string> = new Subject<string>();

  constructor(private http : HttpClient) { }

  login(email : string, password : string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // POST request to server with email and password

        // Get response from server
        let validCredentials = (email === 'admin@wissen.com' && password === '123')
        
        // Check response and return
        if(validCredentials) {
          sessionStorage.setItem('email',email);
          this.authStateChanged.next(email);
          // let token = 'Bearer '+ response.token;
          // sessionStorage.setItem('token', token);
        }
        resolve(validCredentials);
      }, 1000);
    });
  }

  userLoggedIn() {
    let user = sessionStorage.getItem('email');
    return user;
  }

  logout() {
    sessionStorage.removeItem('email');
    this.authStateChanged.next(null);
  }
}
