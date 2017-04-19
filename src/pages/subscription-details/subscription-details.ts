import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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
  public subsciption;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subsciption = this.navParams.get('sub');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionDetailsPage');
  }

}
