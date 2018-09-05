import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {

  constructor(public http: Http,
    private sanitizer: DomSanitizer) {
  }


  private setHeaders(data?, image?, file?): Headers {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    // if (this.jwtService.getToken()) {
    //   headersConfig['Authorization'] = `${this.jwtService.getToken()}`;
    // }

    if (data) {
      delete headersConfig['Content-Type'];
    }

    if (image) {
      headersConfig['Accept'] = 'image/png';
    }

    if (file) {
      headersConfig['Content-Type'] = 'application/pdf';
      headersConfig['Accept'] = 'application/pdf';
    }

    // console.log(new Headers(headersConfig));
    return new Headers(headersConfig);
  }

  private formatErrors(error: any) {
    return Observable.throw(error.json());
  }

  getImageData(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {

    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders(true, true), search: params });
  }

  get(path: string, params?: URLSearchParams): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => {
        if (res['_body']) {
          return res.json();
        } else {
          return res;
        }
      });
  }

  postData(path: string, body: Object = {}, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, body, { headers: this.setHeaders(true), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => {
        if (res['_body']) {
          return res.json();
        } else {
          return res;
        }

      }, this);
  }

  post(path: string, body: Object = {}, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), {
      headers: this.setHeaders(),
      search: params
    })
      .catch(this.formatErrors)
      .map((res: Response) => {
        if (res['_body'] !== '') {
          return res.json();
        } else {
          return res;
        }
      });
  }

  delete(path, params?: URLSearchParams): Observable<any> {
    return this.http.delete(`${environment.api_url}${path}`, { headers: this.setHeaders() })
      .catch(this.formatErrors)
      .map((res: Response) => {
        if (res['_body'] !== '') {
          return res.json();
        } else {
          return res;
        }
      });
  }

  putData(path: string, body: Object = {}, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, body, { headers: this.setHeaders(true), search: params })
      .catch(this.formatErrors)
      .map((res: Response) => res.json());
  }

  put(path: string, body: Object = {}, params?: URLSearchParams): Observable<any> {
    return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), {
      headers: this.setHeaders(),
      search: params
    })
      .catch(this.formatErrors)
      .map((res: Response) => {
        if (res['_body'] !== '') {
          return res.json();
        } else {
          return res;
        }
      });
  }

  downloadFile(path: string, searchParams?: URLSearchParams): Observable<Blob> {
    const options = new RequestOptions({
      headers: this.setHeaders(false, false, true),
      responseType: ResponseContentType.ArrayBuffer,
      params: searchParams
    });

    return this.http.get(`${environment.api_url}${path}`, options)
      .catch(this.formatErrors)
      .map((res: Response) => res.blob());
  }

  downloadImage(path: string, searchParams?: URLSearchParams): Observable<Blob> {
    const options = new RequestOptions({
      headers: this.setHeaders(true, true),
      responseType: ResponseContentType.Blob,
      params: searchParams
    });

    return this.http.get(`${environment.api_url}${path}`, options)
      .catch(this.formatErrors)
      .map((res: Response) => res.blob());
  }

  downloadFileWithResponse(path: string, searchParams?: URLSearchParams): Observable<Response> {
    const options = new RequestOptions({
      headers: this.setHeaders(false, false, true),
      responseType: ResponseContentType.ArrayBuffer,
      params: searchParams
    });

    return this.http.get(`${environment.api_url}${path}`, options)
      .catch(this.formatErrors);
  }
}
