import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz1} from '../../pages/quiz_selected/quiz_selected';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import {Subject} from '../../models/Subject';
import {timetable_select} from '../../pages/timetable_select/timetable_select'
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import {TimeTableEdit} from '../../pages/timetable_edit/timetable_edit';
import{TimeTablePage} from '../timetable/timetable';
import {GlobalVars} from '../../providers/global-provider';
import {Login} from '../../models/login-model';

@Component({
  selector:'timetable-parent',
  templateUrl: 'timetable_parent.html'
})
export class timetable_parent {
  selected_standard:any;
  selected_section:any;
  selected_school_id: any;
  selected_day:any;
  login: Login[]  
  indx:number;
  selected_student_id:any;
  role: string;
  time_table_notification: TimeTable[];
  selected_student:string;
  selected_tt_date:any  = new Date().toISOString();
    constructor(public navCtrl: NavController,navParams: NavParams,
                public timetableProvider:TimetableProvider,
                public quiz: ClassProvider, public toastController: ToastController,
                public globalVars: GlobalVars) {
         
              
              this.login = this.globalVars.getMyGlobalVar()
              this.role  = this.globalVars.getMyGlobalrole()
              
              this.indx = 0 


if(this.role == "P") {

      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
            this.selected_student = x.student_name
            this.selected_student_id = x.student_id
            this.selected_standard = x.standard
            this.selected_section = x.section
            this.selected_school_id = x.school_id
           }
         
      }
  }
}



parseval(x) {

this.selected_student = x.student_name
this.selected_student_id = x.student_id
this.selected_standard = x.standard
this.selected_section = x.section
this.selected_school_id = x.school_id

console.log("Coming for the standard" + this.selected_standard)

}
 submitview(){

    this.navCtrl.push(TimeTablePage,{
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_student_name: this.selected_student,
                parm_tt_date: this.selected_tt_date});

}



}
