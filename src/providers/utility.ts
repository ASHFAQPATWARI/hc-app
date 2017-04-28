import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { LoadingController, Loading, AlertController } from "ionic-angular";
import 'rxjs/add/operator/map';

/*
  Generated class for the Utility provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utility {
  public apiHost = 'http://198.37.116.215:9000/api/';
  private customerObj;
  homeData;
  loading: Loading;
  constructor(public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
  }

  createLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismissAll();
  }

  showAlert(params) {
    const alert = this.alertCtrl.create({
      title: params.title,
      subTitle: params.subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  setToken(r) {
    this.setCustomerObj(r);
    localStorage.setItem('token', JSON.stringify(r));
  }

  getToken(): any {
    let token = localStorage.getItem('token');
    if (token) {
      token = JSON.parse(token);
      const d1 = new Date();
      const d2 = new Date(token['.expires']);
      const notexpired = d1.getTime() < d2.getTime();
      if (notexpired) {
        return token;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  doLogout() {
    localStorage.removeItem('token');
    this.customerObj = null;
  }

  setCustomerObj(obj) {
    this.customerObj = obj;
  }

  getCustomerObj(): any {
    return this.customerObj;
  }

  setLanguage(lang) {
    localStorage.setItem('lang', lang);
  }

  getLanguage(): any {
    const lang = localStorage.getItem('lang');
    if(lang === 'en' || lang === 'ar') {
      return lang;
    } else {
      this.setLanguage('en');
      return 'en';
    }
  }

  getFormattedDate(d: Date): string {

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
  }

  addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    if(result.getDay() === 5) {
      result.setDate(result.getDate() + 1);
    }
    return result;
  }

  formatDateyyyymmdd(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  getHomeDataCall(): Observable<any> {
    return this.http.get(`${this.apiHost}page/home`)
      .map((r: Response) => r.json().result);
  };

  setHomeData(data) {
    this.homeData = data;
  }

  getHomeData() {
    return this.homeData;
  }

}
