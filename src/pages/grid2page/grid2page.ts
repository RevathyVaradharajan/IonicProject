import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-grid2page',
  templateUrl: 'grid2page.html'
})
export class Grid2pagePage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Grid2pagePage Page');
  }

}
