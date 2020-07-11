import { AuthService } from '../auth.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { RoleService } from '../role.service';

export class ResourceAccess {

  constructor(private auth : AuthService, 
    private router : Router, 
    private roleService : RoleService,
    private allowedUsers : String[], 
    private navigateUrl : string ) { }

  canActivate(route, state : RouterStateSnapshot) {
    let role = this.auth.userLoggedIn().role.roleString;
    if(this.allowedUsers.includes(role))
      return true;
    this.router.navigate([this.navigateUrl]);
    return false;
  }
}
