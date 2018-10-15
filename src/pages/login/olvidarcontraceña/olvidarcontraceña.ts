import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from "../../../shared/models/user";
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-olvidarcontraceña',
  templateUrl: 'olvidarcontraceña.html',
})
export class OlvidarcontraceñaPage {
  user = {} as User;

  constructor(public toastCtrl: ToastController,  public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OlvidarcontraPage');
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Enviando instrucciones de restablecimiento de contraseña via correo electronico',
      duration: 10000
    });
    toast.present();
  }

}
