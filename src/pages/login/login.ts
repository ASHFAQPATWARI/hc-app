import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Register } from "../register/register";
import { LoginService } from "../../providers/login";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loginService: LoginService) {
  }

  login() {
    this.loginService.doLogin(this.credentials).subscribe(
      data => {

      }
    );
  }

  openRegister() {
    this.navCtrl.push(Register);
  }

}
