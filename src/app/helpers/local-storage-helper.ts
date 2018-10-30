import { AppConstants } from './../app.constants';

export class LocalStorageHelper {

  static saveData(key: string, value: any): void {
    window.localStorage.setItem(key, value);
  }

  static clear(): void {
    window.localStorage.clear();
  }

  static removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  static getEmail(): string {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_EMAIL);
  }

  static getUsername(): string {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_USERNAME);
  }

  static getPhone(): string {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_PHONE);
  }

  static getCellphone(): string {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_CELLPHONE);
  }

  static getToken(): string {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_TOKEN);
  }

  static getUserLoggedIn(): boolean {
    return window.localStorage.getItem(AppConstants.LOCAL_STORAGE_HAS_LOGGED_IN) === 'true';
  }
}
