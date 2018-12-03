import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensajes } from '../../../commons/Mensaje';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BackgroundMode } from '@ionic-native/background-mode';


import { VerDetallesPage, SeleccionarCarreraPage } from '../../index.paginas';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Platform } from 'ionic-angular/platform/platform';

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
  data = { title: ''/*, description: '' */ };
  mensajedos: any;
  mensajeuno: any;
  notoo: Array<Mensajes> = [];
  carr: any;
  admin: any;

  constructor(private readonly afs: AngularFirestore,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    private database: AngularFirestore,
    private localNotifications: LocalNotifications,
    private platform: Platform,
    public alertCtrl: AlertController
  ) {
    //this.storage.set('carrera', 'software');
    this.backgroundMode.enable();
    this.carr = this.navParams.get('carrera');

    Promise.all([this.storage.get("carrera")]).then(values => {
      // console.log("a", values[0]);
      this.carrera = values[0];
      // - - - - - switch para visualizar mensajes
      switch (this.carrera) {
        case "ambiental": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajeAmbiental", ref => ref.orderBy("fecha", "asc"));

          break;
        }
        case "software": {
          this.noticiasCollection = this.database.collection<Mensajes>('MensajesSoftware', ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "pymes": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesPymes", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "manufactura": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesManufactura", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "civil": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesCivil", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "telematica": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesTelematica", ref => ref.orderBy("fecha", "desc"));
          break;
        }
      }
      // - - - - - para enviar mensajes
      switch (this.carr) {
        case "ambiental": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajeAmbiental", ref => ref.orderBy("fecha", "asc"));

          break;
        }
        case "software": {
          this.noticiasCollection = this.database.collection<Mensajes>('MensajesSoftware', ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "pymes": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesPymes", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "manufactura": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesManufactura", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "civil": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesCivil", ref => ref.orderBy("fecha", "desc"));
          break;
        }
        case "telematica": {
          this.noticiasCollection = this.database.collection<Mensajes>("MensajesTelematica", ref => ref.orderBy("fecha", "desc"));
          break;
        }
      }


      this.noticias = this.noticiasCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Mensajes;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
      //- - - - - - - extraer datos del observable - - - - - - - - - - - - - - - -
      this.noticias.subscribe(c_list => {
        this.notoo = c_list.slice();

        var primero = this.notoo[0];
        //console.log(primero.titulo, "primero");



        this.storage.set('mensajeuno', primero.titulo);


        Promise.all([this.storage.get("mensajeuno"),
        this.storage.get("mensajedos"),
        this.storage.get("admin")]).then(values => {
          // console.log("mensajeuno", values[0]);
          //console.log("mensajedos", values[1]);
          this.mensajeuno = values[0];
          this.mensajedos = values[1];
          this.admin = values[2];


          if (this.mensajeuno != this.mensajedos) {
            console.log("titulos = diferente");
            this.mensajedos = this.mensajeuno;

            this.storage.set('mensajedos', this.mensajeuno);

            console.log("llego a titu2= ", this.mensajedos);

            // - - - - - - - - - - - notificacion - - - - - - - -
            this.data.title = this.mensajedos;

            var date = new Date(this.data.title + " "/* + this.data.description*/);
            console.log(date);
            this.localNotifications.schedule({
              text: this.data.title,
              //at: date,
              led: 'FF0000',
              sound: this.setSound(),
            });

            switch (this.admin) {
              case 'true': {
                console.log("no va a hacer nada");
                //para los maestros no hay alertas
              } break;
              case 'false': {
                let alert = this.alertCtrl.create({
                  title: 'Tienes un mensaje nuevo!',
                  subTitle: '',
                  buttons: ['OK']
                });
                alert.present();
              }break;

            }

            console.log(this.data);

            this.data = { title: '' /*, description: '' */ };

          }

        })

      })

      try {
        this.titulo = this.navParams.get('titulo');
        this.descripcion = this.navParams.get('descripcion');

        if (this.titulo != "") {

          var date = new Date();


          const id = this.afs.createId();
          const noticia: Mensajes = { 'titulo': this.titulo, 'descripcion': this.descripcion, 'foto': RUTA, fecha: date };
          this.noticiasCollection.doc(id).set(noticia);
          
          /*
           this.navCtrl.push(VerDetallesPage, {
             id: noticia
           });*/
        }

      } catch{

      }
    });

  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

  detalles(_noticia: Mensajes) {
    this.navCtrl.push(VerDetallesPage, {
      id: _noticia
    })

  }

}
