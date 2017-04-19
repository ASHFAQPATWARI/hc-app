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
  public subscriptions; filteredSubs;
  filterObject = {
    categories: [],
    durations: []
  };
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
    public actionSheetCtrl: ActionSheetController, public toastCntrl: ToastController, public subscriptionsService: Subscriptions) {

    this.subscriptionsService.getSubscriptions().subscribe(
      data => {
        this.subscriptions = data;
        this.filteredSubs = data;
        _.forEach(this.subscriptions, (item, index) => {
          this.filterObject.categories = this.filterObject.categories.concat(item.cats);
          this.filterObject.durations.push(
            {
              id: index,
              days: item.days,
              selected: false
            }
          );
        });
        this.filterObject.categories = _.uniqBy(this.filterObject.categories, 'id');
        this.filterObject.durations = _.uniqBy(this.filterObject.durations, 'days');

      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionsPage');
  }

  openCart() {
    this.navCtrl.push(Cart);
  }

  updateFilterObject(filterObj) {
    this.filterObject = filterObj;
    this.applyFilters();
  }

  applyFilters() {
    this.filteredSubs = [];
    const selectedCats = _.filter(this.filterObject.categories, { 'selected': true });
    if (selectedCats.length) {
      _.forEach(selectedCats, (category) => {
        _.forEach(this.subscriptions, (sub) => {
          const iscatPresent = _.filter(sub.cats, (cat) => {
            return cat.id == category.id
          })
          if (iscatPresent && iscatPresent.length) {
            this.filteredSubs.push(sub);
          }
        });
      });
      this.filteredSubs = _.uniqBy(this.filteredSubs, 'id');
    } else {
      this.filteredSubs = this.subscriptions;
    }

    const selectedDurations = _.filter(this.filterObject.durations, { 'selected': true });
    if (selectedDurations.length) {
      const selecteddays = _.map(selectedDurations, (sub) => {
        return sub.days;
      });
      this.filteredSubs = _.filter(this.filteredSubs, function (sub) {
        return _.includes(selecteddays, sub.days);
      });
    }
  }

  openFilter() {
    let modal = this.modalCtrl.create(Filter, { filterObject: this.filterObject, filterCallback: this.updateFilterObject.bind(this) });
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
              this.navCtrl.push(SubscriptionDetailsPage, { sub: sub });
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
