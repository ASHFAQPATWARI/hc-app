import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { EnableEditSubscription } from "../enable-edit-subscription/enable-edit-subscription";


import { CartService } from "../../providers/cart-service";
import { Utility } from "../../providers/utility";

import * as _ from "lodash";

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class Checkout {
  cartObject;
  startDate;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartService, public utilityService: Utility, public alertCtrl: AlertController, public translate: TranslateService) {
    this.cartObject = this.cartService.getCartObject();
    this.startDate = this.utilityService.addDays(new Date(), 3);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Checkout');
  }

  editSubscription(sub) {
    if (sub.startdate) {
      this.navCtrl.push(EnableEditSubscription, { sub: sub });
    } else {
      let msgs;
      this.translate.get(['alert', 'start_date_required', 'ok']).subscribe((res: any) => {
        msgs = res;
      });
      let alert = this.alertCtrl.create({
        title: msgs.alert,
        message: msgs.start_date_required,
        buttons: [msgs.ok]
      });
      alert.present();
    }

  }

  removeCartItem(subid) {
    this.cartObject = this.cartService.removeCartItem(subid);
  }

  openSubscription() {
    console.log('previous root: ', this.navCtrl.getPrevious())
  }

  getSubscriptionMenu(sub) {
    this.cartService.getMealMenu({
      "startdate": sub.startdate,
      "subid": sub.subid
    }).subscribe(
      data => {
        let lastObj: any = _.last(data.mealdates);
        sub.enddate = this.utilityService.formatDateyyyymmdd(lastObj.mdate);
        _.forEach(data.mealdates, (date) => {
          date.formattedDate = this.utilityService.getFormattedDate(new Date(date.mdate));
          date.showDetails = false;
          _.forEach(date.mealtypes, function (category) {
            _.forEach(category, function (menuSection) {
              _.forEach(menuSection, function (menuSection) {

              });
            });
          });
        })
        _.forEach(sub.persons, (person) => {
          const mealDates = _.cloneDeep(data.mealdates) ;
          person.menuSelection = mealDates;
        });

        

      }
      );
  }

}
