import { throwError } from 'rxjs';
import { AppConstants } from './../app/app.constants';
import { map } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable()
export class PublicationService {

  constructor(private apiService: ApiService) { }

  private handleError(error: Response | any) {
    return throwError(error || 'backend server error');
  }

  getPublicationById(params: URLSearchParams, id) {
    return this.apiService.get(`${AppConstants.URL_PUBLICATION_BY_ID}/${id}`, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getOperationType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_OPERATION_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getProductType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_PRODUCT_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getProductModel(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_PRODUCT_MODEL, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getManufacturer(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_MANUFACTURER, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }


  getConditionType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_CONDITION_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getMaterialType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_MATERIAL_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getCaliberType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_CALIBER_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getMagazineType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_MAGAZINE_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getActivationType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_ACTIVATION_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getSystemType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_SYSTEM_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getLocationCity(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_LOCATION_CITY, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

}
