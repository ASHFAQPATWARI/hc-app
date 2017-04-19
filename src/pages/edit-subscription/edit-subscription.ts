import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EditSubscription page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-edit-subscription',
  templateUrl: 'edit-subscription.html'
})
export class EditSubscription {
  data: Array<{ title: string, details: string, icon: string, showDetails: boolean }> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    for (let i = 0; i < 10; i++) {
      this.data.push({
        title: 'Title ' + i,
        details: 'Lorem ipsum dolor sit amet',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubscription');
  }
  toggleDetails(data) {
    if (data.showDetails) {
      data.showDetails = false;
      data.icon = 'ios-add-circle-outline';
    } else {
      data.showDetails = true;
      data.icon = 'ios-remove-circle-outline';
    }
  }
}
