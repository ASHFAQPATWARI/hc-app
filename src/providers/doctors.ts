import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Utility } from "./utility";
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the Doctors provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DoctorService {

  apiHost;
  constructor(public http: Http, public utility: Utility) {
    this.apiHost = this.utility.apiHost;
  }

  getDoctors(): Observable<any> {
    console.log('getDoctors');
    this.utility.createLoading();
    return this.http.get(`${this.apiHost}page/doctors`)
      .map((r: Response) => r.json().result.doctors)
      .do((r) => this.utility.dismissLoading());
  };

}
