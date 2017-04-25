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

  constructor(public navCtrl: NavController, public navParams: NavParams, public utilityService: Utility) {
    this.person = this.navParams.get('person');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditSubscription');
  }

  toggleDetails(date) {
    date.showDetails = !date.showDetails;
  }

  trackDates(index, item) {
    return index;
  }

  itemSelected(selectedItem) {
    console.log('selectedItem', selectedItem);
    selectedItem.selected = true;
    console.log('person', this.person);
  }
}
