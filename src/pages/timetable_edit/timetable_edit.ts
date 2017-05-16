import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Select} from 'ionic-angular';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';
import {ClassProvider} from '../../providers/class-provider';
import {Subject} from '../../models/Subject';
import {PeriodTypes} from '../../models/PeriodTypes';
import {Teacher} from '../../models/Teacher';
import {ClassReferenceTime} from '../../models/ClassReferenceTime';
import { AboutPage } from '../Home/home';


@Component({
  selector: 'time-table-page',
  templateUrl: 'timetable_edit.html'
})
export class TimeTableEdit {
    time_table: TimeTable= new TimeTable();
    selected_id: any;
    selected_school_id:any;
    selected_class_id: any;
    selected_start_time: any;
    selected_end_time: any;
    selected_period: any;
    selected_teacher_name:any;
    selected_attendance_required: any;
    selected_tt_date: any;
    selected_name:any;
    selected_subject:any;
    time_table_notification: TimeTable[];
    time_table_notify: TimeTable[];
    time_table_notifi: TimeTable = new TimeTable();
    selected_section:any;
    timetab: Array<{periods:any, subjects:any}>;
    currdate: any;
    currday: any;
    selected_day: any;
    notifyTime: any;
    date: any;
    class_subject: Subject[];
    teacher_subject: Teacher[];
    period:PeriodTypes[];
    selected_teacher_id:any;
    attendance_period: ClassReferenceTime[];
    show:Boolean= true;
    parm_standard:any;
    parm_section:any;
    parm_tt_date:any;
    indx:number;
    indx1:number;
    selected_active: any;
    start_time:any;

@ViewChild('subjectselect') subjectselect: Select;
@ViewChild('periodselect') periodselect: Select;
@ViewChild('teacherselect') teacherselect: Select;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController,
              public classprovider: ClassProvider) {

                //this.time_table.id= avParams.get('parm_id');
                this.time_table_notify = new Array<TimeTable>();

                this.selected_school_id = '1';
                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_tt_date  = navParams.get('parm_tt_date');
                this.selected_teacher_id= '1'
                this.selected_day='Monday'
                let day = 'monday'
                this.selected_active='n';
        //this.time_table.id=this.selected_id;
                
     this.timetableGet (this.parm_standard,this.parm_section, day, this.parm_tt_date);

}

submit(){
        this.time_table_notify=[];
        
        for (let n of this.time_table_notification){      
        // if (n.checked == false) {            
          let s_attnd: TimeTable = new TimeTable();
    
    s_attnd.class_id = this.parm_standard
    s_attnd.section = this.parm_section
    s_attnd.tt_date = this.parm_tt_date
    s_attnd.start_time = n.start_time
    s_attnd.end_time = n.end_time
    s_attnd.teacher_name = n.teacher_name
    s_attnd.teacher_id = n.teacher_id
    s_attnd.period = n.period
    s_attnd.attendance_required = n.attendance_required
    s_attnd.day = n.day
    s_attnd.subject = n.subject
    s_attnd.active = "Y"
    s_attnd.school_id = n.school_id

    this.time_table_notify.push(s_attnd)
    console.log(this.parm_standard + this.parm_section + this.parm_tt_date)
}
//   this.putTimetable  (this.time_table_notifi,this.selected_school_id,this.parm_section, this.parm_standard, this.selected_day)
 //  this.timetablePost (this.time_table_notify, this.parm_standard, this.parm_section, this.parm_tt_date) 

 

  let alert = this.alertCtrl.create({
    title: 'Timetable update',
    message: 'How you want to update Timetable?',
    buttons: [
      {
        text: 'Update all ' +  this.selected_day,
        handler: () => {
          console.log('Cancel clicked');
          this.putTimetable  (this.time_table_notifi,this.selected_school_id,this.parm_section, this.parm_standard, this.selected_day)
          this.timetablePost (this.time_table_notify, this.parm_standard, this.parm_section, this.parm_tt_date) 

        }
      },
      {
        text: 'Update only ' +  this.parm_tt_date,
        handler: () => {
          console.log('Buy clicked');
            this.timePost (this.time_table_notify, this.parm_standard, this.parm_section, this.selected_day) 
        }
      }
    ]
  });
  alert.present();
}



