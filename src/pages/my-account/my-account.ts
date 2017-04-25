import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddressModal } from "../address-modal/address-modal";

/**
 * Generated class for the MyAccount page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccount {
  accountTab;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.accountTab = 'info';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccount');
  }

  openAddress() {
    this.navCtrl.push(AddressModal);
  }

}
