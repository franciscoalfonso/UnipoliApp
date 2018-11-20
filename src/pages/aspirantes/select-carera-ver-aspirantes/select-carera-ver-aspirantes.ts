import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage, InformacionEventosPage, VerAspirantesPage } from "../../index.paginas"

@Component({
  selector: 'page-select-carera-ver-aspirantes',
  templateUrl: 'select-carera-ver-aspirantes.html',
})
export class SelectCareraVerAspirantesPage {

  software: any;
  carrera: string = '';

  home: any = HomePage;
  noticiasRoot = InformacionEventosPage;

  constructor(
    public navCtrl: NavController,
) {  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlumnoPage');
  }

  send() {
    console.log(this.carrera);
    this.navCtrl.push(VerAspirantesPage, { 'carrera': this.carrera });
  }


}
