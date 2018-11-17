import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { TabsAspiPage } from '../../aspirantes/tabs-aspi/tabs-aspi';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LoginStatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login-state',
  templateUrl: 'login-state.html',
})
export class LoginStatePage {

  estadoLog = "nologueado";
  contador = "re";

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {
   
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginStatePage');
    console.log("hola contador", this.contador);

    this.estadoLog = this.navParams.get('estado');

    if (this.estadoLog == "usuariounipoli") {
      this.navCtrl.setRoot(TabsPage);
    }
    if (this.estadoLog == "aspirante") {
      this.navCtrl.setRoot(TabsAspiPage);
    }
    if (this.contador == "re") {
      this.navCtrl.setRoot(LoginPage);
      this.contador = "co";
      console.log("adios contador", this.contador)
    }
    else if (this.estadoLog == "nologueado") {
      this.navCtrl.setRoot(LoginPage);
    }

  }

}
