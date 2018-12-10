import { BackendProvider } from './../../providers/backend/backend';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  username: string = null;
  email: string = null;
  password_one: string = null;
  password_two: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public app: App,
              public http: HttpClient,
              public api: BackendProvider,
              public alertCtrl: AlertController) {
  }

  registerButtonAction() {
    if (this.isValidCredentials()) {
      new Promise(resolve => {
          this.http.post(this.api.register_url,
                         this.constructRegisterPOSTbody()).subscribe(data => {
            resolve(data);
          }, err => {
            let alert = this.alertCtrl.create({
              title: 'Registration Unsuccessful.',
              subTitle: 'Please make sure to try again or try another username/email.',
              buttons: ['Dismiss']
            });
            alert.present();
          });
        }).then(data => {
          let alert = this.alertCtrl.create({
            title: 'Registration Successful.',
            subTitle: 'You will now be redirected to the login page.',
          });
          alert.present();

          this.app.navPop();
      }, err => {
        let alert = this.alertCtrl.create({
            title: 'Registration Unsuccessful.',
            subTitle: 'Please make sure to try again or try another username/email.',
            buttons: ['Dismiss']
        });
        alert.present();
      });
    } else {
      let alert = this.alertCtrl.create({
        title: 'Invalid values.',
        subTitle: 'Please ensure you have filled out all fields and your passwords match.',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  isValidCredentials() {
    if (this.username == null || this.username.length === 0 ||
        this.email == null || this.email.length === 0 ||
        this.password_one == null || this.password_one.length === 0 ||
        this.password_two == null || this.password_two.length === 0 ||
        this.password_one !== this.password_two)
    {
      return false;
    }
    return true;
  }

  constructRegisterPOSTbody() {
    return {
      "username": this.username,
      "email": this.email,
      "password1": this.password_one,
      "password2": this.password_two, 
    }
  }

}
