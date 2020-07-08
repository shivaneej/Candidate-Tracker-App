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

  getByRole(role : string) {
    // GET request

    // Temporary
    if(role === 'OPS')
      return ['ops1@aa.com', 'ops2@ba.com', 'ops3@bb.com', 'ops4@ab.com'];
    else if(role === 'Recruiter')
      return ['rec1@aa.com', 'rec2@ba.com', 'rec3@bb.com', 'rec4@ab.com'];
    else if(role === 'Interviewer')
      return ['int1@aa.com', 'int2@ba.com', 'int3@bb.com', 'int4@ab.com'];
  }
}

