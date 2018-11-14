import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OaTelematicaPage } from './oa-telematica';

@NgModule({
  declarations: [
    OaTelematicaPage,
  ],
  imports: [
    IonicPageModule.forChild(OaTelematicaPage),
  ],
})
export class OaTelematicaPageModule {}
