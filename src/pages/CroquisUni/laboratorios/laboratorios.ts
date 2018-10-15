import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sitio } from '../../../commons/Sitio';

import { VerDetallesCroquisPage} from '../../index.paginas';

@Component({
  selector: 'page-laboratorios',
  templateUrl: 'laboratorios.html',
})
export class LaboratoriosPage {
  sitioCollectionRef: AngularFirestoreCollection<Sitio[]>;

  private areasCollection: AngularFirestoreCollection<Sitio>;
   sitios: Observable<Sitio[]>;
 
  constructor(private readonly afs: AngularFirestore,
     public navCtrl: NavController,
     
   ) {
 
     this.areasCollection = afs.collection<Sitio>('laboratorios');
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
