import { Component } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Alumno } from '../../commons/Alumno';

//paginas
import { HomePage, 
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
  
  private StudentCollection: AngularFirestoreCollection<Alumno>;
  student: Observable<Alumno[]>;
  
  alumno: any = {} ;

  constructor(private readonly afs: AngularFirestore,
    public navParams: NavParams
  ) {
    this.StudentCollection = this.afs.collection<Alumno>('reg');
    this.student = this.StudentCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Alumno;
        const id = a.payload.doc.id;
        return { id, ...data }
      }))
    );

    this.alumno = this.navParams.get('');
  }

  detalles(_alumno: Alumno) {
    /*
      admin: _alumno
    */
  }
}
