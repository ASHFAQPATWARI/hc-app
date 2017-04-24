import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { EditSubscription } from "../edit-subscription/edit-subscription";

import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the EnableEditSubscription page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-enable-edit-subscription',
  templateUrl: 'enable-edit-subscription.html',
})
export class EnableEditSubscription {
  subscrption;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public translate: TranslateService) {
    this.subscrption = this.navParams.get('sub');
    console.log('this.subscrption', this.subscrption);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EnableEditSubscription');
  }

  editSubscription(person) {
    if (person.name) {
      this.navCtrl.push(EditSubscription, {
        "person" : person
      })
    } else {
      let msgs;
      this.translate.get(['alert', 'name_required', 'ok']).subscribe((res: any) => {
        msgs = res;
      });
      let alert = this.alertCtrl.create({
        title: msgs.alert,
        message: msgs.name_required,
        buttons: [msgs.ok]
      });
      alert.present();
    }

  }

}
