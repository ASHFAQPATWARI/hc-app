import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

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
  }

}
