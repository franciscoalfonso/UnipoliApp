import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-ver-detallesdel-aspirante',
  templateUrl: 'ver-detallesdel-aspirante.html',
})
export class VerDetallesdelAspirantePage {
   
  
  aspirante: any={};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.aspirante = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerDetallesdelAspirantePage');
  }

}
