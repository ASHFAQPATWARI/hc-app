import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, ToastController } from 'ionic-angular';

import { LoginService } from "../../providers/login";
import { Utility } from "../../providers/utility";

import { Checkout } from "../checkout/checkout";

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
  registerObj: any = {
    gender: 1,
  };
  returnPage;

  dobmax = this.utilityService.formatDateyyyymmdd(new Date());
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loginService: LoginService,
    public utilityService: Utility, public alertCtrl: AlertController, public toastCtrl: ToastController) {
    if (this.navParams.get('openPage')) {
      this.returnPage = this.navParams.get('openPage');
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  register() {
    if (this.registerObj.password.length < 6) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Password should be more then 6 characters.',
        buttons: ['OK']
      });
      alert.present();
      return;
    } else if (this.registerObj.password !== this.registerObj.ConfirmPassword) {
      const alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: 'Passwords do not Match.',
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    this.loginService.doRegister(this.registerObj).subscribe(
      data => {
        if (data.result.sucess) {
          const credentials = {
            username: this.registerObj.email,
            password: this.registerObj.password
          };
          this.loginService.doLogin(credentials).subscribe(
            data => {
              const toast = this.toastCtrl.create({
                message: 'Registered Successfully!!',
                duration: 3000
              });
              toast.present();
              this.loginService.sendLoginChanges();
              if (this.returnPage == 'checkout') {
                this.navCtrl.pop().then(() => {
                  this.navCtrl.push(Checkout);
                })
              } else {
                this.navCtrl.popToRoot();
              }


            }, (error) => {
              const alert = this.alertCtrl.create({
                title: 'Error',
                subTitle: error.error_description,
                buttons: ['OK']
              });
              alert.present();
            }
          );
        } else {
          const alert = this.alertCtrl.create({
            title: 'Error',
            subTitle: data.result.errs[0].err,
            buttons: ['OK']
          });
          alert.present();
        }
      },
      error => {
        console.log('error on register', error);
      }
    )

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
