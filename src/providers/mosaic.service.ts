import { ApiService } from './api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppConstants } from './../app/app.constants';
import { URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MosaicService {

  constructor(private apiService: ApiService) { }

  private handleError(error: Response | any) {
    return Observable.throw(error || 'backend server error');
  }

  getAllProductsMosaic(params: URLSearchParams) {
    return this.apiService.get(AppConstants.URL_MOSAIC_ALL).pipe(
      map(res => res),
      catchError(this.handleError)
    );
  }
}
