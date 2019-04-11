import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, Loading, LoadingController, ToastController } from 'ionic-angular';

/*
  Generated class for the DataControllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataControllerProvider {
  private load: Loading;

  constructor(
    public http: HttpClient,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public toastController: ToastController,


  ) {
    console.log('Hello DataControllerProvider Provider');
  }

  async toastPresent(message,) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  
  AlerteService1() {
    let alert = this.alertCtrl.create({
      title: 'Erreur de connexion',
      message: 'Désoler une erreur est survenue veuillez réssayer',
      buttons: [
        {
          text: 'Réessayer',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  AlerteService2(message) {
    let alert = this.alertCtrl.create({
      title: 'Identifiants incorrets',
      message: 'Désoler votre téléphone ou mot de passe est incorret. <br>' + message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }


  AlerteService3(message) {
    let alert = this.alertCtrl.create({
      title: 'Succès',
      message: 'Votre paiement c\'est déroulé avec succès. <br>' + message,
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  AlerteService4(message,) {
    let alert = this.alertCtrl.create({
      title: 'Identifiants incorrets',
      message: 'Désoler votre mot de passe est incorret. <br>' + message,
      buttons: [
        {
          text: 'Réessayer',
          handler: () => {
            console.log('Buy clicked');         
          }
        }
      ]
    });
    alert.present();
  }

  
  AlerteServiceFinale(title, message, option, boutton, ) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      enableBackdropDismiss: option,
      buttons: [
        {
          text: boutton,
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  LoadinService() {
    this.load = this.loadingCtrl.create({
      content: 'Veuillez patienter...'
    });

    this.load.present();
  }

  loadingDismiss() {
    this.load.dismiss();
  }


}
