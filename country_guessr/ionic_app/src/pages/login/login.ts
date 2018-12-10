import { UserProvider } from './../../providers/user/user';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BackendProvider } from './../../providers/backend/backend';
import { TabsPage } from '../tabs/tabs';

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
        this.user.token = data["token"];
        this.user.email = data["user"]["email"];
        this.user.first_name = data["user"]["first_name"];
        this.user.last_name = data["user"]["last_name"];
        this.user.points = data["user"]["points"];
        this.user.username = data["user"]["username"];

        //  Clear input after successful login
        this.username = null;
        this.password = null;

        this.navCtrl.push(TabsPage);
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
