import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CroquisUniPage,
  DirectorioInstiPage,
  OfertaAcademicaPage,
  PaaldohadeservirPage,
  UniversidadPage} from '../../index.paginas';
  
@Component({
  selector: 'page-tabs-aspi',
  templateUrl: 'tabs-aspi.html'
})
export class TabsAspiPage {

  ofertaAcademicaRoot = OfertaAcademicaPage;
  universidadRoot = UniversidadPage;
  croquisUniRoot = CroquisUniPage;
  directorioInstiRoot = DirectorioInstiPage;
  paaldohadeservirRoot = PaaldohadeservirPage;


  constructor(public navCtrl: NavController) {}

}
