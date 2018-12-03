import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {
VerDetallesPage,
SeleccionarCarreraPage} from '../../index.paginas';
import { OfertaAcademica} from '../../../commons/ofertaAcademica';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DetallesOfertaAcPage } from '../detalles-oferta-ac/detalles-oferta-ac';

@Component({
  selector: 'page-oferta-academica',
  templateUrl: 'oferta-academica.html',
  
})
export class OfertaAcademicaPage {
  /*
  Iswp:any = IswPage; 
Ambp:any = OaAmbientalPage;
Civp:any = OaCivilPage;
Manp:any = OaManufacturaPage;
PyMp:any = OaPyMesPage;
Telp:any = OaTelePage;
*/
homeg: any = VerDetallesPage;
seleccionar: any = SeleccionarCarreraPage;

private noticiasCollection: AngularFirestoreCollection<OfertaAcademica>;
noticias: Observable<OfertaAcademica[]>;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private readonly afs: AngularFirestore
    ) {
      this.noticiasCollection = afs.collection<OfertaAcademica>("ofertaAcademica");
      this.noticias = this.noticiasCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as OfertaAcademica;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertaAcademicaPage');
  }
  detalles(_noticia: OfertaAcademica) {
    this.navCtrl.push(DetallesOfertaAcPage, {
      id: _noticia
    })

  }

}
