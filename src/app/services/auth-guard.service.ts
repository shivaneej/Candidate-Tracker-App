import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private auth : AuthService, private router : Router) { }

  canActivate(route, state : RouterStateSnapshot) {
    if(this.auth.userLoggedIn())
      return true;
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});
    return false;
  }
}
