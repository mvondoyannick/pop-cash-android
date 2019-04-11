
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the PayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payer-plateform',
  templateUrl: 'payer-plateform.html',
})
export class PayerPlateformPage {

  phone: any;
  qrcodedata: any;
  montant: any;
  receveur: any;
  receveur_name: any;
  password: string;
  payeur: string = localStorage.getItem('phone');
  data: any;
  date: any;

  myForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public scanner: BarcodeScanner,
    public service: DataServiceProvider,
    public controle: DataControllerProvider,
    public fb: FormBuilder,
    private tts: TextToSpeech, ) {

    this.data = this.navParams.get('data')
    this.receveur = this.data.marchand_id;
    this.receveur_name = this.data.name;
    //this.montant = this.data.amount;
    this.date = this.data.date

    this.myForm = this.fb.group({
      montant1: ['', [Validators.required, Validators.minLength(2), Validators.min(25)]],
      password1: ['', [Validators.required, Validators.minLength(3)]],
      // password_confirm1: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayerPage');
  }

  onAnnule() {
    this.navCtrl.pop();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  /** 
    onScanner() {
      this.scanner.scan().then(barcodeData => {
        this.qrcodedata = barcodeData.text;
        this.controle.LoadinService();
        this.service.onScanneQRCode(this.payeur + '@' + this.qrcodedata).subscribe(
          (res: any) => {
            console.log(res)
            this.receveur = res.marchand_phone;
            this.receveur_name = res.marchand_name;
            this.montant = res.amount;
            this.controle.loadingDismiss();
          }, error => {
            this.controle.AlerteService1()
            this.controle.loadingDismiss();
          }
        )
  
      }).catch(err => {
        console.log(this.montant, 'nanana')
        /**  console.log(Math.trunc(parseInt('5528.5abc33')/1000));
          console.log(Math.round(3.1 - parseInt('3.1')) * 10)
         console.log('Error', err);
          var str = "6985008711300";
          var sliced = str.slice(0, 9);
          console.log(parseInt(sliced));
        console.log('nana' + 'wanda')
      });
    }
  ***/


  onValidate() {

    this.controle.LoadinService();
    this.service.onPaiement(this.payeur, this.receveur, this.montant, this.password).subscribe(
      (res: any) => {
        console.log(this.receveur + "+" + this.montant + "+" + this.password);
        if (res.message[0] == true) {
          this.controle.AlerteServiceFinale('Succès !', res.message[1], false, 'OK');
          this.tts.speak('Thanks you')
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
          this.navCtrl.pop();
        } else {
          this.controle.AlerteServiceFinale('Identifiants incorrect !', res.message[1], true, 'REPRENDRE');
        }
        console.log(res)
        this.controle.loadingDismiss();
      }, error => {
        console.log('désolé une erreur est survenue')
        this.controle.loadingDismiss();
        this.controle.AlerteService1()
      }
    )

  }





}

