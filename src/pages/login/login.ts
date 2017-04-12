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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public loginService: LoginService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  login() {
    let params = {
      username: 'ashfaqpatwari@gmail.com',
      password: '123456'
    }
    this.loginService.doLogin(params).subscribe(
      data => {
        console.log('login data', data);
      }
    );
  }

  openRegister() {
    this.navCtrl.push(Register);
  }

}
