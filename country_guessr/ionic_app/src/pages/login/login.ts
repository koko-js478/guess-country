import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  loginButtonAction() {
    if (this.username.length == 0 || this.password.length == 0) {
      let alert = this.alertCtrl.create({
        title: 'Empty fields',
        subTitle: 'Please ensure you fill in all of the fields.',
        buttons: ['Dismiss']
      });
      alert.present();
    }

  }
}
