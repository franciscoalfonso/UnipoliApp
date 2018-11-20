import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../../tabs/tabs';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';



@Component({
  selector: 'page-login-state',
  templateUrl: 'login-state.html',
})
export class LoginStatePage {

  loggeo: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {


      Promise.all([this.storage.get("loggeo")]).then(values => {
        console.log("estado de loggeo", values[0]);
        this.loggeo = values[0];

        console.log("el usuario esta loggeado= ", this.loggeo)

        switch (this.loggeo) {
          case 'true': {
            console.log("es admin");
            this.navCtrl.setRoot(TabsPage);
            
          } break;
          case 'false': {
            console.log("no es admin");
            this.navCtrl.setRoot(LoginPage);
            
          } break;
          case 'salir': {
            console.log("no es admin");
            this.navCtrl.setRoot(LoginPage);
            
          } break;
          case null: {
            console.log("no es admin");
            this.navCtrl.setRoot(LoginPage);
            
          } break;
        }
      });
  }
}
