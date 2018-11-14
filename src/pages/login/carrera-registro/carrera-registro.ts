import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../../commons/Alumno';
import { map } from 'rxjs/operators';
import { HomePage } from '../../index.paginas';
import { TabsPage } from '../../tabs/tabs';

@Component({
  selector: 'page-carrera-registro',
  templateUrl: 'carrera-registro.html',
})
export class CarreraRegistroPage {
  
  private StudentCollection: AngularFirestoreCollection<Alumno>;
  student: Observable<Alumno[]>;
  aspirante: boolean;
  carrera: string;
  email: string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private database: AngularFirestore
    ) {
      this.navCtrl.setRoot(TabsPage);

    this.StudentCollection = this.afs.collection<Alumno>('reg');
    this.student = this.StudentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alumno;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CarreraRegistroPage');
  }
  public hide(carrera) {
    this.aspirante = this.navParams.get('aspirante');
    this.email = this.navParams.get('email');

    
    try {

      console.log(this.carrera);
      this.navCtrl.push(HomePage, { 'carrera': this.carrera }); 
    
      console.log("aspirante: ", this.aspirante);
      console.log(this.email);

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
          'email': this.email,
          'aspirante': this.aspirante
        }
        this.StudentCollection.doc(id).set(student);
        

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
          'email': this.email,
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
          'email': this.email,
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
          'email': this.email,
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
          'email': this.email,
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
          'email': this.email,
          'aspirante': this.aspirante
        }

        this.StudentCollection.doc(id).set(student);
      }
    } catch{

    }

  }

}
