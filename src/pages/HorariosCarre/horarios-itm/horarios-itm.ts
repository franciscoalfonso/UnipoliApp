import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Horario } from '../../../commons/Horario';
import{ GrupoitmPage, SeleccionarCarreraPage } from "../../index.paginas"
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-horarios-itm',
  templateUrl: 'horarios-itm.html',
})
export class HorariosItmPage {
  grupoitm:any = GrupoitmPage;
  seleccionar: any = SeleccionarCarreraPage;

  private photoCollection: AngularFirestoreCollection<Horario>;
  horarios: Observable<Horario[]>;
  photoDoc: AngularFirestoreDocument<Horario[]>;


  constructor(private readonly asf: AngularFirestore,
    public navCtrl: NavController,) {

    this.photoCollection = asf.collection('users').doc('manufactura').collection('horarios');
    this.horarios = this.photoCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Horario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }
  detalles(_horario: Horario){
    this.navCtrl.push(GrupoitmPage, {
      id: _horario
    })
  }
  }


 