import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VerDetallesPage, SeleccionarCarreraPage, VerDetallesdelAspirantePage } from '../../index.paginas';
import { Aspirantes } from '../../../commons/Aspirantes';

@Component({
  selector: 'page-ver-aspirantes',
  templateUrl: 'ver-aspirantes.html',
})
export class VerAspirantesPage {
  
  homeg: any = VerDetallesPage;
  seleccionar: any = SeleccionarCarreraPage;
  carrera: string = ''; 
  aspide:string ='';

  private noticiasCollection: AngularFirestoreCollection<Aspirantes>;
  noticias: Observable<Aspirantes[]>;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private readonly afs: AngularFirestore) {
       
    
      this.carrera = this.navParams.get('carrera');
      this.aspide = this.carrera;
      
      console.log(this.carrera, ": esta carrera ver aspirantes");


      switch (this.carrera) {
        case "ambiental": {
          this.noticiasCollection = afs.collection<Aspirantes>("registro_aspirantes", ref => ref.where('carrera', '==', 'ambiental'));
          
          break;
        }
        case "software": {
          this.noticiasCollection = afs.collection<Aspirantes>('registro_aspirantes', ref => ref.where('carrera', '==', 'software'));
          break;
        }
        case "pymes": {
          this.noticiasCollection = afs.collection<Aspirantes>("registro_aspirantes", ref => ref.where('carrera', '==', 'pymes'));
          break;
        }
        case "manufactura": {
          this.noticiasCollection = afs.collection<Aspirantes>("registro_aspirantes", ref => ref.where('carrera', '==', 'manufactura'));
          break;
        }
        case "civil": {
          this.noticiasCollection = afs.collection<Aspirantes>("registro_aspirantes", ref => ref.where('carrera', '==', 'civil'));
          break;
        }
        case "telematica": {
          this.noticiasCollection = afs.collection<Aspirantes>("registro_aspirantes", ref => ref.where('carrera', '==', 'telematica'));

          break;
        }

  }
  this.noticias = this.noticiasCollection.snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data = a.payload.doc.data() as Aspirantes;
      const id = a.payload.doc.id;
      return { id, ...data };
    }))
  );
  
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerAspirantesPage');
  }

  detalles(_noticia: Aspirantes) {
    this.navCtrl.push(VerDetallesdelAspirantePage, {
      id: _noticia
    })

  }
}
