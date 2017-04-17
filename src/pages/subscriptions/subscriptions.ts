import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, ToastController } from 'ionic-angular';
import { Filter } from "../filter/filter";
import { SubscriptionDetailsPage } from "../subscription-details/subscription-details";
import { Cart } from "../cart/cart";

import { Subscriptions } from "../../providers/subscriptions";

import * as _ from "lodash";

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

    this.subscriptionsService.getSubscriptions().subscribe(
      data => {
        this.subscriptions = data;
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionsPage');
  }

  openCart() {
    this.navCtrl.push(Cart);
  }

  openFilter() {
    let filterObject = {
      categories: [],
      durations: []
    };
    _.forEach(this.subscriptions, function (item, index) {
      filterObject.categories = filterObject.categories.concat(item.cats);
      filterObject.durations.push(
        {
          id: index,
          days: item.days,
          selected: false
        }
      );
    })

    filterObject.categories = _.uniqBy(filterObject.categories, 'id');
    filterObject.durations = _.uniqBy(filterObject.durations, 'days');
    let modal = this.modalCtrl.create(Filter, { filterObject: filterObject});
    modal.present();
  }

  openActionSheet(sub) {
    let actionSheet = this.actionSheetCtrl.create({
      title: sub.name,
      buttons: [
        {
          text: 'Show Details',
          icon: 'information-circle',
          handler: () => {
            actionSheet.onDidDismiss(() => {
              this.navCtrl.push(SubscriptionDetailsPage, {sub:sub});
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
