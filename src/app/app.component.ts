import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SocialSharing } from '@ionic-native/social-sharing';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  nom: any = localStorage.getItem('nom')
  phone: any = localStorage.getItem('phone')
  lien: string = ' https://play.google.com/store/apps/details?id=cm.agis.pop';
  message: string = this.nom + ' Vous invites a installer POP_Cash via le lien suivant ' + this.lien;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public alertCtrl: AlertController, private social: SocialSharing) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.hide();
      statusBar.overlaysWebView(false);
      statusBar.styleLightContent();
      statusBar.backgroundColorByHexString('#471cd4');
      splashScreen.hide();
    });

    if (localStorage.getItem('phone') != null) {
      this.rootPage = 'TransfertPage';
    } else {
      this.rootPage = 'ConnexionPage'
    }

    setInterval(() => {
      this.nom = localStorage.getItem('nom');
    }, 4000)

  }

  onSocialShare() {

    if (localStorage.getItem('phone') != null) {
      this.social.share(this.message).then(() => {
        // Sharing via email is possible
      }).catch(() => {
        const confirm = this.alertCtrl.create({
          title: 'Partager !',
          message: 'Une erreur est survenue veuillez reprendre.',
          buttons: [
            {
              text: 'NON',
              handler: () => {
                console.log('Disagree clicked');
              }
            },
            {
              text: 'reprendre',
              handler: () => {
                this.onSocialShare();
              }
            }
          ]
        });
        confirm.present();
      });
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }

  onOperation() {
    if (localStorage.getItem('phone') != null) {
      this.nav.setRoot('TransfertPage')
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }

  onCompte() {
    if (localStorage.getItem('phone') != null) {
      this.nav.push('MonComptePage')
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }
  onHistry() {
    if (localStorage.getItem('phone') != null) {
      this.nav.push('HistoriquePage')
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }
  onAide() {
    if (localStorage.getItem('phone') != null) {
      this.nav.push('AidePage')
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }
  onApropos() {
    if (localStorage.getItem('phone') != null) {
      this.nav.push('AproposPage')
    } else {
      this.nav.setRoot('ConnexionPage');
    }
  }

  onDeconnecter() {

    if (localStorage.getItem('phone') != null) {
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
              this.nav.setRoot('ConnexionPage');
              localStorage.clear();
            }
          }
        ]
      });
      confirm.present();

    } else {
      this.nav.setRoot('ConnexionPage');
    }


  }
}
