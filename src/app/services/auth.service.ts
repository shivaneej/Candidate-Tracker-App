import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

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
          localStorage.setItem('email', email);
          localStorage.setItem('role', 'Root');
          this.authStateChanged.next(email);
          
          // let token = 'Bearer '+ response.token;
          // localStorage.setItem('token', token);
        }
        resolve(validCredentials);
      }, 1000);
    });
  }

  userLoggedIn() {
    let userEmail = localStorage.getItem('email');
    let userRole = localStorage.getItem('role');
    return { email : userEmail, role : userRole };
  }

  logout() {
    localStorage.removeItem('email');
    this.authStateChanged.next(null);
  }
}
