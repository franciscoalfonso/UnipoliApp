import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage, TabsPage } from '../../index.paginas';

@Component({
  selector: 'page-datosdusuario',
  templateUrl: 'datosdusuario.html',
})
export class DatosdusuarioPage {


  noticia: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams) {

    console.log("llego a datos usuario");
    this.noticia = this.navParams.get('id');
    console.log(this.noticia.email);
    console.log(this.noticia.software);
    console.log(this.noticia.telematica);
    console.log(this.noticia.ambiental);


try{

    
    console.log("seleccionando la carrera del login")

    if ( this.noticia.admin == true && this.noticia.ambiental == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "ambiental" });
      
    }
    if (this.noticia.admin == true && this.noticia.ambiental == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "ambiental" });
      
    }
    if (this.noticia.admin == false && this.noticia.civil == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "civil" });
      
    }
    if (this.noticia.admin == true && this.noticia.civil == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "civil" });
      
    }
    if (this.noticia.admin == false && this.noticia.manufactura == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "manufactura" });
      
    }
    if (this.noticia.admin == true && this.noticia.manufactura == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "manufactura" });
      
    }
    if (this.noticia.admin == false && this.noticia.pymes == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "pymes" });
      
    }
    if (this.noticia.admin == true && this.noticia.pymes == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "pymes" });
      
    }
    if (this.noticia.admin == false && this.noticia.software == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': 'software' });
    }
    if (this.noticia.admin == true && this.noticia.software == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': 'software' });
    }
    if (this.noticia.admin == false && this.noticia.telematica == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "telematica" });
      
    }
    else if (this.noticia.admin == true && this.noticia.telematica == true) {
      this.navCtrl.setRoot(TabsPage);
      this.navCtrl.push(HomePage, { 'carrera': "telematica" });
      
    }


  }catch(e){}
  }



}
