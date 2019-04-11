import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the ConnexionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {

  myForm: FormGroup;
  password: any;
  phone: any;
  //phone1: any = 698500871
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  phone1 : number;
  password1: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: DataServiceProvider,
    public control: DataControllerProvider,
    public fb: FormBuilder, ) {
    if (localStorage.getItem('phone') != null) {
      this.navCtrl.setRoot('TransfertPage');
    }

    var encrypted = this.service.set('123456$#@$^@1ERF', 'password@123456');
    var decrypted = this.service.get('123456$#@$^@1ERF', encrypted);

    console.log('Encrypted :' + encrypted);
    console.log('Encrypted :' + decrypted);


    this.myForm = this.fb.group({
      phone1: ['', [Validators.required, Validators.minLength(9)]],
      password1: ['', [Validators.required, Validators.minLength(3)]],
     // password_confirm1: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnexionPage');
    setTimeout(() => {
      let donne = this.service.nana('bonjour nana le developpeur');
      console.log("CXhaine de depart : " + donne );
      console.log("Chaine decodée : " + this.service.nanaDecode(donne));
      console.log(this.service.onDateComplet())
    }, 9000 )
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  opentabs() {
    this.control.LoadinService();
    this.service.onConnexion(this.phone, this.password).subscribe(
      (res: any) => {
        console.log(res)
        if (res[0] == false) {
          this.control.AlerteService2(res);
          this.control.loadingDismiss();
          console.log(res);
          return false;
        } else {
          console.log(res[0].name)
          localStorage.setItem('nom', res[0].name)
          localStorage.setItem('phone', res[0].authentication_token)
          this.navCtrl.setRoot('TransfertPage');
          this.control.loadingDismiss();
        }

      }, () => {
        this.control.loadingDismiss();
        this.control.AlerteService1();
      });
    // localStorage.setItem('phone', this.phone1);
    //this.navCtrl.setRoot('TabsPage');
  }

  openinscription() {
    this.navCtrl.push('InscriptionPage')
  }

}
