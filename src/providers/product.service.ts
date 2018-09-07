import { Observable } from 'rxjs';
import { AppConstants } from './../app/app.constants';
import { map } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class ProductService {

  constructor(private apiService: ApiService) { }

  private handleError(error: Response | any) {
    return Observable.throw(error || 'backend server error');
  }

  getProductById(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_BY_ID).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getProductType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_PRODUCT_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getProductModel(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_PRODUCT_MODEL).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getManufacturer(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_MANUFACTURER).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getConditionType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_CONDITION_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getMaterialType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_MATERIAL_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getCaliberType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_CALIBER_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getMagazineType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_MAGAZINE_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getActivationType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_ACTIVATION_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getSystemType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PRODUCT_SYSTEM_TYPE).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

}
