import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage, HomePage } from "../../index.paginas"
import { AlertController } from 'ionic-angular';



@Component({
  selector: 'page-reistro',
  templateUrl: 'reistro.html',
})
export class RegistroPage {
  user = {} as User;
  logi: any = LoginPage;
  //uni: string = '@outlook.com'
  /*'@unipolidgo.edu.mx'*/

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  async register(user: User) {

    //user.email = user.email.concat(this.uni);

    console.log(user.email);
    try {

      if (user.password == user.password2) {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        ).then((res) => {
          this.sendEmailVerification()
          this.navCtrl.setRoot(HomePage);
        });

      } else {
        let alert = this.alertCtrl.create({
          title: 'Las contraseñas deben de coincidir',
          buttons: ['OK']
        });
        alert.present();
      }

    } catch (e) {
      console.error(e);
    }

  }
  sendEmailVerification() {
    this.afAuth.authState.subscribe(user => {
      user.sendEmailVerification()
        .then(() => {
          console.log('email sent');
          let alert = this.alertCtrl.create({
            title: 'Aviso!',
            subTitle: 'Verifica tu correo para completar tu registro',
            buttons: ['OK']
          });
          alert.present();
        })
    });
  }
}