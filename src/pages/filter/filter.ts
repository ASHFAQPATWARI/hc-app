import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Filter page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class Filter {
  filterObject;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.filterObject = this.navParams.get('filterObject');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Filter');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
