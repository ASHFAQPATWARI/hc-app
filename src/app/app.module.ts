import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { HttpModule, Http } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { SubscriptionDetailsPage } from '../pages/subscription-details/subscription-details';
import { DoctorsPage } from '../pages/doctors/doctors';
import { DoctorDetailsPage } from '../pages/doctor-details/doctor-details';
import { HelpSlidesPage } from "../pages/help-slides/help-slides";
import { Settings } from "../pages/settings/settings";
import { Filter } from "../pages/filter/filter";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubscriptionsPage,
    SubscriptionDetailsPage,
    DoctorsPage,
    DoctorDetailsPage,
    HelpSlidesPage,
    Settings,
    Filter
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubscriptionsPage,
    SubscriptionDetailsPage,
    DoctorsPage,
    DoctorDetailsPage,
    HelpSlidesPage,
    Settings,
    Filter
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
