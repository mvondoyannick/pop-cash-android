import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AidePage } from './aide';

@NgModule({
  declarations: [
    AidePage,
  ],
  imports: [
    IonicPageModule.forChild(AidePage),
  ],
})
export class AidePageModule {}
