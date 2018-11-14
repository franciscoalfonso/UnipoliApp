import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SeleccionarCarreraPage, HomePage } from "../../index.paginas"
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Platform } from 'ionic-angular/platform/platform';

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

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private platform: Platform, private localNotifications: LocalNotifications,
    public navParams: NavParams) {
  }

  scheduleNotification() {

    this.data.title = this.navParams.get('title');
    this.data.description = this.navParams.get('desc');
   
    var date = new Date(this.data.title + " " + this.data.description);
    console.log(date);
    this.localNotifications.schedule({
      text: this.data.title,
      //at: date,
      led: 'FF0000',
      sound: this.setSound(),
    });

    let alert = this.alertCtrl.create({
      title: 'Enviado!',
      subTitle: 'Configuración de notificación con éxito',
      buttons: ['OK']
    });

    if (this.software == true){
      console.log("llego al caso 1 de software")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"software" });
    }
    if (this.ambiental == true){
      console.log("llego al caso 2 de ambiental")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"ambiental" });
    }
    if (this.pymes == true){
      console.log("llego al caso 3 de pymes")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"pymes" });
    }
    if (this.civil == true){
      console.log("llego al caso 4 de civil")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"civil" });
    }
    if (this.manufactura == true){
      console.log("llego al caso 5 de manufactura")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"manufactura" });
    }
    if (this.telematica == true){
      console.log("llego al caso 6 de telematica")
        this.navCtrl.push(HomePage, { 'titulo': this.data.title, 'descripcion': this.data.description, 'carrera':"telematica" });
    }
    
    alert.present();

    console.log(this.data);

    this.data = { title: '', description: '' };
  }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
}

