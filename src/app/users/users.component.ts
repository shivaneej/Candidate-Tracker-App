import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // Temporary data
  admins : SystemUser[] = [
    { name: 'Admin 1', email: 'xyz@abc.com' }, 
    { name: 'Admin 2', email: 'xyz@abc.com'} ];
  ops : SystemUser[] = [
    { name: 'OPS 1', email: 'xyz@abc.com' }, 
    { name: 'OPS 2', email: 'xyz@abc.com'},
    { name: 'OPS 3', email: 'xyz@abc.com' }];
  
  recruiters : SystemUser[];
  interviewers : SystemUser[] = [
    { name: 'Int 1', email: 'xyz@abc.com'},
    { name: 'Int 2', email: 'xyz@abc.com' }, 
    { name: 'Int 3', email: 'xyz@abc.com'},
    { name: 'Int 4', email: 'xyz@abc.com'},
    { name: 'Int 5', email: 'xyz@abc.com'},
    { name: 'Int 6', email: 'xyz@abc.com' }, 
    { name: 'Int 7', email: 'xyz@abc.com'},
    { name: 'Int 8', email: 'xyz@abc.com'},
    { name: 'Int 9', email: 'xyz@abc.com'},
    { name: 'Int 10', email: 'xyz@abc.com' }, 
    { name: 'Int 11', email: 'xyz@abc.com'},
    { name: 'Int 12', email: 'xyz@int.com'},
    { name: 'Int 13', email: 'xyz@abc.com'},
    { name: 'Int 14', email: 'xyz@abc.com' }, 
    { name: 'Int 15', email: 'xyz@abc.com'},
    { name: 'Int 16', email: 'xyz@abc.com'}
  ];
  columnHeader = {'name': 'Name', 'email': 'Email'};
  recruiterColumnHeader = { 'name': 'Name', 'email': 'Email', 'contact' : 'Contact', 'manager' : 'Manager Email' };


  constructor(private service : UsersService) { }

  ngOnInit(): void {
    this.service.getAll().pipe(
      map((recruiters : any) => {
        return recruiters.map((rec) => {
            let name = rec.firstName + " " + rec.lastName;
            let email = rec.email || '';
            let contact = rec.contact || '';
            let manager = rec.manager || '';
            return { name, email, contact, manager } as SystemUser;
        })
      }
    ))
    .subscribe(recruiters => this.recruiters = recruiters);
  }
}
