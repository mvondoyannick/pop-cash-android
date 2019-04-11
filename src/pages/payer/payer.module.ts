import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayerPage } from './payer';

@NgModule({
  declarations: [
    PayerPage,
  ],
  imports: [
    IonicPageModule.forChild(PayerPage),
  ],
})
export class PayerPageModule {}
