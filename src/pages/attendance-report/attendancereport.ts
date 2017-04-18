import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-report',
  templateUrl: 'attendancereport.html'
})

export class AttendanceReport {
  show: boolean=false;

    
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

 
  clicked() {

      this.show = !this.show;
  }
 
 }

