import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



import { VerDetallesPage, SeleccionarCarreraPage } from '../../index.paginas';
import { MensajeITA } from '../../../commons/mensajeIta';

const RUTA: string = 'https://firebasestorage.googleapis.com/v0/b/appunipoli.appspot.com/o/mensaje.png?alt=media&token=c6dc46cc-6df4-455a-96e0-3aac2502778d';

@Component({
  selector: 'page-msj-amb',
  templateUrl: 'msj-amb.html',
})
export class MsjAmbPage {

  homeg: any = VerDetallesPage;
  seleccionar: any = SeleccionarCarreraPage;

  private noticiasCollection: AngularFirestoreCollection<MensajeITA>;

  noticias: Observable<MensajeITA[]>;

  titulo: string = '';
  descripcion: string = '';
  carrera: string ='';

  constructor(private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.noticiasCollection = afs.collection<MensajeITA>('MensajeAmbiental');
    this.noticias = this.noticiasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as MensajeITA;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    try{
      this.carrera = this.navParams.get('carrera');
      this.titulo = this.navParams.get('titulo');
      this.descripcion = this.navParams.get('descripcion');
  
      console.log(this.titulo);

      if (this.titulo != "") {

      
        const id = this.afs.createId();
        const noticia: MensajeITA = { 'titulo': this.titulo, 'descripcion': this.descripcion, 'foto': RUTA };
        this.noticiasCollection.doc(id).set(noticia);
        this.navCtrl.push(VerDetallesPage, {
          id: noticia
        });
      }
      
    }catch{
      console.log("Algo salió mal...");

    }

  }

  detalles(_noticia: MensajeITA) {
    this.navCtrl.push(VerDetallesPage, {
      id: _noticia
    })

  }

}

