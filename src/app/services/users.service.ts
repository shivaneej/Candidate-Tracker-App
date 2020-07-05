import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends DataService{

  constructor(http: HttpClient) { 
    let url = 'http://localhost:3000/recruiters';  
    super(url, http);
  }
}

