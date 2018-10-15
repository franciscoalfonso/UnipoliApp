import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sitio } from '../../../commons/Sitio';

import { VerDetallesCroquisPage} from '../../index.paginas';


@Component({
  selector: 'page-ud1',
  templateUrl: 'ud1.html',
})
export class Ud1Page {
  
  //croquis: any =  VerDetallesCroquisPage;
  sitioCollectionRef: AngularFirestoreCollection<Sitio[]>;
  //seleccionar: any = SeleccionarCarreraPage;

  private areasCollection: AngularFirestoreCollection<Sitio>;
  sitios: Observable<Sitio[]>;

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {

    this.areasCollection = afs.collection<Sitio>('uduno');
    this.sitios = this.areasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Sitio;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  detalles(_sitio: Sitio) {
    this.navCtrl.push(VerDetallesCroquisPage, {
      id: _sitio
    })
  }

}
