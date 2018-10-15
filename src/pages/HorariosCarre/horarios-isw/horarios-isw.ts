import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Horario } from '../../../commons/Horario';
import { GrupoiswPage, SeleccionarCarreraPage } from "../../index.paginas"

@Component({
  selector: 'page-horarios-isw',
  templateUrl: 'horarios-isw.html',
})
export class HorariosIswPage {
  grupoisw: any = GrupoiswPage;
  seleccionar: any = SeleccionarCarreraPage;

  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;


  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController) {

    this.photoCollection = asf.collection('users').doc('software').collection('horarios');
    this.horarios = this.photoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Horario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  detalles(_horario: Horario) {
    this.navCtrl.push(GrupoiswPage, {
      id: _horario
    })
  }
}
