import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CroquisUniPage,
DirectorioInstiPage,
PaaldohadeservirPage,
UniversidadPage} from '../../index.paginas';

/**
 * Generated class for the OfertaAcademicaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-oferta-academica',
  templateUrl: 'oferta-academica.html',
})
export class OfertaAcademicaPage {
  /*
  Iswp:any = IswPage; 
Ambp:any = OaAmbientalPage;
Civp:any = OaCivilPage;
Manp:any = OaManufacturaPage;
PyMp:any = OaPyMesPage;
Telp:any = OaTelePage;
*/

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OfertaAcademicaPage');
  }

}
