import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { Filter } from "../filter/filter";
import { SubscriptionDetailsPage } from "../subscription-details/subscription-details";

import { Subscriptions } from "../../providers/subscriptions";

/*
  Generated class for the Subscriptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html'
})
export class SubscriptionsPage {
  public subscriptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public toastCntrl: ToastController, public subscriptionsService: Subscriptions) {

    this.subscriptions = this.subscriptionsService.getSubscriptions();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionsPage');
  }

  openFilter() {
    let modal = this.modalCtrl.create(Filter);
    modal.present();
  }

  openActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Proceed With',
      buttons: [
        {
          text: 'Show Details',
          icon: 'information-circle',
          handler: () => {
            actionSheet.onDidDismiss(() => {
              this.navCtrl.push(SubscriptionDetailsPage);
            });
          }
        }, {
          text: 'Add to Cart',
          icon: 'cart',
          handler: () => {
            actionSheet.onDidDismiss(() => {
              this.showToastWithCloseButton();
            });
          }
        }, {
          text: 'Cancel',
          icon: 'close',
        }
      ]
    });
    actionSheet.present();
  }

  showToastWithCloseButton() {
    const toast = this.toastCntrl.create({
      message: 'Added to Cart Successfully',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
