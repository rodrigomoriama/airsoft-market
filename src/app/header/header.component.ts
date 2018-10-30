import { Subscription } from 'rxjs/internal/Subscription';
import { UserDataEmit } from './../../domain/user-data-emit';
import { LocalStorageHelper } from './../helpers/local-storage-helper';
import { UserDataService } from './../../providers/user-data.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoggedIn: boolean;
  username: string;

  private loggedInSubscription: Subscription;

  constructor(private router: Router,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.isLoggedIn = LocalStorageHelper.getUserLoggedIn();
    if (this.isLoggedIn) {
      this.username = LocalStorageHelper.getUsername();
    }
  }

  ngAfterViewInit() {
    this.loggedInSubscription = this.userDataService.LoggedInEmitter.subscribe((data: UserDataEmit) => {
      this.isLoggedIn = data.isLogged;
      this.username = data.username;
    });
  }

  ngOnDestroy() {
    this.loggedInSubscription.unsubscribe();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToPublication() {
    this.router.navigate(['new-publication']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  logout() {
    this.userDataService.logout();
  }
}
