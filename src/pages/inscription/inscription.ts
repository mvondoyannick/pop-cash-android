import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';
import { DataControllerProvider } from '../../providers/data-controller/data-controller';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage {

  myForm: FormGroup;
  nom: any;
  second_name: any;
  phone: number;
  password: any;
  cni: any;
  password_confirm: any;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  nom1: any;
  second_name1: any;
  phone1: number;
  password1: any;
  cni1: any;
  password_confirm1: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public service: DataServiceProvider,
    public control: DataControllerProvider,
    public alertCtrl: AlertController,
    public fb: FormBuilder, ) {
    if (localStorage.getItem('passwordconfirm') != null) {
      const prompt = this.alertCtrl.create({
        title: 'Finaliser la Creation',
        message: "Veuillez renseigner le code réçu par SMS.",
        enableBackdropDismiss: false,
        inputs: [
          {
            name: 'password',
            type: 'password',
            placeholder: 'Code'
          },
        ],
        buttons: [
          {
            text: 'Annuler',
            handler: () => {
              // this.navCtrl.pop();
              //   localStorage.removeItem('passwordconfirm')
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Valider',
            handler: data => {
              this.control.LoadinService();
              this.service.onCreatedCompteConfirm(localStorage.getItem('passwordconfirm'), data.password).subscribe(
                (res: any) => {
                  if (res.status == 'success') {
                    // this.control.AlerteService3(res)
                    localStorage.removeItem('passwordconfirm')
                    this.navCtrl.pop();
                  } else {
                    this.control.AlerteService4(res);
                  }
                  console.log(res)
                  this.control.loadingDismiss();
                }, () => {
                  console.log('désolé une erreur est survenue')
                  this.control.loadingDismiss();
                  this.control.AlerteService1()
                }
              )
              console.log('Saved clicked', data.password);
            }
          }
        ]
      });
      prompt.present();

    }

    this.myForm = this.fb.group({
      nom1: ['', [Validators.required, Validators.maxLength(50)]],
      second_name1: ['', [Validators.required, Validators.maxLength(50)]],
      phone1: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(20)]],
      cni1: ['', [Validators.required, Validators.maxLength(50)]],
      password1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password_confirm1: ['', [Validators.required, Validators.minLength(3)]]
    }); 


  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  onCompte() {
    console.log(this.password, this.password_confirm)

    if (this.password == this.password_confirm) {
      this.control.LoadinService();
      this.service.onCreatedCompte(this.nom, this.second_name, this.phone, this.cni, this.password).subscribe(
        (res: any) => {
          if (res.status[0] == true) {
            this.control.loadingDismiss()
            // this.navCtrl.pop();
            localStorage.setItem('passwordconfirm', res.status[1]);


            const prompt = this.alertCtrl.create({
              title: 'Finaliser la Creation',
              message: "Veuillez renseigner le code réçu par SMS.",
              enableBackdropDismiss: false,
              inputs: [
                {
                  name: 'password',
                  type: 'password',
                  placeholder: 'Code'
                },
              ],
              buttons: [
                {
                  text: 'Annuler',
                  handler: () => {
                    this.navCtrl.pop();
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'Valider',
                  handler: data => {
                    this.control.LoadinService();
                    this.service.onCreatedCompteConfirm(localStorage.getItem('passwordconfirm'), data.password).subscribe(
                      (res: any) => {
                        if (res.status == 'success') {
                          // this.control.AlerteService3(res)
                          localStorage.removeItem('passwordconfirm')
                          this.navCtrl.pop();
                        } else {
                          this.control.AlerteService4(res);
                        }
                        console.log(res)
                        this.control.loadingDismiss();
                      }, () => {
                        console.log('désolé une erreur est survenue')
                        this.control.loadingDismiss();
                        this.control.AlerteService1()
                      }
                    )
                    console.log('Saved clicked', data.password);
                  }
                }
              ]
            });
            prompt.present();


            console.log(this.phone)
            console.log(res);
          } else {
            this.control.loadingDismiss();
            this.control.AlerteService2(res.status);
            console.log(res);
          }
        }, () => {
          this.control.loadingDismiss();
          this.control.AlerteService1()
          console.log('Désolé monsieur')
        }
      )
    } else {
      this.control.toastPresent('Mot de passe non identique...!');
    }

  }


}
