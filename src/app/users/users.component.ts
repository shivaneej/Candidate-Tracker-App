import { Component, OnInit } from '@angular/core';
import { SystemUser } from '../models/system-user';
import { UsersService } from '../services/users.service';
import { map } from 'rxjs/operators';
import groupBy from '../helper';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  admins : SystemUser[];
  ops : SystemUser[];
  recruiters : SystemUser[];
  interviewers : SystemUser[]; 
  dataLoading : boolean = false;
  columnHeader = { 'name': 'Name', 'email': 'Email', 'contact' : 'Contact' };

  constructor(private service : UsersService) { }

  ngOnInit(): void {
    this.dataLoading = true;
    this.service.getAll().pipe(
      map((users : any) => {
        return users.map((user) => {
            let name = user.firstName + " " + user.lastName;
            let email = user.email;
            let contact = user.contact || '';
            let role = user.role.roleString;
            return { name : name, email : email, contact : contact, role : role } as SystemUser;
        })
      }
    ))
    .subscribe(users => {
      let usersRole = groupBy(users, ( x: SystemUser ) => x.role);
      this.admins = usersRole.Admin;
      this.ops = usersRole.OPS;
      this.recruiters = usersRole.Recruiter; 
      this.interviewers = usersRole.Interviewer; 
      this.dataLoading = false; 
    });
  }
}
