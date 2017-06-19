import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';
import { ToastController } from 'ionic-angular';
import * as moment from 'moment';
import { AboutPage } from '../Home/home';
<<<<<<< HEAD
import {GlobalVars} from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import {Login} from '../../models/login-model';
import{LoadingController} from 'ionic-angular';
=======

>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
@Component({
  selector: 'time-table-page',
  templateUrl: 'timetable.html'
})
export class TimeTablePage {
    abt_page_log_in: Login = new Login();
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
<<<<<<< HEAD
    login:Login[]
    role_type:string;
    selected_record:any;
    selected_roll_no:any;
    indx:number;
    show:boolean;
    rec_first: number;
    show_time_table_date: boolean;
    parm_tt_date:any;
    parm_standard:any;
    parm_section:any;
    time_table_notification_date_day: TimeTable[];
    selected_teacher_id:any;
    showattend:boolean;
    showheader:boolean;
    loader:any;
    dat:any;
    time_table_day: string;

@ViewChild('sectionSelect') sectionSelect: Select;

constructor(public alertCtrl: AlertController, public navCtrl: NavController,navParams: NavParams,
              public timetableProvider:TimetableProvider, public toastController: ToastController,
              public globalVars:GlobalVars,public loadingController:LoadingController) {


              this.time_table_notification_date_day= new Array<TimeTable>();

              this.show=false;
            
//              if(this.role_type="T"){         
                this.showheader=true;
                this.time_table.class_id= navParams.get('parm_standard');
                this.time_table.section=navParams.get('parm_section');
=======

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
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
                this.time_table.tt_date= navParams.get('parm_tt_date');

                this.selected_record = navParams.get('parm_student_name')
            
                
                 let day =  this.getDayOfWeek(this.time_table.tt_date)
                 this.time_table_day = day


  //            }

       
     

         this.login = this.globalVars.getMyGlobalVar()
         this.role_type = this.globalVars.getMyGlobalrole()
         this.indx = 0 
     
         for(let x of this.login) {

             console.log( "the value of day" + x.standard + x.student_id + x.student_name)
         }

  /*
       if(this.role_type=="P"){
        this.showattend=true;
        let today:any = new Date();
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

      today =yyyy+'-'+mm+'-'+dd;
      this.date=today
      let day =  this.getDayOfWeek(this.date)
      this.time_table_day = day
      console.log(" the value of day" + day + this.time_table_day)
     for(let x of this.login) {

          this.indx = this.indx + 1   
         
         if (this.indx == 1) {
            this.selected_record = x.student_name
            this.time_table.class_id= x.standard
            this.time_table.section = x.section
         }
         
      }

     }              
 */

     this.loading();
     this.timetableGet (this.time_table.class_id, this.time_table.section, this.time_table_day, this.time_table.tt_date);

}


ngOninit() {
     this.loading();
 
}
    
 loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }



 getDayOfWeek(date) {
          var dayOfWeek = new Date(date).getDay();    
          return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
  }


  changerecord(x){
 
             this.selected_record = x.student_name
             this.time_table.class_id= x.standard
             this.time_table.section = x.section
             this.loading();
             this.timetableGet (this.time_table.class_id, this.time_table.section, this.time_table_day, this.time_table.tt_date);
 }

home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
<<<<<<< HEAD

 doFilter() {

		this.sectionSelect.open();
        console.log("am coming"+this.selected_record);
        //this.fetchmessage(this.roll_no);

	  }
  	  
 changeHeader(){
        this.selected_record=this.selected_roll_no;
        

 }

save(){
=======
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
  save(){
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    
    //this.timetablePost (this.time_table, this.time_table.class_id, this.time_table.section, this.time_table.tt_date);

  }
  
    filter_date() {


        console.log("Filter Data function")
        this.rec_first = 0 
          this.show_time_table_date = false

          for (let n of this.time_table_notification){
              
               this.rec_first = this.rec_first + 1

               if (n.tt_date == this.time_table.tt_date && this.rec_first == 1) {
                   console.log("value" + n.tt_date)
                   this.show_time_table_date = true
               } 
                
            }

            if (this.show_time_table_date) {
                
                console.log("Coming here for the time table view to check date")
                for (let n of this.time_table_notification){

                   if (n.tt_date == this.time_table.tt_date) {

                       console.log("Coming in the date loop") 
                       let s: TimeTable = new TimeTable(); 

                        s.attendance_required = n.attendance_required
                        s.class_id = this.parm_standard
                        s.section = this.parm_section
                        s.tt_date = this.parm_tt_date
                        s.start_time = n.start_time
                        s.end_time = n.end_time
                        s.teacher_name = n.teacher_name
                        s.teacher_id = this.selected_teacher_id
                        s.period = n.period
                        s.attendance_required = n.attendance_required

                        if (n.attendance_required=="True"){
                            s.attendance_required = "Yes"
                        } else {
                             s.attendance_required = "No"
                        }
                        s.day = n.day
                        s.subject = n.subject
                        s.active = "Y"
                        s.school_id = this.selected_school_id

                       this.time_table_notification_date_day.push(s)
                   }
              }
            } else {                     

            for (let n of this.time_table_notification){

                   if (n.day == this.time_table_day ) {
                    console.log("Coming in the day loop")
                    let s: TimeTable = new TimeTable(); 

                    s.attendance_required = n.attendance_required
                        s.class_id = this.parm_standard
                        s.section = this.parm_section
                        s.tt_date = this.parm_tt_date
                        s.start_time = n.start_time
                        s.end_time = n.end_time
                        s.teacher_name = n.teacher_name
                        s.teacher_id = this.selected_teacher_id
                        s.period = n.period
                        s.attendance_required = n.attendance_required

                        console.log("value attendance required" + n.attendance_required)
                        if (n.attendance_required=="True"){
                            s.attendance_required = "Yes"
                        } else {
                             s.attendance_required = "No"
                        }
                        s.day = n.day
                        s.subject = n.subject
                        s.active = "Y"
                        s.school_id = this.selected_school_id

                       this.time_table_notification_date_day.push(s)            
            } 
    }
            }
  }      


  timetableGet(class_id:any,section: any, day: any, tt_date:any) {
    console.log("i'm in timetable get method")
      this.timetableProvider
            .getTimetable(class_id,section,day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res,this.filter_date(),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast()}); 
  }


  timetablePost (prvdr_timetable_notification:TimeTable[], class_id:any, section:any, tt_date:any) {
          this.timetableProvider
            .addtimetable(prvdr_timetable_notification, class_id, section, tt_date) 
            .subscribe(res => {this.successToastreturn()},
                       err =>  {this.loader.dismiss(),this.errorToast()}); 
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
