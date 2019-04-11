import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayerPlateformPage } from './payer-plateform';

@NgModule({
  declarations: [
    PayerPlateformPage,
  ],
  imports: [
    IonicPageModule.forChild(PayerPlateformPage),
  ],
})
export class PayerPlateformPageModule {}
