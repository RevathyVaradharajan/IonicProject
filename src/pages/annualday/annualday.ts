import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-annualday',
  templateUrl: 'annualday.html'
})
export class AnnualdayPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


CloseAnnualDay(){
  this.navCtrl.pop(AnnualdayPage);
}
}
