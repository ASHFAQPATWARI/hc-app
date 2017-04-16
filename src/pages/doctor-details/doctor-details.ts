import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the DoctorDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-doctor-details',
  templateUrl: 'doctor-details.html'
})
export class DoctorDetailsPage {

  public doctor;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.doctor = this.navParams.get('doctor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorDetailsPage');
  }

}
