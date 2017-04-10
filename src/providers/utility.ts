import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the Utility provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Utility {
  public apiHost = 'http://198.37.116.215:9000/api/';
  constructor(public http: Http) {
    console.log('Hello Utility Provider');
  }

}
