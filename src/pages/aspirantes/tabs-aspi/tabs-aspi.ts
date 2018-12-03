import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  CroquisUniPage,
  DirectorioInstiPage,
  OfertaAcademicaPage,
  UniversidadPage,
  ConoceUnipoliPage
} from '../../index.paginas';

@Component({
  selector: 'page-tabs-aspi',
  templateUrl: 'tabs-aspi.html'
})
export class TabsAspiPage {


  unipoliRoot = ConoceUnipoliPage;

  
  ofertaRoot = OfertaAcademicaPage;


  constructor(public navCtrl: NavController) { 
    console.log("llega a tabs de aspirante");
  }
  
  
}
