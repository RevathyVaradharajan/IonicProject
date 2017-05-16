import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { AboutPage } from '../Home/home';

@Component({
  selector: 'time-table-page',
  templateUrl: 'timetable.html'
})
export class TimeTablePage {
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

  constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController) {

    //this.selected_id='54';
    this.selected_class_id= '1';
    this.selected_start_time= '09:00';
    this.selected_end_time='12:00';
    this.selected_period='Maths';
    this.selected_attendance_required='false';
    this.selected_tt_date='09-04-2017';
    this.selected_school_id= '1';
    this.selected_section= 'A';
    this.selected_day= 'monday';
    this.selected_subject= 'Maths';

                //this.time_table.id= navParams.get('parm_id');
                this.time_table.class_id= navParams.get('parm_class_id');
                this.time_table.start_time= navParams.get('parm_start_time');
                this.time_table.end_time= navParams.get('parm_end_time');
                this.time_table.period= navParams.get('parm_period');
                this.time_table.attendance_required= navParams.get('parm_attendance_required');
                this.time_table.tt_date= navParams.get('parm_tt_date');



        //this.time_table.id=this.selected_id;
        this.time_table.class_id= this.selected_class_id;
        this.time_table.start_time= this.selected_start_time;
        this.time_table.end_time= this.selected_end_time;
        this.time_table.period= this.selected_period;
        this.time_table.attendance_required= this.selected_attendance_required;
        this.time_table.tt_date= this.selected_tt_date;
        this.time_table.section= this.selected_section;
        this.time_table.day= this.selected_day;


                
                 console.log("sending Timetable message" + this.time_table.class_id)

     this.timetableGet (this.time_table.class_id, this.time_table.section, this.time_table.day, this.time_table.tt_date);

}
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
  save(){
    
    //this.timetablePost (this.time_table, this.time_table.class_id, this.time_table.section, this.time_table.tt_date);

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

  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
    console.log("i'm in timetable get method")
      this.timetableProvider
            .getTimetable(class_id,section,day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res,this.check()},
                       err =>  this.errorToast()); 
  }


  timetablePost (prvdr_timetable_notification:TimeTable[], class_id:any, section:any, tt_date:any) {
          this.timetableProvider
            .addtimetable(prvdr_timetable_notification, class_id, section, tt_date) 
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
