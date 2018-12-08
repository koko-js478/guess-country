import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, App } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import { HttpClient } from '@angular/common/http';
import { BackendProvider } from './../../providers/backend/backend';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public user: UserProvider,
              private app: App,
              private api: BackendProvider,
              private alertCtrl: AlertController,
              private http: HttpClient) {
  }

  logoutButtonAction() {
    this.makeLogoutRequest().then(data => {
      this.app.navPop();
    });
  }

  makeLogoutRequest() {
    return new Promise(resolve => {
      this.http.post(this.api.logout_url, null).subscribe(data => {
        resolve(data);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Unable to logout',
          subTitle: 'This could be due to server issues.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    });
  }

}
