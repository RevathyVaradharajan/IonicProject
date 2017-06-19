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

@Component({
  selector:'page-Timetablec',
  templateUrl: 'timetable_create.html'
})
export class timetable_create {
  selected_subject:any;
  selected_school_id: any;
  selected_standard:any;
  selected_section:any;
  class: ClassSectionYear[];
  sec: ClassSectionYear[];
  daily_diary_subject: Subject[];
  selected_day:any;
  time_table_notification: TimeTable[];
  selected_tt_date:any  

    constructor(public navCtrl: NavController,navParams: NavParams,public timetableProvider:TimetableProvider,
                public quiz: ClassProvider, public toastController: ToastController){

        this.selected_day = this.getDayOfWeek(this.selected_tt_date)

        this.selected_school_id= 1
<<<<<<< HEAD
      
=======
        this.selected_day= 'monday'
 
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    }
    
  getDayOfWeek(date) {
          var dayOfWeek = new Date(date).getDay();    
          return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }


  submit(){

     this.selected_day = this.getDayOfWeek(this.selected_tt_date)
     this.timetableGet (this.selected_standard, this.selected_section, this.selected_day, this.selected_tt_date);

  }

  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
 
      this.timetableProvider
            .getTimetable(class_id,section,day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res,this.page_logic()},
                       err =>  this.errorToast()); 
  }
 
 page_logic() {

      console.log("Coming here for the length value" +  this.time_table_notification.length )  
      if(this.time_table_notification.length <= 0) {
           this.navCtrl.push(timetable_select,{
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_tt_date: this.selected_tt_date});
      } else {
        this.navCtrl.push(TimeTableEdit,{
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_tt_date: this.selected_tt_date});
      } 
}

ngOnInit() {
  console.log("i'm coming to quiz screen")
  this.fetchstandard(this.selected_school_id);
}

fetchsection(school_id:number,standard:any) {
     
     console.log("i'm coming with section" + school_id + standard) 
     this.quiz
    .getAllSectionForClass(school_id, standard)
            .subscribe(res => {this.sec = <ClassSectionYear[]>res},
                       err =>  this.errorToast()); 

}

fetchstandard(school_id: number){
  console.log("i'm coming in standard")
     this.quiz
    .getAllClassesForSchool(school_id)
            .subscribe(res => {this.class = <ClassSectionYear[]>res},
                       err =>  this.errorToast()); 

}

class_selected(){
 
  this.fetchsection(this.selected_school_id,this.selected_standard) 
  
}


successToastreturn() {
        let toast = this.toastController.create({
        message: "quiz updated to database",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

errorToast() {
    let toast = this.toastController.create({
        message: "quiz not loaded, please try after sometime",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }
 submitview(){
   
   

    this.navCtrl.push(TimeTablePage,{
                parm_standard: this.selected_standard,
                parm_section: this.selected_section,
                parm_tt_date: this.selected_tt_date});

 }



}
