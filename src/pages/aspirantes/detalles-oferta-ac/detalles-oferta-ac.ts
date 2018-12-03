import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-detalles-oferta-ac',
  templateUrl: 'detalles-oferta-ac.html',
})
export class DetallesOfertaAcPage {
  
  noticia: any = {};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.noticia = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetallesOfertaAcPage');
  }

}
