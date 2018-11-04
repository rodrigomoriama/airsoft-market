import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AppConstants } from './../app/app.constants';
import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MosaicService {

  constructor(private apiService: ApiService) { }

  private handleError(error: Response | any) {
    return throwError(error || 'backend server error');
  }

  getAllProductsMosaic(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_MOSAIC_ALL, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getOperationType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_OPERATION_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getProductType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_PRODUCT_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getConditionType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_CONDITION_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getCaliberType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_CALIBER_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getSystemType(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_SYSTEM_TYPE, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }

  getLocationCity(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_PUBLICATION_COMBO_FILTER_CITY, params).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }
}
