import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensajes } from '../../../commons/Mensaje';
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

  private noticiasCollection: AngularFirestoreCollection<Mensajes>;

  noticias: Observable<Mensajes[]>;

  titulo: string = '';
  descripcion: string = '';
  carrera: string ;
  prueba:string='holis';

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams) {

      this.carrera = this.navParams.get('carrera');
      
      console.log(this.carrera, ": esta carrera llego a home");

    switch (this.carrera) {
      case "ambiental": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajeAmbiental");
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        break;
      }
      case "software": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajesSoftware" , ref => ref.where('descripcion', '==', this.prueba ));
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
        
          }))
        );
        break;
      }
      case "pymes": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajesPymes");
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        
        break;
      }
      case "manufactura": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajesManufactura");
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        break;
      }
      case "civil": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajesCivil");
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        break;
      }
      case "telematica": {
        this.noticiasCollection = afs.collection<Mensajes>("MensajesTelematica");
        this.noticias = this.noticiasCollection.snapshotChanges().pipe(
          map(actions => actions.map(a => {
            const data = a.payload.doc.data() as Mensajes;
            const id = a.payload.doc.id;
            return { id, ...data };
          }))
        );
        break;
      }
    }


    try {
      this.titulo = this.navParams.get('titulo');
      this.descripcion = this.navParams.get('descripcion');

      

      if (this.titulo != "") {
        const id = this.afs.createId();
        const noticia: Mensajes = { 'titulo': this.titulo, 'descripcion': this.descripcion, 'foto': RUTA };
        this.noticiasCollection.doc(id).set(noticia);
        this.navCtrl.push(VerDetallesPage, {
          id: noticia
        });
      }

    } catch{
      
    }

  }
  detalles(_noticia: Mensajes) {
    this.navCtrl.push(VerDetallesPage, {
      id: _noticia
    })

  }

}
