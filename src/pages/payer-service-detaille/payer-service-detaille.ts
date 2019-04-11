import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the PayerServiceDetaillePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payer-service-detaille',
  templateUrl: 'payer-service-detaille.html',
})
export class PayerServiceDetaillePage {
  dataCategorie: any;
  qrcodedata: string;
  payeur: string = localStorage.getItem('phone');
  long: string;
  lat: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    public controle: DataControllerProvider,
    public service: DataServiceProvider, ) {
  }

  ionViewDidLoad() {

    this.dataCategorie = this.navParams.get('data').services;

    console.log('ionViewDidLoad PayerServiceDetaillePage');
  }


  onScanneBarecode() {
    this.scanner.scan().then(barcodeData => {
      this.qrcodedata = barcodeData.text;
      if (this.qrcodedata != '') {
        this.controle.LoadinService();
        this.service.onScanneQRCode(btoa(this.payeur + '@' + this.qrcodedata + '@' + this.long + '@' + this.lat)).subscribe(
          (res: any) => {
            console.log(res)
            if (res.message == 'errors') {
              this.controle.loadingDismiss();
              this.controle.AlerteService2(res.description)
            } else {
              this.navCtrl.push('PayerPage', { 'data': res });
              this.controle.loadingDismiss();
            }
          }, error => {
            this.controle.AlerteService1()
            this.controle.loadingDismiss();
          }
        )
      } else {
        this.controle.AlerteServiceFinale('Erreur Scan !', 'Veuillez avez annulez le scan.', true, 'OK');
        this.controle.loadingDismiss();
      }
    }).catch(err => {
      /**  console.log(Math.trunc(parseInt('5528.5abc33')/1000));
        console.log(Math.round(3.1 - parseInt('3.1')) * 10)
       console.log('Error', err);
        var str = "6985008711300";
        var sliced = str.slice(0, 9);
        console.log(parseInt(sliced));
        *****/
      console.log('nana' + 'wanda')
    });
  }



}
