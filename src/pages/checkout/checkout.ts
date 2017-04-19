import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EnableEditSubscription } from "../enable-edit-subscription/enable-edit-subscription";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Checkout');
  }

  editSubscription() {
    this.navCtrl.push(EnableEditSubscription);
  }

}
