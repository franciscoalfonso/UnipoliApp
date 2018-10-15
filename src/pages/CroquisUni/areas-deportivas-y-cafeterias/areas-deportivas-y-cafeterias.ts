import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sitio } from '../../../commons/Sitio';

import { VerDetallesCroquisPage, SeleccionarCarreraPage} from '../../index.paginas';


@Component({
  selector: 'page-areas-deportivas-y-cafeterias',
  templateUrl: 'areas-deportivas-y-cafeterias.html',
})
export class AreasDeportivasYCafeteriasPage {
croquis: any = VerDetallesCroquisPage;
seleccionar: any = SeleccionarCarreraPage;

private areasCollection: AngularFirestoreCollection<Sitio>;
  sitios: Observable<Sitio[]>;

 constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    
  ) {

    this.areasCollection = afs.collection<Sitio>('areas_deportivas_y_cafeteria');
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
