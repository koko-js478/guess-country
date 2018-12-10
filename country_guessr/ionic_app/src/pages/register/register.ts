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
