import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensajes } from '../../../commons/Mensaje';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';


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
  carrera: string = '';
  cara: string = '';
  

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private backgroundMode: BackgroundMode
  ) {
    //this.storage.set('carrera', 'software');
    this.backgroundMode.enable();
    this.carrera = this.navParams.get('carrera');
    Promise.all([this.storage.get("carrera")]).then(values => {
      console.log("a", values[0]);
      this.carrera = values[0];
      console.log(this.carrera, ": esta carrera llego a home");


      switch (this.carrera) {
        case "ambiental": {
          this.noticiasCollection = afs.collection<Mensajes>("MensajeAmbiental", ref => ref.orderBy("fecha", "asc"));
          
          break;
        }
        case "software": {
          
          this.noticiasCollection = afs.collection<Mensajes>('MensajesSoftware', ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "pymes": {
          this.noticiasCollection = afs.collection<Mensajes>("MensajesPymes", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "manufactura": {
          this.noticiasCollection = afs.collection<Mensajes>("MensajesManufactura", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "civil": {
          this.noticiasCollection = afs.collection<Mensajes>("MensajesCivil", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "telematica": {
          this.noticiasCollection = afs.collection<Mensajes>("MensajesTelematica", ref => ref.orderBy("fecha", "desc"));

          break;
        }

      }
      
      console.log(this.noticiasCollection);
      this.noticias = this.noticiasCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          console.log(a, "algo llego");
          const data = a.payload.doc.data() as Mensajes;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );


      try {
        this.titulo = this.navParams.get('titulo');
        this.descripcion = this.navParams.get('descripcion');

        if (this.titulo != "") {

          var date = new Date();
          console.log(date, "se supone que es la fecha")

          const id = this.afs.createId();
          const noticia: Mensajes = { 'titulo': this.titulo, 'descripcion': this.descripcion, 'foto': RUTA, fecha: date };
          this.noticiasCollection.doc(id).set(noticia);
          this.navCtrl.push(VerDetallesPage, {
            id: noticia
          });
        }


      } catch{

      }
    });
  }


  detalles(_noticia: Mensajes) {
    this.navCtrl.push(VerDetallesPage, {
      id: _noticia
    })

  }

}
