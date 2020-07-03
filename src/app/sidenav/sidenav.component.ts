import { Component, OnDestroy, ChangeDetectorRef, Input } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';


@Component({
  selector: 'sidebar',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  fillerNav = ['Dashboard', 'View Users', 'View Candidates', 'View Interviews', 'Edit Profile', 'Change Password', 'Logout'];

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
      endOfSection: false
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
    },
    {
      displayName: 'Logout',
      iconName: 'exit_to_app',
      route: '/logout'
    }

  ];
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
