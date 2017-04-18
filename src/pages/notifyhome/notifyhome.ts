import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NotifybydatePage} from '../notification/notification';
import {notifyPage} from '../notification_selected/notification_selected';
import { AboutPage } from '../Home/home';
@Component({
  selector: 'page-notifyhome',
  templateUrl: 'notifyhome.html'
})
export class NotifyhomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  Gotodatepage(){
    this.navCtrl.push(NotifybydatePage);
  }
  Gotodaypage(){
   this.navCtrl.push(notifyPage);
  }
  home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}

}
