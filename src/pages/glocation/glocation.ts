import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
 
@Component({
  selector: 'page-home',
  templateUrl: 'glocation.html'
})
export class glocationPage {
 
  constructor(public navCtrl: NavController, public locationTracker: LocationTracker) {
 
  }
 
  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
 
}