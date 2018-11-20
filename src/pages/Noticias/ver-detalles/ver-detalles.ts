import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { SeleccionarCarreraPage } from "../../index.paginas";

@Component({
  selector: 'page-ver-detalles',
  templateUrl: 'ver-detalles.html',
})
export class VerDetallesPage {


  seleccionar: any = SeleccionarCarreraPage;

  noticia: any = {};
  data = { title: '', description: '' };

  titu1: string = '';
  titu2: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage
    
  ) {
    console.log(navParams);
    this.noticia = this.navParams.get('id');
    this.titu1 = this.noticia.titulo;

    console.log(this.noticia.descripcion);
    console.log(this.noticia.titulo);

    this.storage.set('titulo', this.titu1);

    console.log("titulo: ", this.titu1);
    
    /* ---------------------------------------------------------------------------------*/
  }


}
