import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditSubscription } from "../edit-subscription/edit-subscription";

/**
 * Generated class for the EnableEditSubscription page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-enable-edit-subscription',
  templateUrl: 'enable-edit-subscription.html',
})
export class EnableEditSubscription {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnableEditSubscription');
  }

  editSubscription() {
    this.navCtrl.push(EditSubscription)
  }

}
