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


@Component({
  selector: 'time-table-page',
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
    selected_section:any;
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
    //editFlag: boolean   = true;
   // subject: string[];
    attendance_period: ClassReferenceTime[];
    selected_name: any;
    d: any;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController,
              public subjects: ClassProvider, public classProvider: ClassProvider) {

               // this.subject=['Tamil', 'English', 'Science'];

                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_tt_date  = navParams.get('parm_tt_date');
                this.selected_teacher_id = '1';
                this.selected_school_id = '1';
                this.selected_day= 'Sunday';

                //this.time_table.day=this.getDayOfWeek(this.parm_date)
                this.time_table.day=this.getDayOfWeek('2017-04-10')
                console.log("value of day" + this.time_table.day)
                this.timetableGet (this.parm_standard, this.parm_section, this.time_table.day, this.parm_tt_date);
    // this.timetableGet (this.time_table.class_id, this.time_table.section, this.time_table.day, this.time_table.tt_date);

                this.fetchsubject(this.parm_standard);
        }
    edit(){
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
        this.timetableProvider
        .addtimetable(this.parm_standard, this.parm_section, p)
        .subscribe(res => {this.timetableGet(this.parm_standard,this.parm_section,this.selected_day ,this.parm_tt_date)},
                   err => this.errorToast()
                  );
    }

    fetchsubject(class_id:number){
      console.log("i'm in Subject")
          this.subjects
          .getAllSubjectsForClass(class_id)
          .subscribe(res => {this.daily_diary_subject = <Subject[]>res,this.check1()},
          err =>  this.errorToast()); 

  }
  check1(){
          for(let n of this.daily_diary_subject){
            console.log("my subject" + n.subject_name)
          }

}

  getDayOfWeek(date) {
      var dayOfWeek = new Date(date).getDay();    
      return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    }

  save(){
    
    this.timetablePost (this.time_table, this.time_table.class_id, this.time_table.section);

  }
  View(){
console.log("i'm in view");
  }

  check(){

  for (let n of this.time_table_notification){
console.log("Value of class_id" + n.class_id);
console.log("Value of class_id" + n.start_time);
console.log("Value of class_id" + n.end_time);
console.log("Value of class_id" + n.period);

        }

  }
  ngOnInit(){
      this.fetchperiod(this.parm_standard);
      this.fetchsubject(this.parm_standard);
     this.timetableGet (this.parm_standard, this.parm_section, this.time_table.day, this.parm_tt_date);
    this.fetchteacher(this.parm_standard, this.selected_teacher_id);

  }

  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
    console.log("i'm in timetable get method")
      this.timetableProvider
            .getTimetable(class_id,section,day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res,this.check()},
                       err =>  this.errorToast()); 
  }


  timetablePost (prvdr_timetable_notification:TimeTable, class_id:any, section:any) {
          this.timetableProvider
            .addtimetable(prvdr_timetable_notification, class_id, section) 
            .subscribe(res => {this.successToastreturn()},
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

  fetchperiod(class_id:number) {
              this.classProvider
              .getAllRefTimes(class_id)
                .subscribe(res => {this.attendance_period = <ClassReferenceTime[]>res},
                           err =>   this.errorToast()); 
    }
  
  fetchteacher(class_id:number, teacher_id: number) {
    console.log(" i'm in teacher")
              this.classProvider
              .getAllTeachersForSubjectClass(class_id, teacher_id)
                .subscribe(res => {this.teacher_subject = <Teacher[]>res, this.check2()},
                           err =>   this.errorToast()); 
    }
    check2(){
            for (let n of this.teacher_subject){
              console.log("teacher name" + n.name)
            }
    }


change(n){

    this.selected_start_time = n.start_time;
    this.selected_end_time = n.end_time;
    console.log("start time" + this.selected_start_time)
    console.log("end time" + this.selected_end_time)

}


editSubject(item) {

let prompt = this.alertCtrl.create({
    title: 'Edit Subject',
    inputs: [{
                name: 'subjects'
            }],
            buttons: [
                {
                    text: 'Cancel',

                },
                {
                    text: 'save',
                    handler: data => {
                    let index = this.timetab.indexOf(item);
                     if(index > -1){
                         this.timetab[index] = data
                         data.periods= item.periods 
                      }    

                }
            }
        ]

    });
    
    console.log(" i'm coming to update timetable",{
    //parm_id: this.selected_id,
    parm_class_id:this.selected_class_id,
    parm_start_time:this.selected_start_time,
    parm_end_time:this.selected_end_time,
    parm_period:this.selected_period,
    parm_attendance_required:this.selected_attendance_required,
    parm_tt_date:this.selected_tt_date

    });
    prompt.present(); 

    }

    

}
