import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { Register } from "../register/register";
import { LoginService } from "../../providers/login";
import { Checkout } from "../checkout/checkout";

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  credentials = {
    username: '',
    password: ''
  }
  returnPage;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loginService: LoginService,
    public alertCtrl: AlertController, public toastCtrl: ToastController) {
    if (this.navParams.get('openPage')) {
      //navCtrl.push(Checkout);
      this.returnPage = this.navParams.get('openPage');
    }
  }

  login() {
    this.loginService.doLogin(this.credentials).subscribe(
      data => {
        const toast = this.toastCtrl.create({
          message: 'Logged In Successfully!!',
          duration: 3000
        });
        toast.present();
        this.loginService.sendLoginChanges();
        if (this.returnPage) {
          if (this.returnPage == 'checkout') {
            this.navCtrl.pop().then(() => {
              this.navCtrl.push(Checkout);
            })
          }
        } else {
          this.navCtrl.popToRoot();
        }
      }, (error) => {
        const alert = this.alertCtrl.create({
          title: 'Log In Failed',
          subTitle: error.error_description,
          buttons: ['OK']
        });
        alert.present();
      }
    );
  }

  openRegister() {
    this.navCtrl.push(Register, { openPage: this.navParams.get('openPage') });
  }

}
