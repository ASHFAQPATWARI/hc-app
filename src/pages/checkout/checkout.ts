import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EnableEditSubscription } from "../enable-edit-subscription/enable-edit-subscription";

import { CartService } from "../../providers/cart-service";
import { Utility } from "../../providers/utility";

import * as _ from "lodash";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
  cartObject;
  startDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public utilityService: Utility) {
    this.cartObject = this.cartService.getCartObject();
    this.startDate = this.utilityService.addDays(new Date(), 2);
    this.startDate = this.utilityService.formatDateyyyymmdd(this.startDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Checkout');
  }

  editSubscription() {
    this.navCtrl.push(EnableEditSubscription);
  }

  removeCartItem(subid) {
    this.cartObject = this.cartService.removeCartItem(subid);
  }

  openSubscription() {
    console.log('previous root: ', this.navCtrl.getPrevious())
  }

  getSubscriptionMenu(sub) {
    this.cartService.getMealMenu({
      "startdate": sub.startdate,
      "subid": sub.subid
    }).subscribe(
      data => {
        let lastObj: any = _.last(data.mealdates);
        sub.enddate = this.utilityService.formatDateyyyymmdd(lastObj.mdate);
      }
      );
  }

}
