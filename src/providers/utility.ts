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
  loading: Loading;
  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello Utility Provider');
  }

  createLoading() {
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  dismissLoading() {
    this.loading.dismissAll();
  }

}
