import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Utility } from "../../providers/utility";
import { MyaccountService } from "../../providers/myaccount-service";
import * as _ from "lodash";

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
  address: any = {
    id: 0,
    avenue: '',
    building: '',
    floor: ''
  };
  areas;
  callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilityService: Utility, public accountService: MyaccountService) {
    this.areas = this.utilityService.getHomeData().areas;
    this.callback = this.navParams.get('adddAddressCallback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressModal');
  }

  addAddress() {
    this.accountService.saveAddress(this.address).subscribe(
      data => {
        if (data.sucess) {
          this.address.id = _.toInteger(data.unique);
          this.callback(this.address);
        }
      }
    );
  }

}
