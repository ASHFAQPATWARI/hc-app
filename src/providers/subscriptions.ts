import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

import { Utility } from "./utility";

@Injectable()
export class Subscriptions {
  public apiHost;

  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  getSubscriptions(): Observable<any> {
    this.utility.createLoading();
    return this.http.get(`${this.apiHost}subscriptions`)
      .map((r: Response) => r.json().result.subs)
      .do((r) => this.utility.dismissLoading());
  };

  

}
