import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Observable } from 'rxjs/Observable';

import { Utility } from "./utility";

/*
  Generated class for the MyaccountService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MyaccountService {
  apiHost;
  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  getCustInfo(): Observable<any> {
    this.utility.createLoading();
    return this.http.get(`${this.apiHost}customer/info`)
      .map((r: Response) => r.json().result)
      .do((r) => {
        this.utility.dismissLoading();
      }).catch((r: Response) => {
        this.utility.dismissLoading();
        return Observable.throw(r.json());
      });
  }

  getCustAddresses(): Observable<any> {
    this.utility.createLoading();
    return this.http.get(`${this.apiHost}customer/address`)
      .map((r: Response) => r.json())
      .do((r) => {
        this.utility.dismissLoading();
      }).catch((r: Response) => {
        this.utility.dismissLoading();
        return Observable.throw(r.json());
      });
  }

  saveAddress(params): Observable<any> {
    this.utility.createLoading();
    return this.http.post(`${this.apiHost}customer/address`, params)
      .map((r: Response) => r.json())
      .do((r) => {
        this.utility.dismissLoading();
      }).catch((r: Response) => {
        this.utility.dismissLoading();
        return Observable.throw(r.json());
      });
  }

  changePassword(params): Observable<any> {
    this.utility.createLoading();
    return this.http.post(`${this.apiHost}account/changepassword`, params)
      .map((r: Response) => r.json())
      .do((r) => {
        this.utility.dismissLoading();
      }).catch((r: Response) => {
        this.utility.dismissLoading();
        return Observable.throw(r.json());
      });
  }

}
