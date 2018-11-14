import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SeleccionarCarreraPage } from "../../index.paginas";

@Component({
  selector: 'page-ver-detalles',
  templateUrl: 'ver-detalles.html',
})
export class VerDetallesPage {

  
  seleccionar: any = SeleccionarCarreraPage;

  noticia:any = {};


  constructor(public navCtrl: NavController, public navParams: NavParams) {
     
      console.log(navParams);
      this.noticia= this.navParams.get('id');
      console.log(this.noticia.descripcion);
      console.log(this.noticia.titulo);
      
  }


}
