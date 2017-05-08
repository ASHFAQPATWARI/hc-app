import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { Filter } from "../filter/filter";
import { SubscriptionDetailsPage } from "../subscription-details/subscription-details";
import { Checkout } from "../checkout/checkout";
import { Login } from "../login/login";

import { Subscriptions } from "../../providers/subscriptions";
import { CartService } from "../../providers/cart-service";
import { Utility } from "../../providers/utility";

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
export class SubscriptionsPage implements OnDestroy {
  public subscriptions; filteredSubs;
  filterObject = {
    categories: [],
    durations: []
  };
  cartObject: any;
  cartChangeListener: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController, public toastCntrl: ToastController, public subscriptionsService: Subscriptions, public cartService: CartService, public utilityService: Utility) {

    this.cartObject = this.cartService.getCartObject();
    this.cartChangeListener = this.cartService.subscribeCartChanges().subscribe(
      data => {
        this.cartObject = data;
      }
    );

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

  openCheckout() {
    if (this.utilityService.getCustomerObj()) {
      this.navCtrl.push(Checkout);
    } else {
      this.navCtrl.push(Login, { openPage: 'checkout' });
    }

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
          const iscatPresent = _.filter(sub.cats, (cat: any) => {
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
      this.filteredSubs = _.filter(this.filteredSubs, (sub: any) => {
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
              this.navCtrl.push(SubscriptionDetailsPage, { sub: sub, callback: this.updatecartObj.bind(this) });
            });
          }
        }, {
          text: 'Add to Cart',
          icon: 'cart',
          handler: () => {

            actionSheet.onDidDismiss(() => {
              if (_.find(this.cartObject.cartitems, ['subid', sub.id])) {
                this.showToastWithCloseButton('Subscription already added to Cart.');
              } else {
                this.showPlanOptions(sub);
              }

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

  showPlanOptions(sub) {
    let alert = this.alertCtrl.create();
    alert.setTitle('Select Plan');
    alert.setSubTitle(sub.name);
    for (let i = 0; i < sub.prices.length; i++) {
      alert.addInput({
        type: 'radio',
        label: `${sub.prices[i].person} person (KD ${sub.prices[i].price})`,
        value: sub.prices[i],
        checked: (!i) ? true : false
      });
    }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        this.cartObject = this.cartService.addCartItem(sub, data);
        this.showToastWithCloseButton('Added to cart successfully.');
      }
    });
    alert.present();
  }

  updatecartObj() {
    this.cartObject = this.cartService.getCartObject();
  }

  showToastWithCloseButton(msg) {
    const toast = this.toastCntrl.create({
      message: msg,
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 3000
    });
    toast.present();
  }

  ngOnDestroy() {
    this.cartChangeListener.unsubscribe();

  }
}
