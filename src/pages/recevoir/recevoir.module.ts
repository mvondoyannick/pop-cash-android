import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QRCodeModule } from 'angularx-qrcode';
import { RecevoirPage } from './recevoir';

@NgModule({
  declarations: [
    RecevoirPage,
  ],
  imports: [
    QRCodeModule,
    IonicPageModule.forChild(RecevoirPage),
  ],
})
export class RecevoirPageModule {}
