import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayerServicePage } from './payer-service';

@NgModule({
  declarations: [
    PayerServicePage,
  ],
  imports: [
    IonicPageModule.forChild(PayerServicePage),
  ],
})
export class PayerServicePageModule {}
