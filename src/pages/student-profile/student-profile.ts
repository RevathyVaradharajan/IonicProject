import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {StudentProvider} from '../../providers/student-provider';

import {Student} from '../../models/Student';

/*
  Generated class for the StudentProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'student-profile.html',
    providers: [StudentProvider]
})
export class StudentProfile {

students: Student[];    
//var myVar;

//can access as user[0].id etc.
constructor(public navCtrl: NavController, studentProvider: StudentProvider) {
    studentProvider
        .load()
        .then(users => this.students = users);
  }

}
