import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Aspirantes } from '../../../commons/Aspirantes';
import { map } from 'rxjs/operators';
import { LoginStatePage } from '../login-state/login-state';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../../index.paginas';

@Component({
  selector: 'page-aspirante-registro',
  templateUrl: 'aspirante-registro.html',
})
export class AspiranteRegistroPage {

  private StudentCollection: AngularFirestoreCollection<Aspirantes>;
  student: Observable<Aspirantes[]>;

  Nombre: string = '';
  Apellidos: string = '';
  Escuela: string = '';
  carrera: string = '';
  email: string = '';
  urlimagen: string = "https://firebasestorage.googleapis.com/v0/b/appunipoli.appspot.com/o/usuario.png?alt=media&token=f0f4be51-3404-4983-aa0d-0127f86be086";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    private storage: Storage
  ) {
    this.StudentCollection = this.afs.collection<Aspirantes>('registro_aspirantes');
    this.student = this.StudentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Aspirantes;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );

    this.email = this.navParams.get('email');
    console.log("email de aspirante: ", this.email);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AspiranteRegistroPage');
  }
  registrar() {


    console.log(this.Nombre, this.Apellidos, this.Escuela, this.carrera);
    const id = this.database.createId();
    const student: Aspirantes = {
      'nombre': this.Nombre,
      'apellido': this.Apellidos,
      'email': this.email,
      'escuela': this.Escuela,
      'carrera': this.carrera,
      'urlimagen': this.urlimagen

    }
    this.StudentCollection.doc(id).set(student);
    
    this.storage.set('tipo', 'asprante');

    this.navCtrl.setRoot(LoginPage);
  }
}
