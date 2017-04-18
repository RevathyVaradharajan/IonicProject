import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NotifyhomePage } from '../notifyhome/notifyhome';

/*
  Generated class for the Notifythanks page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifythanks',
  templateUrl: 'notifythanks.html'
})
export class NotifythanksPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  Backtonotifications(){
  this.navCtrl.push(NotifyhomePage );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotifythanksPage');
  }

}
