import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage,
MsjAmbPage,
MsjCivPage,
MsjManuPage,
MsjPyMPage,
MsjTelePage} from '../../index.paginas';

@Component({
  selector: 'page-mensajes-tabs',
  templateUrl: 'mensajes-tabs.html',
})
export class MensajesTabsPage {
  carrera: string='';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carrera = this.navParams.get('carrera');
console.log(this.carrera +"desde mensajes tabs")
    switch (this.carrera){
case "software": {
  this.navCtrl.setRoot(HomePage);
}
case "ambiental": {
  this.navCtrl.setRoot(MsjAmbPage);
}
case "telematica": {
  this.navCtrl.setRoot(MsjTelePage);
}
case "civil": {
  this.navCtrl.setRoot(MsjCivPage);
}
case "manufactura": {
  this.navCtrl.setRoot(MsjManuPage);
}
case "pymes": {
  this.navCtrl.setRoot(MsjPyMPage);
}

    }
  }



}
