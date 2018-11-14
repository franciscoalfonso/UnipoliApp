import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage, InformacionEventosPage, TabsPage } from "../../index.paginas"

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../../commons/alumno';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-alumno',
  templateUrl: 'alumno.html',
})
export class AlumnoPage {
  
  software : any;
  carrera: string = '';

    studentDoc:AngularFirestoreDocument<Alumno[]>;

  home: any = HomePage;
  noticiasRoot = InformacionEventosPage;


  private StudentCollection: AngularFirestoreCollection<Alumno>;
  student: Observable<Alumno[]>;

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    private database: AngularFirestore) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoPage');
  }

  send(){
    console.log(this.carrera);
    this.navCtrl.push(HomePage, {'carrera':this.carrera});
    
  }


}
