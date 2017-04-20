import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

import { CartService } from "../../providers/cart-service";

/*
  Generated class for the SubscriptionDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subscription-details',
  templateUrl: 'subscription-details.html'
})
export class SubscriptionDetailsPage {
  public subsciption; callback;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
   public toastCntrl: ToastController, public cartService: CartService) {
    this.subsciption = this.navParams.get('sub');
    this.callback = this.navParams.get('callback');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionDetailsPage');
  }

  ionViewWillLeave() {
    this.callback();
  }

  showPlanOptions() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Plan');
    alert.setSubTitle(this.subsciption.name);
    for (let i = 0; i < this.subsciption.prices.length; i++) {
      alert.addInput({
        type: 'radio',
        label: `${this.subsciption.prices[i].person} person (${this.subsciption.prices[i].price})`,
        value: this.subsciption.prices[i],
        checked: (!i) ? true : false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.cartService.addCartItem(this.subsciption, data);
        this.showToastWithCloseButton('Added to cart successfully.');
      }
    });
    alert.present();
  }

  showToastWithCloseButton(msg) {
    const toast = this.toastCntrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }

}
