import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlumnoPage } from '../alumno/alumno';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SelectCareraVerAspirantesPage } from '../../aspirantes/select-carera-ver-aspirantes/select-carera-ver-aspirantes';
import { BtnInicioAdminPage } from '../btn-inicio-admin/btn-inicio-admin';


@Component({
  selector: 'page-seleccionar-carrera',
  templateUrl: 'seleccionar-carrera.html',
})
export class SeleccionarCarreraPage {
  alumno: any = AlumnoPage;
  login: any = LoginPage;
  admin: string;
  mostrar: any;
  mostrarAlaAspirante: any;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {

    Promise.all([this.storage.get("admin")]).then(values => {
      console.log("a", values[0]);
      this.admin = values[0];

      console.log("el usuario es admin= ", this.admin)

      switch (this.admin) {
        case 'true': {
          this.mostrar = true;
        } break;
        case 'false': {
          this.mostrar = false;
        } break;
        case 'aspirante': {
          this.mostrarAlaAspirante = true;
        }
        /* funcion del boton de cerrar sesion
        case 'cerrar': {
          console.log("cerro secion");
          
          this.mostrarAlaAspirante = true;
          this.mostrar = false;
        }*/
      }
    });



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SeleccionarCarreraPage');
  }
  perfil(value) {

    console.log(value);
    if (value == 'alu') {
      this.navCtrl.setRoot(AlumnoPage);

    } if (value == 'aspirantes') {
      this.navCtrl.setRoot(SelectCareraVerAspirantesPage);
    }
    /*
    if(value == 'cerrar'){
      
      this.storage.set('loggeo', 'false');
      this.navCtrl.setRoot(LoginStatePage);
          }*/

    if (value == 'profe') {
      this.navCtrl.setRoot(LoginPage);
    }
    else if (value == 'esprofesor') {
      this.navCtrl.setRoot(BtnInicioAdminPage);


    }
  }

}

