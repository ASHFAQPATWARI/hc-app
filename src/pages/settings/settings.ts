import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { Utility } from "../../providers/utility";

/**
 * Generated class for the Settings page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {
  currentLanguage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public utilityService: Utility, public platform: Platform, public translate: TranslateService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Settings');
  }

  changeLanguage() {
    this.utilityService.setLanguage(this.currentLanguage);
    if (this.currentLanguage === 'ar') {
      this.platform.setDir('rtl', true);
    } else {
      this.platform.setDir('ltr', true);
    }

    this.translate.use(this.currentLanguage);
  }

} 
