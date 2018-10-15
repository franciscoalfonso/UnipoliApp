import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Horario } from '../../../commons/Horario';
import { GrupoambPage, SeleccionarCarreraPage } from "../../index.paginas"


@Component({
  selector: 'page-horarios-amb',
  templateUrl: 'horarios-amb.html',
})
export class HorariosAmbPage {
  grupoisw: any = GrupoambPage;
  seleccionar: any = SeleccionarCarreraPage;

  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;

  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController) {

    this.photoCollection = asf.collection('users').doc('ambiental').collection('horarios');
    this.horarios = this.photoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Horario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


}

detalles(_horario: Horario) {
  this.navCtrl.push(GrupoambPage, {
    id: _horario
  })
}
}
