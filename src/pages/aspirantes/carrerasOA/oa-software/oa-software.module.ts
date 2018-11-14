import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OaSoftwarePage } from './oa-software';

@NgModule({
  declarations: [
    OaSoftwarePage,
  ],
  imports: [
    IonicPageModule.forChild(OaSoftwarePage),
  ],
})
export class OaSoftwarePageModule {}
