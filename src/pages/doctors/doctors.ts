import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DoctorService } from "../../providers/doctors";
import { DoctorDetailsPage } from "../doctor-details/doctor-details";

/*
  Generated class for the Doctors page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-doctors',
  templateUrl: 'doctors.html'
})
export class DoctorsPage {
  public doctors;
  constructor(public navCtrl: NavController, public navParams: NavParams, public doctorService: DoctorService) {
    this.doctors = this.doctorService.getDoctors();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorsPage');
  }

  opanDoctorDetail(doctor) {
    this.navCtrl.push(DoctorDetailsPage, { doctor: doctor });
  }

}
