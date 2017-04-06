import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage } from "../home/home";

/*
  Generated class for the HelpSlides page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help-slides',
  templateUrl: 'help-slides.html'
})
export class HelpSlidesPage implements OnDestroy {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpSlidesPage');
  }

  openLogin( doLogin) {
    if (doLogin)
      this.navCtrl.setRoot(HomePage, { openLogin: true });
    else 
      this.navCtrl.setRoot(HomePage);
  }

  ngOnDestroy() {
    
  }

}
