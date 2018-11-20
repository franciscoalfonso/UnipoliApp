import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-paginadecarga',
  templateUrl: 'paginadecarga.html',
})
export class PaginadecargaPage {
loggeado : any;
  constructor(public navCtrl: NavController,
    private storage: Storage,
     public navParams: NavParams) {
   
      
      this.storage.set('loggeo', 'salir');

 
          this.navCtrl.setRoot(TabsPage);
        
          //this.navCtrl.setRoot(TabsPage);
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginadecargaPage');
  }

}
