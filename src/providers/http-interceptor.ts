import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions, ) {
    let token = localStorage.getItem('token');
    let authdata;
    if (token) {
      token = JSON.parse(token);
      const d1 = new Date();
      const d2 = new Date(token['.expires']);
      const notexpired = d1.getTime() < d2.getTime();
      if (notexpired) {
        authdata = token;
      }
    }
    if (authdata) {
      options.headers.set('Authorization', 'Bearer ' + authdata.access_token);
    }
    super(backend, options);
  }

  request(url: any, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options).catch(this.catchAuthError(this))
  }

  private catchAuthError(self: HttpInterceptorService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}

