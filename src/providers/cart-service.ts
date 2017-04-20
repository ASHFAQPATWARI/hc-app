import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as _ from "lodash";

@Injectable()
export class CartService {
  cartObject: any = {
    cartitems: [],
    total: 0
  };
  constructor(public http: Http) {
    
  }

  getCartObject() {
    return this.cartObject;
  }

  addCartItem (subscription, selectedPlan) {
    this.cartObject.cartitems.push({
      subid: subscription.id,
      subName: subscription.name,
      person: selectedPlan.person,
      price: selectedPlan.price,
      prices: subscription.prices,
      startdate: undefined,
      selectedQtyPlan: selectedPlan
    });
    this.cartObject.total += selectedPlan.price;
    return this.cartObject;
  }

  removeCartItem(subid) {
    const removedSub = _.remove(this.cartObject.cartitems, (sub: any) => {
      return sub.subid == subid;
    })[0];
    this.cartObject.total -=removedSub.price;
    return this.cartObject;
  }

}
