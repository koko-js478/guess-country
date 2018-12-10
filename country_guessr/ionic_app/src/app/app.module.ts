import { SettingsPageModule } from './../pages/settings/settings.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from './../pages/map/map';
import { SettingsPage } from './../pages/settings/settings';
import { LoginPage } from './../pages/login/login';
import { RegisterPage } from './../pages/register/register';
import { LoginPageModule } from './../pages/login/login.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackendProvider } from '../providers/backend/backend';
import { UserProvider } from '../providers/user/user';
import { RegisterPageModule } from '../pages/register/register.module';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MapPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoginPageModule,
    SettingsPageModule,
    RegisterPageModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MapPage,
    SettingsPage,
    RegisterPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackendProvider,
    UserProvider
  ]
})
export class AppModule {}
