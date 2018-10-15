import { Component } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Noticia } from '../../../commons/Notica'
import { NavController, NavParams } from 'ionic-angular';

import { VerDetallesPage, SeleccionarCarreraPage } from '../../index.paginas';

const RUTA: string = 'https://firebasestorage.googleapis.com/v0/b/appunipoli.appspot.com/o/mensaje.png?alt=media&token=c6dc46cc-6df4-455a-96e0-3aac2502778d';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  homeg: any = VerDetallesPage;
  seleccionar: any = SeleccionarCarreraPage;

  private noticiasCollection: AngularFirestoreCollection<Noticia>;

  noticias: Observable<Noticia[]>;

  titulo: string = '';
  descripcion: string = '';

  constructor(private readonly afs: AngularFirestore,
    private database: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

    this.noticiasCollection = afs.collection<Noticia>('noticiasEventos');
    this.noticias = this.noticiasCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Noticia;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

    try{
      this.titulo = this.navParams.get('titulo');
      this.descripcion = this.navParams.get('descripcion');
  
      console.log(this.titulo);

      if (this.titulo != "") {

      
        const id = this.afs.createId();
        const noticia: Noticia = { 'titulo': this.titulo, 'descripcion': this.descripcion, 'foto': RUTA };
        this.noticiasCollection.doc(id).set(noticia);
        this.navCtrl.push(VerDetallesPage, {
          id: noticia
        });
      }
      
    }catch{
      console.log("Algo salió mal...");

    }

  }

  detalles(_noticia: Noticia) {
    this.navCtrl.push(VerDetallesPage, {
      id: _noticia
    })

  }

}
