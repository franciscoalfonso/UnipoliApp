import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { RegistroPage, OlvidarcontraceñaPage, InforegistroPage, TabsPage } from "../../index.paginas"
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Registro } from '../../../commons/registro';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase/app';
import { TabsAspiPage } from '../../aspirantes/tabs-aspi/tabs-aspi';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registro: any = RegistroPage;
  olvidar: any = OlvidarcontraceñaPage;

  //user = {} as User;
  carrera: string = '';
  correo: string = '';
  aspirante: boolean;

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading: Loading;

  private StudentCollection: AngularFirestoreCollection<Registro>;
  student: Observable<Registro[]>;
  admin: boolean;
  usuario: string = '';

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private readonly afs: AngularFirestore,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = afAuth.authState;

  }
 
  loginUser() {

    this.usuario = this.myForm.value.email;

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + "this.myForm.value.password");
 

    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");

      if (this.myForm.value.email.indexOf("@unipolidgo.edu.mx") != -1) {
        console.log("eres estudiante unipoli");
        this.navCtrl.setRoot(InforegistroPage);
        this.enviar();    
      } else {
        console.log("eres aspirante unipoli");
        this.navCtrl.setRoot(TabsAspiPage);
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

  enviar(){
    this.navCtrl.push(InforegistroPage, { 'email': this.usuario});
  }
  /*
    logout(){
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }
    */
}