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
    timetab: Array<{periods:any, subjects:any}>;
    
    parm_standard: any
    parm_section:any 
    parm_school_id:number;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController) {

                this.parm_standard  = navParams.get('parm_standard');
                this.parm_section   = navParams.get('parm_section');
                this.parm_school_id = navParams.get('parm_school_id');

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
               today = '2017-01-01' 
               let date  = today                
               let day =  this.getDayOfWeek(date) 

               this.timetableGet (this.parm_standard, this.parm_section, day, date);
  }
      

  getDayOfWeek(date) {
          var dayOfWeek = new Date(date).getDay();    
          return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }

          

  
  timetableGet(class_id:any,section: any, day:any, tt_date:any) {
      this.timetableProvider
            .getTimetable(class_id,section,day,tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res},
                       err =>  this.errorToast()); 
  }

  
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
