import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { AboutPage } from '../Home/home';
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html'
})
export class ForgotpasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }
loginpage(){
  this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
}
Submit(){
    this.navCtrl.push(AboutPage);
    this.navCtrl.setRoot(AboutPage);
  }
}
