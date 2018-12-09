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

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    if (!this.mapIsLoaded) {
      this.map = leaflet.map("map", {
        center: [20.0, 5.0],
        minZoom: 1,
        zoom: 3,
        maxZoom: 10,
      });
      leaflet.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo( this.map );
      this.refreshRandomCountry();
      this.mapIsLoaded = true;
    }
  }

  submitAnswer() {
    let message = "Incorrect.";
    console.log(this.currentGuess);
    console.log(this.currentCountryname);
    if (this.currentGuess !== null && (this.currentGuess === this.currentCountryname)) {
      message = "Correct.";
      this.user.incrementPoints();
      this.refreshRandomCountry();
    }
    let alert = this.alertCtrl.create({
      title: message,
    });
    alert.present();
  }

  refreshRandomCountry() {
    new Promise(resolve => {
      this.http.get(this.api.world_countries_random_url).subscribe(data => {
        resolve(data);
      }, err => {
        let alert = this.alertCtrl.create({
          title: 'Unable to make request.',
          subTitle: 'You do not have a connection to the internet or the server is down.',
          buttons: ['Dismiss']
        });
        alert.present();
      });
    }).then(data => {
      this.currentCountryname = this.getCountryName(data);
      console.log(this.currentCountryname);

      this.displayCountry(this.getCountryGeometry(data));
      this.displayMarker(this.getCountryLat(data), this.getCountryLon(data));
      this.mapPanTo(this.getCountryLat(data), this.getCountryLon(data));
    });
  }

  getCountryName(request) {
    try {
      return request["results"]["features"][0]["properties"]["name"];
    } catch (TypeError) {
      return null;
    }
  }

  getCountryLon(request) {
    try {
      return request["results"]["features"][0]["properties"]["lon"];
    } catch (TypeError) {
      return null;
    }
  }

  getCountryLat(request) {
    try {
      return request["results"]["features"][0]["properties"]["lat"];
    } catch (TypeError) {
      return null;
    }
  }

  getCountryGeometry(request) {
    try {
      return request["results"]["features"][0]["geometry"];
    } catch (TypeError) {
      return null;
    }
  }

  polystyle() {
    return {
      fillColor: 'red',
      weight: 5,
      opacity: 1,
      color: 'red',
      fillOpacity: 1
    }
  }

  mapPanTo(lat, lon) {
    this.map.panTo(new leaflet.LatLng(lat, lon));
  }

  displayMarker(lat, lon) {
    if (this.currentMarker !== null) { this.map.removeLayer(this.currentMarker); }
    this.currentMarker = new leaflet.Marker([lat, lon]);
    this.currentMarker.addTo(this.map);
  }

  displayCountry(geoJSON) {
    if (this.currentCountryLayer !== null) { this.map.removeLayer(this.currentCountryLayer) };
    this.currentCountryLayer = leaflet.geoJSON(geoJSON, {style: this.polystyle()});
    this.currentCountryLayer.addTo(this.map);
  }

}
