import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService{

  constructor(http: HttpClient) { 
    // let url = 'http://localhost:3000/recruiters'; 
    let url = 'http://localhost:8080/users/'; 
    super(url, http);
  }
}

