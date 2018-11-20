import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroPage, OlvidarcontraceñaPage, InforegistroPage } from "../../index.paginas"
import { Observable } from 'rxjs/Observable';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { TabsAspiPage } from '../../aspirantes/tabs-aspi/tabs-aspi';
import { AspiranteRegistroPage } from '../aspirante-registro/aspirante-registro';
import { TabsPage } from '../../tabs/tabs';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro: any = RegistroPage;
  olvidar: any = OlvidarcontraceñaPage;

  correo: string = '';
  aspirante: boolean;

  myForm: FormGroup;
  user: Observable<firebase.User>;
  
  public loading: Loading;

  usuario: string = '';

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = afAuth.authState;

  }
 
  loginUser() {

    
    this.usuario = this.myForm.value.email;
    //this.storage.set('carrera', this.usuario);

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + "this.myForm.value.password");
 

    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");
      this.storage.set('loggeo', 'true');

      if (this.myForm.value.email.indexOf("@unipolidgo.edu.mx") != -1) {
        console.log("eres estudiante unipoli");
        this.storage.set('loggeo', 'true')
        this.storage.set('tipo', 'estudianteomaestro');
        this.navCtrl.push(InforegistroPage, { 'email': this.usuario});

                   
      } else {
        console.log("eres aspirante unipoli");
        this.storage.set('tipo', 'aspirante');
        this.storage.set('admin', 'false')
        this.storage.set('loggeo', 'true')
        this.navCtrl.setRoot(TabsPage);
        //this.navCtrl.setRoot(AspiranteRegistroPage);
      }

    }, (err) => {
      this.loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: "Registro o contraseña incorrecta, intenta de nuevo",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    });

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }


}