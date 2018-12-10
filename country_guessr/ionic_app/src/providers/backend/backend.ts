import { Injectable } from '@angular/core';

/*
  Generated class for the BackendProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackendProvider {

  url: string = "http://localhost:8000/";

  auth_url: string = this.url + "api-token-auth/";
  login_url: string = this.auth_url + "login/";
  logout_url: string = this.auth_url + "logout/";
  register_url: string = this.url + "register/";

  world_url: string = this.url + "world/";
  world_countries_url = this.world_url + "countries/";
  world_countries_random_url = this.world_countries_url + "random";

  users_url: string = this.url + "users/";
  users_points_url: string = this.users_url + "points/";
  users_points_inc_url: string = this.users_points_url + "increment/";

  verify_url: string = this.url + "verify/";
  refresh_url: string = this.url + "refresh/";


  constructor() {
  }

}
