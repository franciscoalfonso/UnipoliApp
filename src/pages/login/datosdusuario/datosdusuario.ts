import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../index.paginas';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-datosdusuario',
  templateUrl: 'datosdusuario.html',
})
export class DatosdusuarioPage {


  noticia: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage) {

    console.log("llego a datos usuario");
    this.noticia = this.navParams.get('id');
    console.log("email: ",this.noticia.email);
    console.log(this.noticia.software);
    console.log(this.noticia.telematica);
    console.log(this.noticia.ambiental);


    try {


      console.log("seleccionando la carrera del login")

      if (this.noticia.admin == true && this.noticia.ambiental == true) {
        this.storage.set('carrera', 'ambiental');
        this.storage.set('admin', 'true');
      }
      if (this.noticia.admin == false && this.noticia.ambiental == true) {
        this.storage.set('admin', 'false');
        this.storage.set('carrera', 'ambiental');
      }
      if (this.noticia.admin == false && this.noticia.civil == true) {
        this.storage.set('carrera', 'civil');
        this.storage.set('admin', 'false');
      }
      if (this.noticia.admin == true && this.noticia.civil == true) {
        this.storage.set('admin', 'true');
        this.storage.set('carrera', 'civil');
      }
      if (this.noticia.admin == false && this.noticia.manufactura == true) {
        this.storage.set('admin', 'false');
        this.storage.set('carrera', 'manufactura');
      }
      if (this.noticia.admin == true && this.noticia.manufactura == true) {
        this.storage.set('admin', 'true');
        this.storage.set('carrera', 'manufactura');
      }
      if (this.noticia.admin == false && this.noticia.pymes == true) {
        this.storage.set('admin', 'false');
        this.storage.set('carrera', 'pymes');
      }
      if (this.noticia.admin == true && this.noticia.pymes == true) {
        this.storage.set('admin', 'true');
        this.storage.set('carrera', 'pymes');
      }
      if (this.noticia.admin == false && this.noticia.software == true) {
        this.storage.set('admin', 'false');
        this.storage.set('carrera', 'software');
      }
      if (this.noticia.admin == true && this.noticia.software == true) {
        this.storage.set('admin', 'true');
        this.storage.set('carrera', 'software');
      }
      if (this.noticia.admin == false && this.noticia.telematica == true) {
        this.storage.set('admin', 'false');      
        this.storage.set('carrera', 'telematica');
      }
      else if (this.noticia.admin == true && this.noticia.telematica == true) {
        this.storage.set('admin', 'true');      
        this.storage.set('carrera', 'telematica');
      }
  
        this.navCtrl.setRoot(HomePage);

    } catch (e) { }
  }



}
