import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Utility } from "./utility";

/*
  Generated class for the Login provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoginService {
  apiHost;
  loginChanges: Subject<any> = new Subject();
  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  doLogin(params): Observable<any> {
    this.utility.createLoading();
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options: RequestOptionsArgs = headers;
    return this.http.post(`${this.apiHost}token`, "userName=" + encodeURIComponent(params.username) + "&password=" + encodeURIComponent(params.password) + "&grant_type=password", options)
      .map((r: Response) => r.json())
      .do((r) => {
        this.utility.setToken(r);
        this.utility.dismissLoading();
      }).catch((r: Response) => {
        return Observable.throw(r.json());
      });
  };

  sendLoginChanges() {
    this.loginChanges.next();
  }

  subscribeLoginChanges(): Observable<any> {
    return this.loginChanges.asObservable();
  }

}