select_subject(z){  
         this.indx = this.time_table_notification.indexOf(z);
         this.subjectselect.open();
}
select_period(z){  
         this.indx = this.time_table_notification.indexOf(z);
         this.periodselect.open();
}
select_teacher(z){  
         this.indx = this.time_table_notification.indexOf(z);
         this.teacherselect.open();
}



putTimetable(prvdr_timetable_notification:TimeTable,school_id:any,section:any, class_id:any, day:any){
            console.log(class_id);
             this.timetableProvider
            .putTimetable(prvdr_timetable_notification,school_id,  section, class_id, day)
            .subscribe(res => {this.successToastreturn(), this.check1()},
                       err =>  this.errorToast()); 
}

edit_subject(n){

    console.log("i'm coming for edit subject" + this.selected_subject)

    let index = this.time_table_notification.indexOf(n);
    console.log("index" + index)
    console.log("index select" + this.indx)
    if(index > -1) {
       this.time_table_notification[this.indx].subject = this.selected_subject
    }    

}

edit_period(n){

console.log("i'm coming for edit period" + this.selected_period)

    let index = this.time_table_notification.indexOf(n);
    console.log("index" + index)
    console.log("index select" + this.indx)
    if(index > -1) {
       this.time_table_notification[this.indx].period = this.selected_period
    }    

}
edit_teacher(n){

console.log("i'm coming for edit teacher" + this.selected_name)

    let index = this.time_table_notification.indexOf(n);
    console.log("index" + index)
    console.log("index select" + this.indx)
    if(index > -1) {
       this.time_table_notification[this.indx].teacher_name = this.selected_name
    }    

}

home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}

ngOnInit() {
        
        this.fetchsubject(this.parm_standard);
        this.fetchperiod(this.parm_standard);
        this.fetchteacher(this.parm_standard, this.selected_teacher_id);
}

fetchsubject(class_id:number){
            console.log(class_id);
             this.classprovider
            .getAllSubjectsForClass(class_id)
            .subscribe(res => {this.class_subject = <Subject[]>res, this.check1()},
                       err =>  this.errorToast()); 
}
check1() {
          for (let n of this.class_subject){
          console.log("Value of subject" + n.subject_name);
        }
  }
fetchteacher(class_id:number, teacher_id: number) {
    console.log(" i'm in teacher")
              this.classprovider
              .getAllTeachersForSubjectClass(class_id, teacher_id)
                .subscribe(res => {this.teacher_subject = <Teacher[]>res, this.check2()},
                           err =>   this.errorToast()); 
    }
    check2(){
            for (let n of this.teacher_subject){
              console.log("teacher name" + n.name)
            }
    }
fetchperiod(class_id:number) {
              this.classprovider
              .getAllRefTimes(class_id)
                .subscribe(res => {this.attendance_period = <ClassReferenceTime[]>res, this.check3()},
                           err =>   this.errorToast()); 
    }
    check3(){
      for (let n of this.attendance_period){
              console.log("period type" + n.period_type)
            }
    }


  View(){
console.log("i'm in view");
  }


  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
    console.log("i'm in timetable get method")
      this.timetableProvider
            .getTimetable(class_id,section,day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res},
                       err =>  this.errorToast()); 
  }

  timetablePost (prvdr_timetable_notification:TimeTable[], class_id:any, section:any, tt_date:any) {
          this.timetableProvider
              .addtimetable(prvdr_timetable_notification, class_id, section, tt_date) 
              .subscribe(res => {this.successToastreturn()},
                         err =>  this.errorToast()); 
  }

  timePost (prvdr_timetable_notification:TimeTable[], class_id:any, section:any, day:any) {
          this.timetableProvider
              .addtime(prvdr_timetable_notification, class_id, section, day) 
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
    
    console.log(" i'm coming to update timetable")
    prompt.present(); 

    }

}