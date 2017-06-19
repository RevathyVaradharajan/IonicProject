import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import {AboutPage} from '../Home/home';
//import { AboutPage } from '../home/home';
import {AttendanceView}  from '../attendanceview/attendanceview';
import * as moment from 'moment';

@Component({
  selector: 'attendance-selected',
  templateUrl: 'attendance_selected.html'
})
export class Attendance2Page{
    time_table: TimeTable = new TimeTable();
    time_table_notification: TimeTable[];
    time_notification: TimeTable[];
    timetab: Array<{periods:any, subjects:any}>;
    date:any;
    parm_standard: any
    parm_section:any 
    parm_school_id:number;
    attendance_check:boolean;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController) {

                this.parm_standard  = navParams.get('parm_standard');
                this.parm_section   = navParams.get('parm_section');
                this.parm_school_id = navParams.get('parm_school_id');
                this.time_notification = new Array<TimeTable>();

                let  today: any = new Date();
                let  dd: any    = today.getDate();
                let  mm: any    = today.getMonth()+1; //January is 0!
                let  yyyy: any  = today.getFullYear();
                let  month: string;        
              
                if(dd<10) {
                    dd='0'+dd
                } 

                if(mm<10) {
                    mm='0'+mm
                } 

               today = yyyy+'-'+mm+'-'+dd;
               //today = '2017-05-20' 
                this.date  = today                
               let day =  this.getDayOfWeek(this.date) 

               this.timetableGet (this.parm_standard, this.parm_section, day, this.date);
  }
      
  getDayOfWeek(date) {
          var dayOfWeek = new Date(date).getDay();    
          return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

  timetableGet(class_id:any,section: any, day:any, tt_date:any) {
      this.timetableProvider
            .getTimetable(class_id,section,day,tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res, this.loadattendance()},
                       err =>  this.errorToast()); 
  }

loadattendance(){

    for(let n of this.time_table_notification){

        let s: TimeTable = new TimeTable()

    if( n.attendance_required){

        s.attendance_required = n.attendance_required
        s.class_id= this.parm_standard,
        s.section =  this.parm_section,
        s.school_id= this.parm_school_id,
        s.period = n.period,
        s.subject = n.subject,
        s.start_time = n.start_time,
        s.end_time = n.end_time,
        s.teacher_name =n .teacher_name
        this.time_notification.push(s)  

    }
    console.log("attendance" + n.attendance_required)
}}
  
  successToastreturn() {

        let toast = this.toastController.create({
        message: "Timetable updated to database",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

  errorToast() {
    let toast = this.toastController.create({
        message: "Timetable not loaded, please try after sometime",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }

    home(){
     this.navCtrl.push(AboutPage);
     this.navCtrl.setRoot(AboutPage);
    }
    
    toggle(n) {

           console.log("I am coming for the value of toggle" + n.period)  

           this.navCtrl.push(AttendanceView, {
           parm_standard: this.parm_standard,
           parm_section:  this.parm_section,
           parm_school_id: this.parm_school_id,
           parm_period: n.period,
           parm_subject:n.subject,
           parm_start_time:n.start_time,
           parm_end_time:n.end_time,
           parm_teacher:n.teacher_name});
        }

  submit(){
      this.navCtrl.push(AttendanceView, {
          parm_standard: this.parm_standard,
           parm_section:  this.parm_section,
           parm_school_id: this.parm_school_id
           
      });
  }

}
