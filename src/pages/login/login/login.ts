import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from "../../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroPage, OlvidarcontraceñaPage } from "../../index.paginas"
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../Noticias/home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro: any = RegistroPage;
  olvidar: any = OlvidarcontraceñaPage;

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    ) {
  }

  async login(user: User) {
    try {
      /*
            this.luService.login(user).then(() => {
              if(this.luService.SesionInAlum){
                this.navCtrl.setRoot(HomePage);
                let alert = this.alertCtrl.create({
                  title: 'iniciaste sesion',
                  buttons: ['OK']
                });
                
                alert.present();
              }
            });
           */

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
          if (user.emailVerified) {
            this.navCtrl.setRoot(HomePage);
            let alert = this.alertCtrl.create({
              title: 'iniciaste sesion',
              buttons: ['OK']
            });

            alert.present();
          } else {
          }
        });

    }
    catch (e) {
      console.error(e);
      let alert = this.alertCtrl.create({
        title: 'Registro o contraseña incorrecta',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  /*
  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
        })
    });
  }
*/
}