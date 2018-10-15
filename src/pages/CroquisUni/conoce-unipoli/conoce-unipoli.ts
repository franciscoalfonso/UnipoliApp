import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AreasDeportivasYCafeteriasPage,
  Ud1Page,
  Ud2Page,
  Ud3Page,
  CentroInformacionPage,
  LaboratoriosPage,
  SeleccionarCarreraPage
} from '../../index.paginas';





@Component({
  selector: 'page-conoce-unipoli',
  templateUrl: 'conoce-unipoli.html',
})
export class ConoceUnipoliPage {
  
  seleccionar: any = SeleccionarCarreraPage;
  areas:any = AreasDeportivasYCafeteriasPage
  ud1:any = Ud1Page
  ud2:any = Ud2Page
  ud3:any = Ud3Page
  centro_informacion:any = CentroInformacionPage
  laboratorios:any = LaboratoriosPage


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConoceUnipoliPage');
  }

}
