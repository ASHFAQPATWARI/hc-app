import { Injectable } from '@angular/core';
import { Http, XHRBackend, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService extends Http {

  constructor(backend: XHRBackend, options: RequestOptions) {
    options.headers.set('withCredentials', 'true');
    super(backend, options);
  }

  request(url: any, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = { headers: new Headers() };
      }
      options.headers.set('withCredentials', 'true');
    } else {
      // we have to add the token to the url object
      url.headers.set('withCredentials', 'true');
    }

    // doing this because above approach is not working
    url.withCredentials = true;
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

