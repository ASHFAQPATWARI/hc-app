import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Checkout } from "../checkout/checkout";

import { CartService } from "../../providers/cart-service";

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
  cartObj;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService) {
    this.cartObj = this.cartService.getCartObject();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Cart');
  }

  proceedToCheckout() {
    this.navCtrl.push(Checkout);
  }

}
