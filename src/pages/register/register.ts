import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the Register page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class Register {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  register() {
    console.log(' Register clicked');
    this.navCtrl.popToRoot();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
