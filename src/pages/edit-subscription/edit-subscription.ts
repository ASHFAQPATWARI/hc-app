import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Utility } from "../../providers/utility";

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
  person;

 
  data: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilityService: Utility) {
    this.person = this.navParams.get('person');
    console.log('this.perso: ',this.person);
    
    for (let i = 0; i < 10; i++) {
      this.data.push({
        title: 'Title ' + i,
        details: 'Lorem ipsum dolor sit amet',
        icon: 'ios-add-circle-outline',
        showDetails: false
      });
    }

    console.log('formatted date', this.utilityService.getFormattedDate(new Date()));
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
