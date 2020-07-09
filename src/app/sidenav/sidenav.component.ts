import { Component, OnDestroy, ChangeDetectorRef, Input, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { navItemsList } from './nav-items';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'sidebar',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SidenavComponent implements OnDestroy {

  mobileQuery: MediaQueryList;
  fillerNav = ['Dashboard', 'View Users', 'View Candidates', 'View Interviews', 'Edit Profile', 'Change Password', 'Logout'];

  user : any = {};
  @Input('title') title : string;
  @ViewChild('sidenav') sidenav : MatSidenav;
  private _mobileQueryListener: () => void;

  navItems = navItemsList;

  constructor(
    private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, 
    private authService : AuthService, private router : Router ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = this.authService.userLoggedIn();
    this.authService.authStateChanged.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout() {
    this.authService.logout();
    this.sidenav.close();
    this.router.navigateByUrl('/login');
  }

}
