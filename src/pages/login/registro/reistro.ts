import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage, AspiranteRegistroPage } from "../../index.paginas"
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { CarreraRegistroPage } from '../carrera-registro/carrera-registro';


@Component({
  selector: 'page-reistro',
  templateUrl: 'reistro.html',
})
export class RegistroPage {

  user = {} as User;
  logi: any = LoginPage;

  email: string= '';
  
  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public alertCtrl: AlertController,
    ) {
  }

  async register(user: User) {
    try {


      if (user.password == user.password2) {
        const result = await this.afAuth.auth.createUserWithEmailAndPassword(
          user.email,
          user.password
        ).then((res) => {
          
          this.storage.set('loggeo', 'true');
          
          if (user.email.indexOf("@unipolidgo.edu.mx") != -1) {
            console.log("eres estudiante unipoli");
            this.storage.set('tipo', 'estudianteomaestro');
            this.email = user.email;
            this.navCtrl.push(CarreraRegistroPage, { 'email': this.email });
            
          } else {
            console.log("eres aspirante unipoli");
            this.storage.set('tipo', 'aspirante');
            this.storage.set('admin', 'false');
            this.email = user.email;
            this.navCtrl.push(AspiranteRegistroPage, { 'email': this.email});
          }
          this.sendEmailVerification();
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

  //se envia la verificacion de correo electronico
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