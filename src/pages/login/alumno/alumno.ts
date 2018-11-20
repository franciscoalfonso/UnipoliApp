import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage, InformacionEventosPage, TabsPage } from "../../index.paginas"

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../../commons/alumno';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html',
})
export class AlumnoPage {

  software: any;
  carrera: string = '';
  carrera2: string = '';

  studentDoc: AngularFirestoreDocument<Alumno[]>;

  home: any = HomePage;
  noticiasRoot = InformacionEventosPage;


  private StudentCollection: AngularFirestoreCollection<Alumno>;
  student: Observable<Alumno[]>;

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    private database: AngularFirestore,
    private storage: Storage) {
    this.carrera2 = this.carrera;
    console.log("Carrera 2: ", this.carrera2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoPage');
  }

  send() {
    console.log(this.carrera);
    this.navCtrl.push(HomePage, { 'carrera': this.carrera });
    this.storage.set('carrera', this.carrera);
  }


}
