import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Sitio } from '../../../commons/Sitio';

import { VerDetallesCroquisPage, SeleccionarCarreraPage} from '../../index.paginas';


@Component({
  selector: 'page-centro-informacion',
  templateUrl: 'centro-informacion.html',
})
export class CentroInformacionPage {

  seleccionar: any = SeleccionarCarreraPage;

 private areasCollection: AngularFirestoreCollection<Sitio>;
  sitios: Observable<Sitio[]>;

 constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    
  ) {

    this.areasCollection = afs.collection<Sitio>('centro_Info');
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
