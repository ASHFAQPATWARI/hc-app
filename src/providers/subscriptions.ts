import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Utility } from "./utility";

/*
  Generated class for the Subscriptions provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Subscriptions {
  public apiHost;

  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  getSubscriptions(): Observable<any> {
    return this.http.get(`${this.apiHost}subscriptions`)
      .map((r: Response) => r.json());
  };

}
