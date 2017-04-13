import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Utility } from "./utility";

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {
  apiHost;
  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  doLogin(params): Observable<any> {
    console.log('doLogin is called', params);
    this.utility.createLoading();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options: RequestOptionsArgs = headers;

    console.log('still in login');
    //let args = { username: encodeURIComponent(params.username), password: encodeURIComponent(params.password), grant_type: 'password' };

    return this.http.post(`${this.apiHost}token`, "userName=" + encodeURIComponent(params.username) + "&password=" + encodeURIComponent(params.password) + "&grant_type=password", options)
      .map((r: Response) => r.json().result)
      .do((r) => {
        localStorage.setItem('authorizationData', JSON.stringify(r) );
        this.utility.dismissLoading();
      });

  };

}
