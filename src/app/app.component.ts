import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Settings } from "../pages/settings/settings";
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { DoctorsPage } from '../pages/doctors/doctors';
import { HelpSlidesPage } from "../pages/help-slides/help-slides";
import { Login } from "../pages/login/login";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HelpSlidesPage; //HomePage; //

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public modalCtrl: ModalController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Book A Meal', component: SubscriptionsPage, icon: 'restaurant' },
      { title: 'Book An Appointment', component: DoctorsPage, icon: 'calendar' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString('#000000');
      this.splashScreen.hide();
    });
  }

  pushPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  setRoot(page) {
    let component;
    switch (page) {
      case 'home':
        component = HomePage;
    }
    this.nav.setRoot(component);
  }

  openSettings() {
    this.nav.push(Settings);
  }

  openLogin() {
    this.nav.push(Login);
  }

}
