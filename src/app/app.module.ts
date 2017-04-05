import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { SubscriptionDetailsPage } from '../pages/subscription-details/subscription-details';
import { DoctorsPage } from '../pages/doctors/doctors';
import { DoctorDetailsPage } from '../pages/doctor-details/doctor-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SubscriptionsPage,
    SubscriptionDetailsPage,
    DoctorsPage,
    DoctorDetailsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SubscriptionsPage,
    SubscriptionDetailsPage,
    DoctorsPage,
    DoctorDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
