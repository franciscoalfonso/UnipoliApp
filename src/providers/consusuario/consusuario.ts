import { Injectable } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/Noticias/home/home';

@Injectable()
export class ConsulU{
    
  informacion_usuario: any = {};
  data = { carrera: '', admin: '' };

  admin: boolean;
  aspirante: boolean;
  ambiental: boolean;
  civil: boolean;
  manufactura: boolean;
  pymes: boolean;
  software: boolean;
  telematica: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    this.informacion_usuario = this.navParams.get('id');
    console.log(navParams);

    this.admin = this.informacion_usuario.admin;
    this.aspirante=  this.informacion_usuario.aspirante;

    this.ambiental = this.informacion_usuario.ambiental;
    this.civil = this.informacion_usuario.civil;
    this.manufactura = this.informacion_usuario.manufactura;
    this.pymes = this.informacion_usuario.pymes;
    this.software = this.informacion_usuario.software;
    this.telematica = this.informacion_usuario.telematica;

    console.log(this.informacion_usuario.software);
    console.log("llego a info de registro")

    if ( this.informacion_usuario.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "ambiental", 'admin': false });
    }
    if (this.admin == true && this.ambiental == true){
      this.navCtrl.push(HomePage, { 'carrera': "ambiental", 'admin': true });
    }
    if (this.admin == false && this.civil == true){
      this.navCtrl.push(HomePage, { 'carrera': "civil", 'admin': false });
    }
    if (this.admin == true && this.civil == true){
      this.navCtrl.push(HomePage, { 'carrera': "civil", 'admin': true });
    }
    if (this.admin == false && this.manufactura == true){
      this.navCtrl.push(HomePage, { 'carrera': "manufactura", 'admin': false });
    }
    if (this.admin == true && this.manufactura == true){
      this.navCtrl.push(HomePage, { 'carrera': "manufactura", 'admin': true });
    }
    if (this.admin == false && this.pymes == true){
      this.navCtrl.push(HomePage, { 'carrera': "pymes", 'admin': false });
    }
    if (this.admin == true && this.pymes == true){
      this.navCtrl.push(HomePage, { 'carrera': "pymes", 'admin': true });
    }
    if (this.admin == false && this.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "software", 'admin': false });
    }
    if (this.admin == true && this.software == true){
      this.navCtrl.push(HomePage, { 'carrera': "software", 'admin': true });
    }
    if (this.admin == false && this.telematica == true){
      this.navCtrl.push(HomePage, { 'carrera': "telematica", 'admin': false });
    } 
    else if (this.admin == true && this.telematica == true){
      this.navCtrl.push(HomePage, { 'carrera': "telematica", 'admin': true });
    }

  }

}