import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the RecevoirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recevoir',
  templateUrl: 'recevoir.html',
})
export class RecevoirPage {
  @ViewChild('focusInput') myInput: TextInput;

  recevoir: any;
  optionMontant: any;
  montant: number;
  myAngularxQrCode: any;
  phone: string = localStorage.getItem('phone')
  lat: number;
  long: number;
  id: any;
  amount: string;

  // nom: string= localStorage.getItem('nom')

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private geolocation: Geolocation,
    public controle: DataControllerProvider,
    public service: DataServiceProvider) {
    /// this.recevoir = true;
    this.myAngularxQrCode = this.montant;
    setTimeout(() => {
      this.myInput.setFocus();
    }, 500);

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;

    }).catch((error) => {
      this.controle.loadingDismiss();
      // this.controle.AlerteServiceFinale('Erreur GPS !', 'Veuillez activer votre GPS.', true, 'OK')
      console.log('Error getting location', error);
    });

  }


  ionViewDidLoad() {


    this.recevoir = true;
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


  onAnnule() {
    this.navCtrl.pop();
  }

  onValidePayement() {

    if (this.montant < 25) {
      this.controle.AlerteServiceFinale('Montant insuffisant !', 'Désolé le montant de la transaction ne peux pas etre inférieur à 25 f cfa.', true, 'REPRENDRE');
    } else if (this.montant == null) {
      this.controle.toastPresent('Entrer un montatnt...!');
    } else {
      this.myAngularxQrCode = this.service.nana(this.service.onCreatedQRcode(this.phone, this.montant, this.long, this.lat, 'phone', this.service.onDateComplet()));
      this.recevoir = false;
      this.optionMontant = true;
      console.log("qr : " + this.myAngularxQrCode);
      console.log(atob(this.myAngularxQrCode));
      console.log(this.long, this.lat)
    }
    // this.controle.loadingDismiss()
    // console.log(this.service.onCreatedQRcode(this.id, this.phone, this.montant, 0, 33, 'phone', '11'))
    //  console.log(this.service.nana(this.service.onCreatedQRcode(this.id, this.phone, this.montant, 0, 33, 'phone', '11')));
    //  this.controle.LoadinService()

  }



}
