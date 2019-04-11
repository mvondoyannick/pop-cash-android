import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParametrePage } from './parametre';

@NgModule({
  declarations: [
    ParametrePage,
  ],
  imports: [
    IonicPageModule.forChild(ParametrePage),
  ],
})
export class ParametrePageModule {}
