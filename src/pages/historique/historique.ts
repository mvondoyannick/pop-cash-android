import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';

/**
 * Generated class for the HistoriquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {
  phone: any=localStorage.getItem('phone');
  historyData: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public service: DataServiceProvider, public controle: DataControllerProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');

    this.controle.LoadinService();
    this.service.onHistory(this.phone).subscribe((res: any[])=>{
      this.historyData = res ;
      console.log(res);
      this.controle.loadingDismiss();
    },error=>{
      let alert = this.alertCtrl.create({
        title: 'Erreur de connexion',
        message: 'Désoler une erreur est survenue veuillez réssayer',
        buttons: [
          {
            text: 'Réessayer',
            handler: () => {
              this.ionViewDidLoad();
              console.log('Buy clicked');
            }
          }
        ]
      });
      alert.present();
    //  this.controle.AlerteService1();
      this.controle.loadingDismiss();
    })
  }

}