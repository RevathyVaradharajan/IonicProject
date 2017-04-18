import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Angular2maps page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-angular2maps',
  templateUrl: 'angular2maps.html'
})
export class Angular2mapsPage {
  title: string = 'Don Bosco,Chennai';
  lat: number = 13.03805831960818;
  lng: number = 80.19362217858496;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}


}
