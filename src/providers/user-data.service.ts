import { UserLogin } from './../domain/user-login';
import { UserDataEmit } from './../domain/user-data-emit';
import { Router } from '@angular/router';
import { User } from './../domain/user';
import { LocalStorageHelper } from './../app/helpers/local-storage-helper';
import { URLSearchParams } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppConstants } from './../app/app.constants';
import { ApiService } from './api.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UserDataService {

  LoggedInEmitter = new EventEmitter<UserDataEmit>();
  isLogged: boolean;

  constructor(private apiService: ApiService,
    private router: Router) {
    this.updateLogged();
   }

  private handleError(error: Response | any) {
    return throwError(error || 'backend server error');
  }


  login(form: any, params: URLSearchParams) {
    return this.apiService.post(AppConstants.URL_LOGIN, form, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  forgotPassword(form: any, params: URLSearchParams): any {
    return this.apiService.post(AppConstants.URL_FORGOT_PASSWORD, form, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  loginSuccess(userData: UserLogin): void {
    LocalStorageHelper.saveData(AppConstants.LOCAL_STORAGE_TOKEN, userData.token);
    LocalStorageHelper.saveData(AppConstants.LOCAL_STORAGE_HAS_LOGGED_IN, 'true');
    LocalStorageHelper.saveData(AppConstants.LOCAL_STORAGE_EMAIL, userData.email);
    LocalStorageHelper.saveData(AppConstants.LOCAL_STORAGE_USERNAME, userData.username);

    this.isLogged = true;

    // Send to app.component info there user has logged in
    this.LoggedInEmitter.emit({isLogged: true, username: userData.username});

    // Redirect to home
    this.router.navigate(['home']);
  }

  logout() {
    LocalStorageHelper.removeItem(AppConstants.LOCAL_STORAGE_TOKEN);
    LocalStorageHelper.removeItem(AppConstants.LOCAL_STORAGE_USERNAME);
    LocalStorageHelper.removeItem(AppConstants.LOCAL_STORAGE_HAS_LOGGED_IN);
    LocalStorageHelper.removeItem(AppConstants.LOCAL_STORAGE_EMAIL);
    this.isLogged = false;
    this.LoggedInEmitter.emit({isLogged: false, username: ''});
    this.router.navigate(['']);
  }

  hasLoggedIn(): boolean {
    return this.isLogged;
  }

  private updateLogged() {
    this.isLogged = LocalStorageHelper.getUserLoggedIn();
  }

  // USER DETAIL
  getUserByEmail(email: string, params: URLSearchParams) {
    params.set('email', email);
    return this.apiService.get(`${AppConstants.URL_USER_DETAIL}`, params).pipe(
      map(res => res),
      catchError(this.handleError));
  }

  updateUser(id: number, form: any, params: URLSearchParams) {
    return this.apiService.put(`${AppConstants.URL_USER_EDIT}/${id}`, form, params).pipe(
      map(res => res),
      catchError(this.handleError));
  }

  registerUser(form: any, params: URLSearchParams) {
    return this.apiService.post(AppConstants.URL_USER_REGISTER, form, params).pipe(
      map(res => res),
      catchError(this.handleError));
  }

  changePassword(userCode, form: any, params: URLSearchParams) {
    return this.apiService.post(`${AppConstants.URL_USER_CHANGE_PASSWORD}/${userCode}`, form, params).pipe(
      map(res => res),
      catchError(this.handleError));
  }
}
