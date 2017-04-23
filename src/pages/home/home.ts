import { Component, OnDestroy } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Login } from "../login/login";
import { Register } from "../register/register";
import { Checkout } from "../checkout/checkout";
import { CartService } from "../../providers/cart-service";
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnDestroy {
  cartObject;
  cartChangeListener;
  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService, public cartService: CartService, public alertCtrl: AlertController) {
    translate.setDefaultLang('en');
    if (this.navParams.get('openLogin')) {
      navCtrl.push(Login);
    } else if (this.navParams.get('openRegister')) {
      navCtrl.push(Register);
    }

    this.cartObject = this.cartService.getCartObject();

    this.cartChangeListener = this.cartService.subscribeCartChanges().subscribe(
      data => {
        this.cartObject = data;
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  changeLang() {
    this.translate.use('ar');
  }

  openCheckout() {
    if (this.cartObject.cartitems.length) {
      this.navCtrl.push(Checkout);
    } else {
      let msgs;
      this.translate.get(['empty_cart', 'empty_cart_msg', 'ok']).subscribe((res: any) => {
        msgs = res;
      });
      let alert = this.alertCtrl.create({
        title: msgs.empty_cart,
        message: msgs.empty_cart_msg,
        buttons: [msgs.ok]
      });
      alert.present();
    }

  }

  ngOnDestroy() {
    this.cartChangeListener();
  }

}
