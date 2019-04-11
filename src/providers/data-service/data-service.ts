import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { Injectable } from '@angular/core';
// import swal from 'sweetalert';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataServiceProvider {
  // DataUrl_test: string = 'http://192.168.0.103:3000/api/v1/';
  // DataUrl_test: string = 'https://pop-cash.herokuapp.com/api/v1/';
  DataUrl_test: string = 'https://261cb183.ngrok.io/api/v1/';
  DataUrl_prod: string = 'https://pop-cash.herokuapp.com/api/v1/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json',
      'X-API-POP-KEY': localStorage.getItem('phone')
    })
  };
  constructor(public http: HttpClient) {
    console.log('Hello DataServiceProvider Provider');
  }




  /* permet de retourner une chaine de caracter avec @ comme separateur */
  onCreatedQRcode( phone, montant, long, lat, context, time) {
    //var chaineFinale;
    //pour dire que cela est generer depuis le mobile
    var chaine = phone + "@" + montant + "@" + long + "@" + lat + "@" + context + "@" + time;

    return chaine;
  }

  onDateComplet() {
    let date = new Date();
    let result = date.getTime();
    return result;
  }

  set(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }


  nana(value) {
    let key = 'cb20a3730d9e3f067ed91a6e458da82d';
    var enc = CryptoJS.AES.encrypt(value, key);
    return enc.toString();
  }

  nanaDecode(value) {
    let key = 'cb20a3730d9e3f067ed91a6e458da82d';
    var word = value;
    var decrp = CryptoJS.AES.decrypt(word.toString(), key);
    var result = decrp.toString(CryptoJS.enc.Utf8);
    return result;
  }

  get(keys, value) {
    var key = CryptoJS.enc.Utf8.parse(keys);
    var iv = CryptoJS.enc.Utf8.parse(keys);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }



  onCreatedCompte(nom, second_name, phone, cni, password) {
    let postData = {
      "nom": nom,
      " second_name": second_name,
      "phone": phone,
      "cni": cni,
      "password": password
    }
    return this.http.post(this.DataUrl_test + 'session/signup', postData, {});
  }

  onCreatedCompteConfirm(phone, code) {
    return this.http.post(this.DataUrl_test + 'session/validate/authentication', { phone, code }, {});
  }

  onConnexion(phone, password) {
    return this.http.post(this.DataUrl_test + 'session/signin', { phone, password }, {});
  }

  onPaiement(payeur, receveur, montant, password) {
    let postData = {
      "token": payeur,
      "receveur": receveur,
      "montant": montant,
      "password": password
    }
    return this.http.get(this.DataUrl_test + 'session/transaction/' + payeur + '/' + receveur + '/' + montant + '/' + password)
  }

  onScanneQRCode(qrcode) {
    return this.http.get(this.DataUrl_test + 'session/qrcode/' + qrcode)
  }


  onHistory(phone) {
    return this.http.get(this.DataUrl_test + 'session/history/' + phone)
  }

  onSolde(phone, password) {
    return this.http.get(this.DataUrl_test + 'session/get_balance/' + phone + '/' + password)
  }

  onRetrait() {
    return this.http.post(this.DataUrl_test + 'session/check_retrait/', {}, this.httpOptions)
  }

  onRetrait2(token, password) {
    return this.http.get(this.DataUrl_test + 'session/validate_retrait/' + token + '/' + password)
  }

  onServiceCategorie() {
    return this.http.get(this.DataUrl_test + 'session/categories/')
  }
  onServiceCategorieDetail(id) {
    return this.http.post(this.DataUrl_test + 'session/service/', { id }, this.httpOptions)
  }
  onFactureScanne() {

  }

  //Prend le QRcode, le decore et retourn la plateforme platrform | phone
  onDetectQrcodeType(qrcode){
    //on decode la chaine avec atob
    let chaine = atob(qrcode);

    //le resltat final
    let result : string;

    //indice de recherche
    let phone : string = "phone";
    let plateform : string = "plateform";

    //on engage la recherche
    if (chaine.indexOf(phone)  < 0 ){
      if (chaine.indexOf(plateform) < 0 ){
        result = "Fraude";
        return result;
      } else {
        result = "plateform";
        return result;
      }
    } else {
      result = "phone";
      return result;
    }
  }
}
