import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Horario } from '../../../commons/Horario';
import { GrupoirtPage, SeleccionarCarreraPage } from "../../index.paginas"

@Component({
  selector: 'page-horarios-irt',
  templateUrl: 'horarios-irt.html',
})
export class HorariosIrtPage {
  grupoirt:any = GrupoirtPage;
  seleccionar: any = SeleccionarCarreraPage;
  
  //photoDoc: AngularFirestoreDocument<Horario[]>;

  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;
  photoDoc: AngularFirestoreDocument<Horario[]>;

  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController,) {

    this.photoCollection = asf.collection('users').doc('redes').collection('horarios');
    this.horarios = this.photoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Horario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


  }

  detalles(_horario: Horario) {
    this.navCtrl.push(GrupoirtPage, {
      id: _horario
    })
  }
}
