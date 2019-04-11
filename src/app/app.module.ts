import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
// import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { DataControllerProvider } from '../providers/data-controller/data-controller';
import { HttpClientModule } from '@angular/common/http';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { NativeRingtones } from '@ionic-native/native-ringtones';
import { TextToSpeech } from '@ionic-native/text-to-speech';


@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
 
    BrowserModule,
   // HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
  ],
  providers: [
    StatusBar,
   // QRCodeModule,
   SocialSharing,
   Geolocation,
    BarcodeScanner,
    SplashScreen,
   // NativeRingtones,
    TextToSpeech,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DataServiceProvider,
    DataControllerProvider
  ]
})
export class AppModule { }
