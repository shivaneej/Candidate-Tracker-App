import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UsersService } from '../users.service';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { USER_PERMISSION } from './permissions';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditUserGuard {

  constructor(private router : Router, private userService : UsersService, private authService : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot) {
    let role = this.authService.userLoggedIn().role.roleString;
    let routeId = parseInt(route.params.id, 10);
    if(!USER_PERMISSION.write.includes(role)) return false;
    return this.userService.getAll()
    .pipe(map((users : any) => users.map(user => user.id )), map(users => {
      if(users.includes(routeId))
        return true;
    }), catchError(err => {
      this.router.navigateByUrl('/dashboard');
      return of(false);
    }));
  }
}
