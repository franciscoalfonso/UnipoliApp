import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage, InformacionEventosPage } from "../../index.paginas"

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
/*
    this.StudentCollection = this.afs.collection<Alumno>('alumnos');
    this.student = this.StudentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alumno;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
*/
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoPage');
  }

  send(){
    console.log(this.carrera);
    this.navCtrl.push(HomePage, {'carrera':this.carrera})
  }

  /*
  hide(software, ambiental, telematica, pymes, civil, manufactura , _student: Alumno) {
    const id = this.database.createId();
    const student: Alumno = {
      'software': software,
      'ambiental': ambiental,
      'telematica': telematica,
      'pymes': pymes,
      'civil': civil,
      'manufactura': manufactura,
      'admin': false,
      'email': this
    }
    this.StudentCollection.doc(id).set(student);
    this.navCtrl.push(HomePage);
  }
*/
}
