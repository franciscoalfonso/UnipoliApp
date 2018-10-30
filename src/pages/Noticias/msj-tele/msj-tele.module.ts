import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MsjTelePage } from './msj-tele';

@NgModule({
  declarations: [
    MsjTelePage,
  ],
  imports: [
    IonicPageModule.forChild(MsjTelePage),
  ],
})
export class MsjTelePageModule {}
