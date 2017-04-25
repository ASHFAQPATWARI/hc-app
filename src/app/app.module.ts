import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, Platform } from 'ionic-angular';
import { FormsModule } from '@angular/forms';

import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { SubscriptionDetailsPage } from '../pages/subscription-details/subscription-details';
import { DoctorsPage } from '../pages/doctors/doctors';
import { DoctorDetailsPage } from '../pages/doctor-details/doctor-details';
import { HelpSlidesPage } from "../pages/help-slides/help-slides";
import { Settings } from "../pages/settings/settings";
import { Filter } from "../pages/filter/filter";
import { Cart } from "../pages/cart/cart";
import { Login } from "../pages/login/login";
import { Register } from "../pages/register/register";
import { Checkout } from "../pages/checkout/checkout";
import { Thankyou } from "../pages/thankyou/thankyou";
import { EnableEditSubscription } from "../pages/enable-edit-subscription/enable-edit-subscription";
import { EditSubscription } from "../pages/edit-subscription/edit-subscription";
import { MyAccount } from "../pages/my-account/my-account";
import { MySubscriptions } from "../pages/my-subscriptions/my-subscriptions";
import { AddressModal } from "../pages/address-modal/address-modal";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpInterceptorService } from "../providers/http-interceptor";
import { Subscriptions } from "../providers/subscriptions";
import { Utility } from "../providers/utility";
import { LoginService } from "../providers/login";
import { DoctorService } from "../providers/doctors";
import { CartService } from "../providers/cart-service";
import { MyaccountService } from "../providers/myaccount-service";

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
    Filter,
    Cart,
    Login,
    Register,
    Checkout,
    Thankyou,
    EnableEditSubscription,
    EditSubscription,
    MyAccount,
    MySubscriptions,
    AddressModal
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
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
    Filter,
    Cart,
    Login,
    Register,
    Checkout,
    Thankyou,
    EnableEditSubscription,
    EditSubscription,
    MyAccount,
    MySubscriptions,
    AddressModal
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    // {
    //   provide: Http,
    //   useFactory: httpInterceptorService,
    //   deps: [XHRBackend, RequestOptions]
    // },
    //HttpInterceptorService,
    Subscriptions,
    Utility,
    LoginService,
    DoctorService,
    CartService,
    MyaccountService
  ]
})
export class AppModule {

  constructor(public utility: Utility, public traslate: TranslateService, public platform: Platform) {
    const token = this.utility.getToken();
    if (token) {
      this.utility.setCustomerObj(token);
    }

    const lang = this.utility.getLanguage();
    if (lang === 'en' || lang === 'ar') {
      this.traslate.use(lang);
      if (lang === 'ar')
        this.platform.setDir('rtl', true);
      else
        this.platform.setDir('ltr', true);
    } else {
      this.traslate.setDefaultLang('en');
    }
  }

}


export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


export function httpInterceptorService(backend: XHRBackend, options: RequestOptions) {
  return new HttpInterceptorService(backend, options);
}
