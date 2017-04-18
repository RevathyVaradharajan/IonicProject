import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-grid2',
  templateUrl: 'grid2.html'
})
export class Grid2Page{
  grid2Page=Grid2Page;

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello Grid2 Page');
  }

}
