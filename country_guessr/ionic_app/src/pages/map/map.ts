import { BackendProvider } from './../../providers/backend/backend';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { UserProvider } from './../../providers/user/user';
import leaflet from "leaflet";

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: leaflet.Map;
  mapIsLoaded: boolean = false;

  currentMarker: leaflet.Marker = null;
  currentCountryname: string = null;
  currentCountryLayer: leaflet.GeoJSON = null;

  currentGuess: string = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public http: HttpClient,
              public api: BackendProvider,
              public alertCtrl: AlertController,
              public user: UserProvider) {}

  }

}
