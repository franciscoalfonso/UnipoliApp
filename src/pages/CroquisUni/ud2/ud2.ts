import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sitio } from '../../../commons/Sitio';

import { VerDetallesCroquisPage} from '../../index.paginas';

@Component({
  selector: 'page-ud2',
  templateUrl: 'ud2.html',
})
export class Ud2Page {

  sitioCollectionRef: AngularFirestoreCollection<Sitio[]>;

  private areasCollection: AngularFirestoreCollection<Sitio>;
  sitios: Observable<Sitio[]>;

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {

    this.areasCollection = afs.collection<Sitio>('uddos');
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
