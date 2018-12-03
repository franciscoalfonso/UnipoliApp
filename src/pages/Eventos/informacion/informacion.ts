import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SeleccionarCarreraPage, HomePage } from "../../index.paginas"
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {
  seleccionar: any = SeleccionarCarreraPage;
  data = { title: '', description: '' };

  software: boolean;
  pymes: boolean;
  ambiental: boolean;
  civil: boolean;
  manufactura: boolean;
  telematica: boolean;
  softwarecont: number = 0;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  scheduleNotification() {

    this.data.title = this.navParams.get('title');
    this.data.description = this.navParams.get('desc');

    var date = new Date(this.data.title + " " + this.data.description);
    console.log(date);


    let alert = this.alertCtrl.create({
      title: 'Mensaje enviado!',
      subTitle: 'puedes ver los mensajes por carrera en el boton superior derecho',
      buttons: ['OK']
    });
    alert.present();

    if (this.software == true) {
      console.log("llego al caso 1 de software", this.softwarecont)
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "software" });
    }
    if (this.ambiental == true) {
      console.log("llego al caso 2 de ambiental");
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "ambiental" });
    }
    if (this.pymes == true) {
      console.log("llego al caso 3 de pymes");
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "pymes" });
    }
    if (this.civil == true) {
      console.log("llego al caso 4 de civil");
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "civil" });
    }
    if (this.manufactura == true) {
      console.log("llego al caso 5 de manufactura");
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "manufactura" });
    }
    if (this.telematica == true) {
      console.log("llego al caso 6 de telematica");
      this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera': "telematica" });
    }

    

    console.log(this.data);

    this.data = { title: '', description: '' };
    
  }

}

