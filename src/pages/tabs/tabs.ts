import { Component } from '@angular/core';


//paginas
import {
  HomePage,
  InformacionEventosPage,
  EnlacesPage,
  ConoceUnipoliPage,
  HorariosPage
} from '../index.paginas';
import { NavParams } from 'ionic-angular';



@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  noticiasRoot = HomePage;
  unipoliRoot = ConoceUnipoliPage;
  enlacesRoot = EnlacesPage;
  mensajesRoot = InformacionEventosPage;
  horariosRoot = HorariosPage;

  constructor() {

  }

}
