import { Component, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'sidebar',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  fillerNav = ['Dashboard', 'View Users', 'View Candidates', 'View Interviews', 'Edit Profile', 'Change Password', 'Logout'];

  user : any ;
  @Input('title') title : string;
  private _mobileQueryListener: () => void;

  navItems = [
    {
      displayName: 'Dashboard',
      iconName: 'dashboard',
      route: '/dashboard',
      endOfSection: false
    },
    {
      displayName: 'View Users',
      iconName: 'supervisor_account',
      route: '/users',
      endOfSection: false,
      canView: ['Root', 'Admin', 'OPS']
    },
    {
      displayName: 'View Candidates',
      iconName: 'people_alt',
      route: '/candidates',
      endOfSection: false
    },
    {
      displayName: 'View Interviews',
      iconName: 'event_note',
      route: '/interviews',
      endOfSection: true
    },
    {
      displayName: 'Edit Profile',
      iconName: 'edit',
      route: '/profile/edit',
      endOfSection: false
    },
    {
      displayName: 'Change Password',
      iconName: 'vpn_key',
      route: '/change-password',
      endOfSection: true
    }
  ];
  constructor(private changeDetectorRef: ChangeDetectorRef, 
    private media: MediaMatcher, 
    private authService : AuthService ,
    private router : Router ) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = this.authService.userLoggedIn();
    this.authService.authStateChanged.subscribe((user) => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

}
