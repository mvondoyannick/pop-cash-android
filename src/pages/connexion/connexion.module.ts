import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConnexionPage } from './connexion';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@NgModule({
  declarations: [
    ConnexionPage,
  ],
  imports: [
    IonicPageModule.forChild(ConnexionPage),
  ],
  providers:[
    
  ]

})
export class ConnexionPageModule {}
