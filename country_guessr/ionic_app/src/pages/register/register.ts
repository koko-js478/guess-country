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

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public app: App,
              public http: HttpClient,
              public api: BackendProvider,
              public alertCtrl: AlertController) {
  }

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
