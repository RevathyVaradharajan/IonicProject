import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import {Login} from '../../models/login-model';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {Attendance} from '../../models/Attendance';


export class absentInfo {
      date: string;
      day: any;
      attendance_check:string;  
}

@Component({
  selector: 'page-report',
  templateUrl: 'attendancereport.html'
})

export class AttendanceReport {
  show: boolean=false;
  //student_details: studentDetail[] 
  Attendance: Attendance[]
  //student_det: studentDetail = new studentDetail()
 absent_info: absentInfo[] 
  absentInfo: Attendance[]
  student: Login[]  
  parm_school_id:any;
  parm_standard:any;
  parm_section:any;
  selected_standard:any;
  selected_section:any;
  student_name: string;
  student_id: number;
  date: any;
  attendance_check: boolean;
  no_present_days: number;
  no_absent_days:number;
  attendance_percentage:number;
  attend_percentage:number;



  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dailydiary: ClassProvider,
              public toastController: ToastController) 
              {
                 this.absent_info= new Array<absentInfo>();
                this.parm_standard  =   navParams.get('parm_standard');
                this.parm_section   =   navParams.get('parm_section');
                this.parm_school_id =   navParams.get('parm_school_id');
                this.student_id=1
              }
 
    
  clicked() {

      this.show = !this.show;
  }

  ngOnInit() {
       this.fetchStudent(this.parm_school_id,this.parm_standard,this.parm_section);  
       this.fetchpresentlist(this.parm_school_id, this.parm_standard, this.parm_section, this.student_id) 
    }
    
  fetchStudent(school_id:number,standard:any,section:string)  {
            
            this.dailydiary
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {this.student = <Login[]>res,this.check1()},
                         err =>   this.errorToast("Student not loaded","middle")); 
    }  
    check1(){

         for (let n of this.student){
               this.student_id = n.student_id
               this.student_name = n.student_name
               console.log(n.student_name)
            }       
    }
    private errorToast(msg:string, pos:string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
            });
            toast.present();

      }

     private successToast(msg:string, pos:string) {
        let toast = this.toastController.create({
            message: msg,
            duration: 1000,
            position: pos
            });
            toast.present();

     }

     fetchpresentlist(school_id:number, class_id: number, section:any, student_id:number){
            this.dailydiary
                . getstudentForattendance(school_id, class_id, section, student_id)
              . subscribe(res =>  {this.Attendance = <Attendance[]>res, this.check()},
                         err =>   this.errorToast("Student not loaded","middle")); 
    }  
     check(){

          console.log(this.Attendance.length)
          this.no_present_days = this.Attendance.length;
          
          for (let n of this.Attendance){ 

                  if(n.attendance_check==false){

                       let att: absentInfo = new absentInfo();
                       att.attendance_check= "A"
                       att.date = n.date;
                       var dayOfWeek = new Date(att.date).getDay();    
                       att.day = isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
                       this.absent_info.push(att);
                  }
          }

         this.no_absent_days = this.absent_info.length;

        this.attend_percentage=this.no_present_days-this.no_absent_days
        this.attendance_percentage= this.attend_percentage/this.no_present_days*100
        console.log(this.attendance_percentage)
    }


 }

