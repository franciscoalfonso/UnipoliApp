import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SeleccionarCarreraPage } from '../../index.paginas';


@Component({
  selector: 'page-ver-detalles-croquis',
  templateUrl: 'ver-detalles-croquis.html',
})
export class VerDetallesCroquisPage {
  seleccionar: any = SeleccionarCarreraPage;

  sitio: any = {} ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
    console.log(navParams);
    this.sitio = this.navParams.get('id');
  }


}
