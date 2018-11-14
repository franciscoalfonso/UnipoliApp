import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../Noticias/home/home';

import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Registro } from '../../../commons/registro';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { TabsPage, DatosdusuarioPage } from '../../index.paginas';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'page-inforegistro',
  templateUrl: 'inforegistro.html',
})
export class InforegistroPage {

  informacionusuario: any = {};
  data = { carrera: '', admin: '' };
  usuario: string = "";
  info:any ='';
  Datos = {email: '', software: '', }


  private StudentCollection: AngularFirestoreCollection<Registro>;
  
  student: Observable<Registro[]>;

  constructor(public navCtrl: NavController,
    private readonly afs: AngularFirestore,
    public navParams: NavParams) {
    // this.ionViewDidLoad();
    // this.navCtrl.setRoot(TabsPage);

    this.usuario = this.navParams.get('email');
    console.log(this.usuario, ": variable para la consulta");

  }

  ionViewDidLoad() {
    console.log("llego al ionviedidload")
    try {
      this.StudentCollection = this.afs.collection<Registro>("reg", ref => ref.where('email', '==', this.usuario));
      this.student = this.StudentCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Registro;
          const id = a.payload.doc.id;
          return { id, ...data }
        }))
      );


    } catch (e) {
      console.log(e);

    }
   
  }
  elobserbable(estudiante:any){
    console.log("llego a el observable");


    this.informacionusuario.subscribe( res => {
      console.log(res);
      
    });
      
    
    }
   // console.log(this.student)
  // console.log(this.info, "es el de info");
   
  }
/*
  detalles(usuarios: Registro) {

    console.log("llego a enviar datos");
    this.navCtrl.push(DatosdusuarioPage, {
      id: usuarios
    })
    this.navCtrl.setRoot(DatosdusuarioPage);
  }
*/



/*
  admin: boolean;
  aspirante: boolean;
  ambiental: boolean;
  civil: boolean;
  manufactura: boolean;
  pymes: boolean;
  software: boolean;
  telematica: boolean;
*/

/*
    this.admin = this.informacion_usuario.admin;
    this.aspirante=  this.informacion_usuario.aspirante;

    this.ambiental = this.informacion_usuario.ambiental;
    this.civil = this.informacion_usuario.civil;
    this.manufactura = this.informacion_usuario.manufactura;
    this.pymes = this.informacion_usuario.pymes;
    this.software = this.informacion_usuario.software;
    this.telematica = this.informacion_usuario.telematica;

    console.log(this.informacion_usuario.software);
    console.log("llego a info de registro")

    if ( this.informacion_usuario.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "ambiental", 'admin': false });
    }
    if (this.admin == true && this.ambiental == true){
      this.navCtrl.push(HomePage, { 'carrera': "ambiental", 'admin': true });
    }
    if (this.admin == false && this.civil == true){
      this.navCtrl.push(HomePage, { 'carrera': "civil", 'admin': false });
    }
    if (this.admin == true && this.civil == true){
      this.navCtrl.push(HomePage, { 'carrera': "civil", 'admin': true });
    }
    if (this.admin == false && this.manufactura == true){
      this.navCtrl.push(HomePage, { 'carrera': "manufactura", 'admin': false });
    }
    if (this.admin == true && this.manufactura == true){
      this.navCtrl.push(HomePage, { 'carrera': "manufactura", 'admin': true });
    }
    if (this.admin == false && this.pymes == true){
      this.navCtrl.push(HomePage, { 'carrera': "pymes", 'admin': false });
    }
    if (this.admin == true && this.pymes == true){
      this.navCtrl.push(HomePage, { 'carrera': "pymes", 'admin': true });
    }
    if (this.admin == false && this.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "software", 'admin': false });
    }
    if (this.admin == true && this.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "software", 'admin': true });
    }
    if (this.admin == false && this.telematica == true){
      this.navCtrl.push(HomePage, { 'carrera': "telematica", 'admin': false });
    } 
    else if (this.admin == true && this.telematica == true){
      this.navCtrl.push(HomePage, { 'carrera': "telematica", 'admin': true });
    }
    this.navCtrl.setRoot(TabsPage);
*/