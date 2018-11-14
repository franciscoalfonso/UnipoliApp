import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../../shared/models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from "../../index.paginas"
import { AlertController } from 'ionic-angular';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../../commons/Alumno';
import { TabsPage } from '../../tabs/tabs';
import { HomePage } from '../../Noticias/home/home';



@Component({
  selector: 'page-reistro',
  templateUrl: 'reistro.html',
})
export class RegistroPage {



  user = {} as User;
  logi: any = LoginPage;
  
  carrera: string = '';
  //uni: string = '@outlook.com'
  /*'@unipolidgo.edu.mx'*/



  private StudentCollection: AngularFirestoreCollection<Alumno>;
  student: Observable<Alumno[]>;
  aspirante: boolean;

  constructor(private readonly afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    private database: AngularFirestore) {
    
        this.StudentCollection = this.afs.collection<Alumno>('reg');
        this.student = this.StudentCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Alumno;
            const id = a.payload.doc.id;
            return { id, ...data }
          }))
        );
    
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
         
          
          if (user.email.indexOf("@unipolidgo.edu.mx") != -1) {
            console.log("eres estudiante unipoli");
            
            this.aspirante = false;
            this.navCtrl.setRoot(TabsPage);
          } else {
            console.log("eres aspirante unipoli");
            this.aspirante = true;
          }
          this.sendEmailVerification();
          this.hide();

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

  //seleccion de la carrera
  
  public hide() {
    
    try {

     // this.navCtrl.push(LoginPage, { 'carrera': this.carrera });  
    
      console.log(this.carrera);
      console.log("aspirante: ", this.aspirante);

      if (this.carrera == "software") {

        console.log("si! seleccionaste software");

        const id = this.database.createId();
        const student: Alumno = {
          'software': true,
          'ambiental': false,
          'civil': false,
          'manufactura': false,
          'pymes': false,
          'telematica': false,
          'admin': false,
          'email': this.user.email,       
          'aspirante': this.aspirante
        }
        this.StudentCollection.doc(id).set(student);
        this.navCtrl.push(HomePage, { 'carrera': this.carrera });

      } if (this.carrera == "ambiental") {

        const id = this.database.createId();

        const student: Alumno = {
          'software': false,
          'ambiental': true,
          'civil': false,
          'manufactura': false,
          'pymes': false,
          'telematica': false,
          'admin': false,
          'email': this.user.email,
          'aspirante': this.aspirante         
          
        }

        this.StudentCollection.doc(id).set(student);

      }
      if (this.carrera == "civil") {

        const id = this.database.createId();

        const student: Alumno = {
          'software': false,
          'ambiental': false,
          'civil': true,
          'manufactura': false,
          'pymes': false,
          'telematica': false,
          'admin': false,
          'email': this.user.email,
          'aspirante': this.aspirante        

        }

        this.StudentCollection.doc(id).set(student);
      }
      if (this.carrera == "manufactura") {


        const id = this.database.createId();

        const student: Alumno = {
          'software': false,
          'ambiental': false,
          'civil': false,
          'manufactura': true,
          'pymes': false,
          'telematica': false,
          'admin': false,
          'email': this.user.email,
          'aspirante': this.aspirante
          
        }

        this.StudentCollection.doc(id).set(student);
      }
      if (this.carrera == "pymes") {

        const id = this.database.createId();

        const student: Alumno = {
          'software': false,
          'ambiental': false,
          'civil': false,
          'manufactura': false,
          'pymes': true,
          'telematica': false,
          'admin': false,
          'email': this.user.email,
          'aspirante': this.aspirante
        }

        this.StudentCollection.doc(id).set(student);
      }
      else if (this.carrera == "telematica") {

        const id = this.database.createId();

        const student: Alumno = {
          'software': false,
          'ambiental': false,
          'civil': false,
          'manufactura': false,
          'pymes': false,
          'telematica': true,
          'admin': false,
          'email': this.user.email,
          'aspirante': this.aspirante
        }

        this.StudentCollection.doc(id).set(student);
      }
    } catch{

    }

  }
}