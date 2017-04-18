import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
@Component({
  selector: 'page-navgrid',
  templateUrl: 'navgrid.html'
})
export class NavgridPage {
 selectedItem: any;
  names:string [];
  
  
  constructor(public navCtrl: NavController,public navParams: NavParams) {
  /*this.navCtrl.setRoot(NavgridPage);*/
    this.selectedItem = navParams.get('name');
    
   
    }
    
    }

