import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonComptePage } from './mon-compte';

@NgModule({
  declarations: [
    MonComptePage,
  ],
  imports: [
    IonicPageModule.forChild(MonComptePage),
  ],
})
export class MonComptePageModule {}
