import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams, NavController } from 'ionic-angular';

import { BackgroundMode } from '@ionic-native/background-mode';
import { Platform } from 'ionic-angular/platform/platform';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


//paginas
import {
  HomePage, InformacionEventosPage, EnlacesPage, ConoceUnipoliPage,
  HorariosPage, OfertaAcademicaPage
  //, PaginadecargaPage
} from '../index.paginas';
//import { LoginStatePage } from '../login/login-state/login-state';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})

export class TabsPage {

  noticiasRoot = HomePage;
  unipoliRoot = ConoceUnipoliPage;
  enlacesRoot = EnlacesPage;
  mensajesRoot = InformacionEventosPage;
  horariosRoot = HorariosPage;
  ofertaRoot = OfertaAcademicaPage;

  admin: string;
  auth: string;
  mostrar: any;
  mostrarAlaAspirante: any;

  data = { title: '', description: '' };

  titu1: string = '';
  titu2: string = '';
  loggeado: any;

  administrador: any;
  usuario: any;
  aspirante: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private backgroundMode: BackgroundMode,
    private platform: Platform,
    public alertCtrl: AlertController,
    private localNotifications: LocalNotifications
    ) {


    Promise.all([this.storage.get("tipo")]).then(values => {
      console.log("a", values[0]);
      this.auth = values[0];
      console.log("el logueado es: ", this.auth);

      switch (this.auth) {
        case 'estudianteomaestro': {
          
          Promise.all([this.storage.get("admin")]).then(values => {
            console.log("a", values[0]);
            this.admin = values[0];
      
            console.log("el usuario es admin= ", this.admin)
      
            switch (this.admin) {
              case 'true': {
                console.log("es admin");
                this.administrador = true;
              } break;
              case 'false': {
                console.log("no es admin");
                this.usuario = true;
              } break;
              case 'aspirante': {
                console.log("es un aspirante");
                this.aspirante = true;
              } break;
      
            }
          });
          // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


        } break;

        case 'aspirante': {
          console.log("es un estudiante o un maestro");
          this.mostrarAlaAspirante = true;
        }
      }

    });



    //consulta interna para las notificaciones
    
  //  this.backgroundMode.enable();

    Promise.all([this.storage.get("titulo"), this.storage.get("titulo2")]).then(values => {
      console.log("a", values[0]);
      console.log("b", values[1]);

      this.titu1 = values[0];
      this.titu2 = values[1]

      console.log("el titulo que se guarda es= ", this.titu1)

      if (this.titu1 != this.titu2) {
        console.log("titulos = diferente");
        this.titu2 = this.titu1;
        this.storage.set('titulo2', this.titu2);
        console.log("llego a titu2= ", this.titu2)
        this.scheduleNotification();
      }

    });

  }
  scheduleNotification() {

    this.titu2;
    //this.data.description = this.navParams.get('desc');

    var date = new Date(this.titu2 + " " + this.data.description);
    console.log(date);
    this.localNotifications.schedule({
      text: this.titu2,
      //at: date,
      led: 'FF0000',
      sound: this.setSound(),
    });

    let alert = this.alertCtrl.create({
      title: 'Enviado!',
      subTitle: 'Configuración de notificación con éxito',
      buttons: ['OK']
    });

    alert.present();

  console.log(this.data);

  this.data = { title: '', description: '' };
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }

}
