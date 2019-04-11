import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the PayerServicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payer-service',
  templateUrl: 'payer-service.html',
})
export class PayerServicePage {

  option: any;
  qrcodedata: any;
  payeur: string = localStorage.getItem('phone');
  nom: any = localStorage.getItem('nom')
  lat: number;
  long: number;
  data:any ;
  dataCategorie: any;
  plainData: string;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public scanner: BarcodeScanner,
    public service: DataServiceProvider,
    public controle: DataControllerProvider,
    private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.service.onServiceCategorie().subscribe((res:any)=>{
      console.log(res)
      this.dataCategorie = res.categories
    },error=>{

    });
    console.log('ionViewDidLoad PayerServicePage');
  }

  onServiceDetail(categorie){
    console.log(categorie.id)
    this.service.onServiceCategorieDetail(categorie.id).subscribe((res:any)=>{
      console.log(res)
      this.navCtrl.push('PayerServiceDetaillePage', { data: res})
    },error=>{

    })
  }

  onScanner() {
    this.navCtrl.push('PayerServicePage')

    this.controle.LoadinService();

    this.geolocation.getCurrentPosition({ timeout: 20000, enableHighAccuracy: true }).then((resp) => {
      this.controle.loadingDismiss();
      this.lat = resp.coords.latitude;
      this.long = resp.coords.longitude;
/////////////////////////////////////////////////////////////


this.controle.LoadinService();
 this.plainData = this.service.nanaDecode('U2FsdGVkX19bI2tJa6dbsiTlTLE9uh+rPcQ7pX4hi2ZpHX5JvPlJMqUwVUIVU1JduiQwec5EDAwVKirnSdb1WCjpzpjn7S0/1lJYR6uNeuSEQMnzsAGjfZUIfTtLvn35');
this.service.onScanneQRCode(btoa(this.payeur + '@' + this.long + '@' + this.lat + '#' + this.plainData)).subscribe(
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


////////////////////////////////////////////////





      this.scanner.scan().then(barcodeData => {
        this.qrcodedata = barcodeData.text;
        if (this.qrcodedata != '') {
          this.controle.LoadinService();
          let plainData = this.service.nanaDecode(this.qrcodedata);
          this.service.onScanneQRCode(btoa(this.payeur + '@' + this.long + '@' + this.lat + '#' + plainData)).subscribe(
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

    }).catch((error) => {
      this.controle.loadingDismiss();
      this.controle.AlerteServiceFinale('Erreur GPS !', 'Veuillez activer votre GPS.', true, 'OK');
      console.log('Error getting location', error);
    });


  }


}
