import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Horario } from '../../../commons/Horario';
import { GrupopymesPage, SeleccionarCarreraPage } from "../../index.paginas"


@Component({
  selector: 'page-horarios-py-mes',
  templateUrl: 'horarios-py-mes.html',
})
export class HorariosPyMesPage {

  grupospymes: any = GrupopymesPage;
  seleccionar: any = SeleccionarCarreraPage;


  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;
  photoDoc: AngularFirestoreDocument<Horario[]>;


  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController, ) {
    
        this.photoCollection = asf.collection('users').doc('pymes').collection('horarios');
        this.horarios = this.photoCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Horario;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );

  }


  detalles(_horario: Horario) {
    this.navCtrl.push(GrupopymesPage, {
      id: _horario
    })
  }
}

