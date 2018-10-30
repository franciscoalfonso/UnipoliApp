import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from "../../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroPage, OlvidarcontraceñaPage } from "../../index.paginas"
import { AlertController } from 'ionic-angular';
import { HomePage } from '../../Noticias/home/home';
import { MsjAmbPage } from '../../Noticias/msj-amb/msj-amb';
import { MsjCivPage } from '../../Noticias/msj-civ/msj-civ';
import { MsjTelePage } from '../../Noticias/msj-tele/msj-tele';
import { MsjPyMPage } from '../../Noticias/msj-py-m/msj-py-m';
import { MsjManuPage } from '../../Noticias/msj-manu/msj-manu';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro: any = RegistroPage;
  olvidar: any = OlvidarcontraceñaPage;

  user = {} as User;
  carrera: string = '';

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

      this.carrera = this.navParams.get('carrera');

      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((user) => {
        
          switch (this.carrera){
            case "software" :{
              this.navCtrl.setRoot(HomePage);
              break;
            }
            case "ambiental" :{
              this.navCtrl.setRoot(MsjAmbPage);
              break;
            }
            case "civil" :{
              this.navCtrl.setRoot(MsjCivPage);
              break;
            }
            case "manufactura" :{
              this.navCtrl.setRoot(MsjManuPage);
              break;
            }
            case "pymes" :{
              this.navCtrl.setRoot(MsjPyMPage);
              break;
            }
            case "telematica" :{
              this.navCtrl.setRoot(MsjTelePage);
              break;
            }
           
          }

            if (user.emailVerified) {
              
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