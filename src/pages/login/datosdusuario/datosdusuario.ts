import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-datosdusuario',
  templateUrl: 'datosdusuario.html',
})
export class DatosdusuarioPage {
datos:any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
 
    console.log("llego a datos usuario");
    
    this.datos= this.navParams.get('id');
    //console.log(this.datos.email);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosdusuarioPage');
  }

}
