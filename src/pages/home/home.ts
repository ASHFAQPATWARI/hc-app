import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Login } from "../login/login";
import { Register } from "../register/register";
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService) {
    translate.setDefaultLang('en');
    if (this.navParams.get('openLogin')) {
      navCtrl.push(Login);
    } else if (this.navParams.get('openRegister')) {
      navCtrl.push(Register);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  changeLang() {
    this.translate.use('ar');
  }

}
