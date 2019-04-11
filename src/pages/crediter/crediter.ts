import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CrediterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-crediter',
  templateUrl: 'crediter.html',
})
export class CrediterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CrediterPage');
  }

   
  prompt() {
    const prompt = this.alertCtrl.create({
      title: 'Créditer son Compte',
      message: "Veuillez entrer le montant et votre mot de passe.",
      inputs: [
        {
          name: 'compte',
          type:'number',
          placeholder: 'Montant'
        },
        {
          name: 'cnititle',
          type: 'password',
          placeholder: ' Mot de passe'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let alert = this.alertCtrl.create({
              title: 'Succès !',
              subTitle: 'Cette opération c\'est bien déroulé...',
              buttons: ['OK']
            });
            alert.present();
          }
        }
      ]
    });
    prompt.present();
  }

  
}
