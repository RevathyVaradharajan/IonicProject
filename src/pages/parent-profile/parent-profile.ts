import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ParentProvider} from '../../providers/parent-provider';

import {Student} from '../../models/Student';

import {Timetable2} from '../time-table2/time-table2';

/*
  Generated class for the StudentProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'parent-profile.html',
    providers: [ParentProvider]
})
export class ParentProfile {

standard: string[];
      section: string[];
    students: Student[];    
pProvider: ParentProvider;

    fetch_data(myid)
    {
        //this.students = []; //flush the array and then load
        //alert("Hello:" + myid);
      this.pProvider
        .load(myid)
        .then(users => this.students = <Student[]>users);  
    }
    
//can access as user[0].id etc.
constructor(public navCtrl: NavController, parentProvider: ParentProvider) {
    this.pProvider = parentProvider;
    
     this.standard = [
  'LKG',
  'UKG',
  'I STD'];
  
      this.section = [
  'A',
  'B',
  'C'];
    
    /*parentProvider
        .load(2)
        .then(users => this.students = users);
        */
  }
    
showtimetable() {
    this.navCtrl.push(Timetable2,{});
    }

}
