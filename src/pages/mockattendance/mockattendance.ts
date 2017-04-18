import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {DatePicker} from 'ionic-native';
import {Calendar} from 'ionic-native';
import {Platform} from 'ionic-angular';

@Component({
  selector: 'page-mockattendance',
  templateUrl: 'mockattendance.html'
})
export class MockattendancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,platform: Platform) {
    platform.ready().then(() => {
      let options = {
        date: new Date(),
        mode: 'date'
      }

  DatePicker.show(options).then(
    date => {
      alert('Selected date: ' + date);
    },
    error => {
      alert('Error: ' + error);
    }
  );
});


}
  }

  

