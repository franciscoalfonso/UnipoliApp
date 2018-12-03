import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavParams, NavController } from 'ionic-angular';

//paginas
import {
  HomePage, InformacionEventosPage, EnlacesPage, ConoceUnipoliPage,
  HorariosPage, OfertaAcademicaPage

} from '../index.paginas';


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
    private storage: Storage) {

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

        } break;

        case 'aspirante': {
          console.log("es un estudiante o un maestro");
          this.mostrarAlaAspirante = true;
        }
      }

    });

  }

}
