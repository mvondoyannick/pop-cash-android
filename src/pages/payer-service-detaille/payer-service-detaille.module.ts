import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PayerServiceDetaillePage } from './payer-service-detaille';

@NgModule({
  declarations: [
    PayerServiceDetaillePage,
  ],
  imports: [
    IonicPageModule.forChild(PayerServiceDetaillePage),
  ],
})
export class PayerServiceDetaillePageModule {}
