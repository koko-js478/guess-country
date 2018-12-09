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


  constructor(public api: BackendProvider) {
  }
  }

}
