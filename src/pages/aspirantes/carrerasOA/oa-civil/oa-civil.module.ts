import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OaCivilPage } from './oa-civil';

@NgModule({
  declarations: [
    OaCivilPage,
  ],
  imports: [
    IonicPageModule.forChild(OaCivilPage),
  ],
})
export class OaCivilPageModule {}
