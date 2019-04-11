import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the TransfertPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transfert',
  templateUrl: 'transfert.html',
})
export class TransfertPage {

  option: any;
  qrcodedata: any;
  payeur: string = localStorage.getItem('phone');
  nom: any = localStorage.getItem('nom')
  lat: number;
  long: number;
  phone: any;
  amount: any;
  plainData: any;

  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    public service: DataServiceProvider,
    public controle: DataControllerProvider,
    private geolocation: Geolocation,) {


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
    console.log('ionViewDidLoad TransfertPage');
  }


  onRecevoir() {
    this.navCtrl.push('RecevoirPage')
  }

  onServicePage() {
    this.navCtrl.push('PayerServicePage');
  }

  onScanner() {
    // this.route.navigate(['/payer-plateforme']);

    /////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////
    this.scanner.scan().then(barcodeData => {
      this.qrcodedata = barcodeData.text;
      //traitement à la recherche du type de qrcode
      this.controle.LoadinService();
      if (this.qrcodedata != '') {

        if (this.service.onDetectQrcodeType(this.qrcodedata) == 'phone') {
          this.plainData = this.service.nanaDecode(this.qrcodedata);
        } else {
          this.plainData = atob(this.qrcodedata);
        }

        setTimeout(() => {
          this.service.onScanneQRCode(btoa(this.payeur + '@' + this.long + '@' + this.lat + '#' + this.plainData)).subscribe(
            // this.service.onScanneQRCode(btoa(11 + '@' + 0.369874 + '@' + 5.36987 + '#' + 12 + '@' + 3500 + '@' + 5.36987 + '@' + 9.35665 + '@' + 'phone' + '@' + 1222325987)).subscribe(
            (res: any) => {
              console.log(res)
              if (res.message == 'Impossible de trouver cet utilisateur!') {
                this.controle.loadingDismiss();
                this.controle.toastPresent(res.message);
              } else {
                // this.navCtrl.push('PayerPage', { 'data': res });
                if (res.context == 'phone') {
                  // this.route.navigate(['/payer-phone', { 'name': res.name, 'amount': res.amount, 'prenom': res.second_name, 'receveur': res.marchand_id }]);
                  this.navCtrl.push('PayerPage', { 'data': res });
                  this.controle.loadingDismiss();
                } else if (res.context == 'plateform') {
                  this.controle.loadingDismiss();
                  this.navCtrl.push('PayerPlateformPage' , { 'data': res });
                  // this.route.navigate(['/payer-plateforme', { 'name': res.name, 'amount': res.amount, 'prenom': res.second_name }]);
                } else {
                  this.controle.loadingDismiss();
                  //  this.service.toastPresent('Impossible de traiter la demande...!', 'danger', 'ios');
                }
              }
            }, error => {
              this.controle.toastPresent('Erreur de Réseau...!');
              this.controle.loadingDismiss();
            }
          )
        }, 600)

      } else {
        this.controle.toastPresent('Erreur de Scan...!');
        this.controle.loadingDismiss();
      }
    }).catch(err => {
      console.log('nana' + 'wanda')
    });


  }



  onRetraitFinale() {
    const prompt = this.alertCtrl.create({
      title: 'Retrait en cour !',
      message: "Vous allez faire un retrait de " + this.amount + "f cfa." + "<br> Veuillez renseigner le mot de passe pour terminer l'opération.",
      inputs: [
        {
          name: 'password',
          type: 'password',
          placeholder: 'Mot de passe'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: data => {
            console.log(data);
            this.controle.LoadinService();
            this.service.onRetrait2(this.payeur, btoa(data.password)).subscribe(
              (res: any) => {
                console.log(res);
                if (res.code == true) {
                  console.log(btoa(data.password));
                  this.controle.AlerteServiceFinale('Succès...!', res.message, false, 'OK')
                } else {
                  console.log(data.password);
                  this.controle.AlerteServiceFinale('Désolé !!!', 'Votre mot de passe n\'est pas correct.', true, 'Réessayer');
                }
                this.controle.loadingDismiss();
              }, () => {
                console.log('désolé une erreur est survenue')
                this.controle.loadingDismiss();
                this.controle.AlerteService1()
              }
            )
            console.log('Saved clicked', data.password);
          }
        }
      ]
    });
    prompt.present();
  }



  onValidateRetrait() {
    this.controle.LoadinService();
    this.service.onRetrait().subscribe((res: any) => {
      console.log(res)
      if (res.status[0] == true) {
        this.amount = res.status[1].amount;
        this.onRetraitFinale();
      } else {
        this.controle.AlerteServiceFinale('Désolé !', res.status[1], true, 'Initier');
      }
      this.controle.loadingDismiss();
    }, error => {
      this.controle.loadingDismiss();
      this.controle.AlerteService1();
    })
  }


}
