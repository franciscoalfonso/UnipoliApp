import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Horario } from '../../../commons/Horario';
import { GrupocivPage, SeleccionarCarreraPage } from "../../index.paginas"


@Component({
  selector: 'page-horarios-civ',
  templateUrl: 'horarios-civ.html',
})
export class HorariosCivPage {
  grupociv:any = GrupocivPage;
  seleccionar: any = SeleccionarCarreraPage;
  
  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;
   

  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController) {

    this.photoCollection = asf.collection('users').doc('civil').collection('horarios');
    this.horarios = this.photoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Horario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );


}

detalles(_horario: Horario){
  this.navCtrl.push(GrupocivPage, {
    id: _horario
  })
}
}
