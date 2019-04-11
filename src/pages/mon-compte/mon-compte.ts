import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { DataServiceProvider } from '../../providers/data-service/data-service';

/**
 * Generated class for the MonComptePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mon-compte',
  templateUrl: 'mon-compte.html',
})
export class MonComptePage {
  token: any= localStorage.getItem('phone');
  amount: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public controle: DataControllerProvider,
    public service: DataServiceProvider,
    public alertCtrl: AlertController, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MonComptePage');
  }

onParametre(){
  this.navCtrl.push('ParametrePage');
}
onCrediter(){
  this.navCtrl.push('CrediterPage');
}
  onDeconnecter() {
    const confirm = this.alertCtrl.create({
      title: 'Déconnection !',
      message: 'Se déconnecter de cette application.',
      buttons: [
        {
          text: 'NON',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OUI',
          handler: () => {
            this.navCtrl.setRoot('ConnexionPage');
            localStorage.clear();
          }
        }
      ]
    });
    confirm.present();

  }



  onValidateSolde() {
    const prompt = this.alertCtrl.create({
      title: 'Consulter votre Solde !',
      message: "Veuillez renseigner le mot de passe pour terminer l'opération.",
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
            this.controle.LoadinService();
            this.service.onSolde(this.token, data.password).subscribe(
              res => {
                console.log(res);
                if (res[0] == true) {
                  this.controle.AlerteServiceFinale('Mon solde...!', res[1], false, 'OK')
                } else {
                  this.controle.AlerteServiceFinale('Désolé !!!', 'Votre mot de passe n\'est pas correct.', true, 'Réessayer' )
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






  onRetraitFinale() {
    const prompt = this.alertCtrl.create({
      title: 'Retrait en cour !',
      message: "Vous allez faire un retrait de " + this.amount + " f cfa." + "<br> Veuillez renseigner le mot de passe pour terminer l'opération.",
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
            this.controle.LoadinService();
            this.service.onRetrait2(this.token, data.password).subscribe(
             (res: any) => {
                console.log(res);
                if (res.code == true) {
                  this.controle.AlerteServiceFinale('Succès...!', res.message, false, 'OK')
                } else {
                  this.controle.AlerteServiceFinale('Désolé !!!', 'Votre mot de passe n\'est pas correct.', true, 'Réessayer' );
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



  onValidateRetrait(){
    this.controle.LoadinService();
    this.service.onRetrait().subscribe((res: any)=>{
      console.log(res)
      if(res.status == true){
        this.amount = res.message.amount;
        this.onRetraitFinale();
      }else{
        this.controle.AlerteServiceFinale( 'Désolé !', res.message, true, 'Initier');
      }
      this.controle.loadingDismiss();
    },error=>{
      this.controle.loadingDismiss();
      this.controle.AlerteService1();
    })
  }


}
