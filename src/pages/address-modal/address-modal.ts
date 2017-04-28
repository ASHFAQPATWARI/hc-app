import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Utility } from "../../providers/utility";
import { MyaccountService } from "../../providers/myaccount-service";

/**
 * Generated class for the AddressModal page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-address-modal',
  templateUrl: 'address-modal.html',
})
export class AddressModal {
  address: any = {};
  areas;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilityService: Utility, public accountService: MyaccountService) {
    this.areas = this.utilityService.getHomeData().areas;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressModal');
  }

  addAddress() {
    this.accountService.saveAddress(this.address).subscribe(
      data => {
        console.log('add address response', data);
      }
    );
  }

}
