import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Registro } from '../../../commons/registro';

import { Observable, } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {  DatosdusuarioPage } from '../../index.paginas';





@Component({
  selector: 'page-inforegistro',
  templateUrl: 'inforegistro.html',
})
export class InforegistroPage {

  usuario: string = "";
 
  private noticiasCollection: AngularFirestoreCollection<Registro>;

  noticias: Observable<Registro[]>;

  constructor(public navCtrl: NavController,
    private readonly afs: AngularFirestore,
    public navParams: NavParams) {
  

    this.usuario = this.navParams.get('email');
    console.log(this.usuario, ": variable para la consulta");

  }

  ionViewDidLoad() {
    try{
      this.noticiasCollection = this.afs.collection<Registro>("reg", ref => ref.where('email', '==', this.usuario));
      this.noticias = this.noticiasCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Registro;
          const id = a.payload.doc.id;
          return { id, ...data };
        }))
      );
    }catch (e) { 
      console.log(e);
    }
  }
 detalles(_noticia: Registro) {
    this.navCtrl.push(DatosdusuarioPage, {
      id: _noticia
    })
    

  }


}

