import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../hello-ionic/hello-ionic';

@Component({
  selector: 'page-halfyearly',
  templateUrl: 'halfyearly.html'
})
export class HalfyearlyPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  CloseExamView(){
    this.navCtrl.pop(HalfyearlyPage);
   
  }

}
