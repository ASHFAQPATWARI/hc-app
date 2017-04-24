import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Utility } from "./utility";

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as _ from "lodash";

@Injectable()
export class CartService {
  cartChanges: Subject<any> = new Subject();

  cartObject: any = {
    cartitems: [],
    total: 0
  };
  apiHost;

  constructor(public http: Http, public utilityService: Utility) {
    this.apiHost = this.utilityService.apiHost;
  }

  getCartObject() {
    return this.cartObject;
  }

  addCartItem(subscription, selectedPlan) {
    const tempCartItem = {
      subid: subscription.id,
      subName: subscription.name,
      person: selectedPlan.person,
      price: selectedPlan.price,
      prices: subscription.prices,
      startdate: undefined,
      enddate: undefined,
      selectedQtyPlan: selectedPlan,
      persons: []
    };

    for (let i = 0; i < tempCartItem.person; i++) {
      tempCartItem.persons.push({
        name: '',
        menuSelection: undefined
      });
    }

    this.cartObject.cartitems.push(tempCartItem);
    this.cartObject.total += selectedPlan.price;
    return this.cartObject;
  }

  removeCartItem(subid) {
    const removedSub = _.remove(this.cartObject.cartitems, (sub: any) => {
      return sub.subid == subid;
    })[0];
    this.cartObject.total -= removedSub.price;
    return this.cartObject;
  }

  sendCartChanges() {
    this.cartChanges.next(this.cartObject);
  }

  subscribeCartChanges(): Observable<any> {
    return this.cartChanges.asObservable();
  }

  getMealMenu(params): Observable<any> {
    this.utilityService.createLoading();
    return this.http.post(`${this.apiHost}page/menu`, params)
      .map((r: Response) => r.json().result)
      .do((r) => this.utilityService.dismissLoading());
  };
}

