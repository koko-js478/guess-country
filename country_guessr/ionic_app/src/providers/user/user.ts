import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';
import { BackendProvider } from './../backend/backend';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  token: string;

  email: string;
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  points: number;


  constructor(public api: BackendProvider,
              public alertCtrl: AlertController,
              public http: HttpClient) {
  }

  incrementPoints() {
    new Promise(resolve => {
      this.http.patch(this.api.users_points_inc_url,
                     {"token": this.token}).subscribe(data => {
        resolve(data);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Unable to send score to server.',
          subTitle: 'Your score will not be recorded on the server and you might lose your progress.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    });
    this.points++;
  }

}
