import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AddressModal } from "../address-modal/address-modal";

import { MyaccountService } from "../../providers/myaccount-service";
import { Utility } from "../../providers/utility";
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
  accountInfo: any = {};
  addresses: any = [];
  changePassObj: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public accountService: MyaccountService,
    public alertCtrl: AlertController, public utilityService: Utility) {
    this.accountTab = 'info';
    this.accountService.getCustInfo().subscribe(
      data => {
        this.accountInfo = data;
      }
    );
  }

  tabChanged() {
    if (this.accountTab === 'address') {
      if (!this.addresses.length) {
        this.accountService.getCustAddresses().subscribe(
          data => {
            this.addresses = data.result;
          }
        );
      }
    }
  }

  adddAddressCallback(address) {
    this.addresses.push(address);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccount');
  }

  openAddress() {
    this.navCtrl.push(AddressModal, { adddAddressCallback: this.adddAddressCallback.bind(this) });
  }

  changePassword() {
    if (this.changePassObj.NewPassword < 6) {
      this.utilityService.showAlert({
        title: 'Error',
        subTitle: 'Password should be more then 6 characters.',
      });
      return;
    } else if (this.changePassObj.NewPassword !== this.changePassObj.ConfirmPassword) {
      this.utilityService.showAlert({
        title: 'Error',
        subTitle: 'Passwords do not Match.'
      });
      return;
    }
    this.accountService.changePassword(this.changePassObj).subscribe(
      data => {
        if (data.Succeeded) {
          this.utilityService.showAlert({
            title: 'Success',
            subTitle: 'Password Changed Successfully'
          });
        } else {
          this.utilityService.showAlert({
            title: 'Error',
            subTitle: data.Errors[0]
          });
        }
      }
    );
  }

}
