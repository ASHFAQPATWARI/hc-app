import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginService } from "../../providers/login";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public loginService: LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Register');
  }

  register() {
    this.loginService.doRegister(this.registerObj).subscribe(
      data => {
        console.log('register data', data);
      },
      error => {
        console.log('error on register', error);
      }
    )
    this.navCtrl.popToRoot();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
