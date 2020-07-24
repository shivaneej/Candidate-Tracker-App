import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../users.service';
import { map, catchError, take } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { USER_PERMISSION } from './permissions';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard {

  constructor(private router : Router, private userService : UsersService, private authService : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) : Observable<boolean>{
    let loggedInUser = this.authService.userLoggedIn();
    let role = loggedInUser.role.roleString;
    let userId = loggedInUser.id; 
    let routeId = parseInt(route.params.id, 10);
    if(!USER_PERMISSION.write.includes(role) || userId === routeId) return of(false).pipe(take(1));
    return this.userService.getManagers(routeId)
    .pipe(
    take(1),
    map((users : any) => {
      let managers = users.map(user => user.id);
      if(managers.includes(userId))
        return true;
      else {
        this.router.navigate(['/dashboard']);
        return false;  
      }
    }), catchError(err => {
      this.router.navigate(['/dashboard']);
      return of(false);
    }));
  }
}
