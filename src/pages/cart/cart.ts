import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Checkout } from "../checkout/checkout";

/**
 * Generated class for the Cart page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class Cart {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cart');
  }

  proceedToCheckout() {
    this.navCtrl.push(Checkout);
  }

}
