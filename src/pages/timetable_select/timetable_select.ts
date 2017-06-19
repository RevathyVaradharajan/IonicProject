import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';
import {Subject} from '../../models/Subject';
import {ClassProvider} from '../../providers/class-provider';
import {ClassReferenceTime} from '../../models/ClassReferenceTime';
import {Teacher} from '../../models/Teacher';
import { AboutPage } from '../Home/home';

@Component({
  selector:'time-table-select',
  templateUrl: 'timetable_select.html'
})
export class timetable_select {
    time_table: TimeTable= new TimeTable();
    selected_id: any;
    selected_school_id:any;
    selected_class_id: any;
    selected_start_time: any;
    selected_end_time: any;
    selected_period: any;
    selected_attendance_required: any;
    selected_tt_date: any;
    selected_subject:any;
    time_table_notification: TimeTable[];
    table_notification: TimeTable = new TimeTable();
    selected_section:any;
    //time_table_post: TimeTable = new TimeTable();
    timetab: Array<{periods:any, subjects:any}>;
    currdate: any;
    currday: any;
    selected_day: any;
    notifyTime: any;
    date: any;
    parm_standard:any;
    parm_section:any;
    parm_tt_date:any;
    daily_diary_subject: Subject[];
    teacher_subject: Teacher[];
    selected_teacher_id:any;
    selected_active:any;
    attendance_period: ClassReferenceTime[];
    selected_name: any;
    d: any;
    tt_date:any;
    id:number;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController,
              public subjects: ClassProvider, public classProvider: ClassProvider) {

                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_tt_date  = navParams.get('parm_tt_date');
               // this.selected_teacher_id = '1';
                this.selected_school_id = '1';
                this.selected_active= "Y"
                this.table_notification.id = this.time_table.id

                this.time_table.day=this.getDayOfWeek(this.parm_tt_date)

                console.log("value of day" + this.time_table.day)
    // this.timetableGet (this.time_table.class_id, this.time_table.section, this.time_table.day, this.time_table.tt_date);

                this.fetchsubject(this.parm_standard);
             // this.delete(this.time_table.id)
                              console.log("value of id" + this.time_table.id)


        }
    edit(){
<<<<<<< HEAD
=======
         // this.editFlag = false;
    }

addRefTimeToClass()
    {
        let p = new TimeTable();
        p.period      = this.selected_period;
        p.start_time  = this.selected_start_time;
        p.end_time    = this.selected_end_time;
        p.teacher_name = this.selected_name;
        p.subject      = this.selected_subject;
        p.attendance_required = this.d;
        p.class_id = this.selected_class_id;
        p.section = this.selected_section;
        p.school_id = this.selected_school_id;
        p.tt_date = this.parm_tt_date;
        p.day = this.selected_day;
        //p.teacher_id = this.selected_teacher_id;

        console.log(" i'm in timetable add"+ this.parm_standard, this.parm_section);
        //this.timetableProvider
        //.addtimetable(this.parm_standard, this.parm_section, this.parm_tt_date)
        //.subscribe(res => {this.timetableGet(this.parm_standard,this.parm_section,this.parm_tt_date)},
                  // err => this.errorToast()
                 // );
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    }

addRefTimeToClass(){
      
    //this.table_notification.tt_date = this.parm_tt_date
    this.table_notification.start_time = this.selected_start_time
    this.table_notification.end_time = this.selected_end_time
    this.table_notification.period = this.selected_period
    this.table_notification.attendance_required = this.d
    this.table_notification.subject = this.selected_subject
    this.table_notification.teacher_name = this.selected_name
    this.table_notification.active = this.selected_active
    this.table_notification.school_id = this.selected_school_id
    this.table_notification.teacher_id = this.selected_teacher_id
    this.table_notification.class_id = this.parm_standard
    this.table_notification.section = this.parm_section
    this.table_notification.day = this.time_table.day

           
        this.timePost (this.table_notification, this.parm_standard, this.parm_section, this.time_table.day) 
        this.timetableGet (this.parm_standard, this.parm_section, this.time_table.day, this.parm_tt_date);

    console.log(this.table_notification.class_id + this.table_notification.section + this.table_notification.start_time + this.table_notification.end_time)
    //console.log(this.table_notification.teacher_name + this.selected_teacher_id + this.d + this.selected_subject +this.selected_active + this.selected_school_id)
    //console.log(this.time_table.day + this.selected_period)

}

 getDayOfWeek(date) {
      var dayOfWeek = new Date(date).getDay();    
      return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }
<<<<<<< HEAD

  fetchsubject(school_id:number){
      console.log("i'm in Subject")
          this.subjects
          .getAllSubjectsForClass(school_id)
          .subscribe(res => {this.daily_diary_subject = <Subject[]>res},
          err =>  this.errorToast()); 
=======
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
  save(){
    
    //this.timetablePost (this.time_table, this.time_table.class_id, this.time_table.section, this.time_table.tt_date);

>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
  }
 
  home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
  }

  save(){
    
  }

  View(){

  }

  ngOnInit(){
      this.fetchperiod(this.parm_standard);
      this.fetchsubject(this.parm_standard);
     this.timetableGet (this.parm_standard, this.parm_section, this.time_table.day, this.parm_tt_date);
    this.fetchteacher(this.parm_standard);

  }

  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
    console.log("i'm in timetable get method")
      this.timetableProvider
            .getTimetable(class_id,section,day,tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res, this.check()},
                       err =>  this.errorToast()); 
  }
  check(){
     for(let n of this.time_table_notification){
              console.log("my id" + n.id)
          }

<<<<<<< HEAD
  }
  
  timePost (prvdr_timetable:TimeTable, class_id:any, section:any, day:any) {
          this.timetableProvider
              .timetimepost(prvdr_timetable, class_id, section, day) 
              .subscribe(res => {this.successToastreturn(), this.timetableGet(this.parm_standard, this.parm_section, this.time_table.day, this.parm_tt_date)},
                         err =>  this.errorToast()); 
  }
  
  timetable_delete(id:any){
  this.timetableProvider
            .removetimetable(id)
=======

  timetablePost (prvdr_timetable_notification:TimeTable[], class_id:any, section:any, tt_date:any) {
          this.timetableProvider
            .addtimetable(prvdr_timetable_notification, class_id, section,tt_date) 
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
            .subscribe(res => {this.successToastreturn()},
              err => this.errorToast()
            );
  }

  delete(y){
    this.timetable_delete(y.id)
        
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

  fetchperiod(class_id:number) {
              this.classProvider
              .getAllRefTimes(class_id)
                .subscribe(res => {this.attendance_period = <ClassReferenceTime[]>res},
                           err =>   this.errorToast()); 
    }
  
  fetchteacher(class_id:number) {
    console.log(" i'm in teacher")
              this.classProvider
              .getteacher(class_id)
                .subscribe(res => {this.teacher_subject = <Teacher[]>res},
                           err =>   this.errorToast()); 
    }

    change(n){

    this.selected_start_time = n.start_time;
    this.selected_end_time = n.end_time;
    console.log("start time" + this.selected_start_time)
    console.log("end time" + this.selected_end_time)
}

  teacher(m){
    this.selected_teacher_id = m.teacher_id
    console.log("teacher_id"  + this.selected_teacher_id)
  }
}
