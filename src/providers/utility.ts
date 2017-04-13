import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoadingController, Loading } from "ionic-angular";
import 'rxjs/add/operator/map';

/*
  Generated class for the Utility provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utility {
  public apiHost = 'http://198.37.116.215:9000/api/';
  private customerObj: any;
  loading: Loading;
  constructor(public http: Http, public loadingCtrl: LoadingController) {
  }

  createLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismissAll();
  }

  setToken(r) {
    this.setCustomerObj(r);
    localStorage.setItem('token', JSON.stringify(r));
  }

  getToken(): any {
    const token = localStorage.getItem('token');
    if(token) {
      const d1 = new Date();
      const d2 = new Date(token['.expires']);
      const notexpired = d1.getTime() < d2.getTime();
      if (notexpired) {
        return JSON.parse(token);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  doLogout() {
    localStorage.removeItem('authorizationData');
    this.customerObj = null;
  }

  setCustomerObj(obj) {
    this.customerObj = obj;
  }

  getCustomerObj(): any {
    return this.customerObj;
  }

}
