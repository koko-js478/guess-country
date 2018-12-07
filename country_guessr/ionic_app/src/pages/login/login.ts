import { UserProvider } from './../../providers/user/user';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BackendProvider } from './../../providers/backend/backend';

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private api: BackendProvider,
              private user: UserProvider,
              private http: HttpClient) {
  }

  loginButtonAction() {
    if (this.username.length == 0 || this.password.length == 0) {
      let alert = this.alertCtrl.create({
        title: 'Empty fields',
        subTitle: 'Please ensure you fill in all of the fields.',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      this.makeLoginRequest().then(data => {

      });
    }
  }

  makeLoginRequest() {
    return new Promise(resolve => {
      this.http.post(this.api.login_url,
                     {"username": this.username,
                     "password": this.password}).subscribe(data => {
        resolve(data);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Invalid Username or Password',
          subTitle: 'Please ensure you filled in your Username and Password correctly.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    });
  }


}
