import { Component,ViewChild } from '@angular/core';
import {GlobalVars} from '../../providers/global-provider';
import { NavController, NavParams } from 'ionic-angular';
import {Login} from '../../models/login-model';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {Attendance} from '../../models/Attendance';
<<<<<<< HEAD
import { Select } from 'ionic-angular';

=======
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c


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
<<<<<<< HEAD
  attendance: Attendance[]
  absent_info: absentInfo[] 
  absentInfo: Attendance[]
  login: Login[]  
=======
  //student_details: studentDetail[] 
  Attendance: Attendance[]
  //student_det: studentDetail = new studentDetail()
 absent_info: absentInfo[] 
  absentInfo: Attendance[]
  student: Login[]  
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
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
<<<<<<< HEAD
  selected_roll_no:any;
  selected_record:any;
  indx:number;
  selected_student_id:any;
  selected_school_id:any;
  role: string;


  @ViewChild('sectionSelect') sectionSelect: Select;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dailydiary: ClassProvider,
              public toastController: ToastController,
              public globalVars:GlobalVars) 
              {
                
              this.absent_info= new Array<absentInfo>();  
              this.login = this.globalVars.getMyGlobalVar()
              this.role  = this.globalVars.getMyGlobalrole()
              this.parm_school_id = 1
              this.indx = 0 


if(this.role == "P") {

      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
            this.selected_record = x.student_name
            this.selected_student_id = x.student_id
            this.selected_standard = x.standard
            this.selected_section = x.section
            this.selected_school_id = x.school_id
           
           }
         
      }

       this.fetchpresentlist(this.selected_school_id, this.selected_standard, this.selected_section, this.selected_student_id) 

} else{
                this.show=false;
                this.parm_standard  =   navParams.get('parm_standard');
                this.parm_section   =   navParams.get('parm_section');
                this.parm_school_id =   navParams.get('parm_school_id');
                this.load_data()
    
      }
}

load_data() {

    this.fetchStudent(this.parm_school_id, this.parm_standard,this.parm_section);  
      this.indx=0
      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
              this.selected_record = x.student_name
              this.selected_student_id = x.student_id
              this.selected_standard = this.parm_standard 
              this.selected_section = this.parm_section
              this.selected_school_id = this.parm_school_id
           
           }   
  }

    this.fetchpresentlist(this.selected_school_id, this.selected_standard, this.selected_section, this.selected_student_id) 


} 

doFilter() {

		    this.sectionSelect.open();
        
}
  	  
=======



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
 
    
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
  clicked() {

      this.show = !this.show;
  }
<<<<<<< HEAD
  
  fetchStudent(school_id:number,standard:any,section:string)  {

            this.dailydiary
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {this.login = <Login[]>res},
                         err =>   this.errorToast("Student not loaded","middle")); 
}  

=======

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
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
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

<<<<<<< HEAD
fetchpresentlist(school_id:number, class_id: number, section:any, student_id:number){
            this.dailydiary
              . getstudentForattendance(school_id, class_id, section, student_id)
              . subscribe(res =>  {this.attendance = <Attendance[]>res, this.rpt_absent()},
                         err =>   this.errorToast("Attendance report not loaded","middle")); 
}  

changerecord(x) {

            this.absent_info = [];
            
            this.selected_record = x.student_name
            this.selected_student_id = x.student_id
            this.selected_standard = x.standard
            this.selected_section = x.section
            this.selected_school_id = x.school_id
            
            if(this.role == "T") {
              this.selected_standard = this.parm_standard 
              this.selected_section = this.parm_section
              this.selected_school_id = this.parm_school_id
            }


            this.fetchpresentlist(this.selected_school_id, this.selected_standard, this.selected_section, this.selected_student_id) 

}

     rpt_absent(){

      
       
          this.no_present_days = this.attendance.length;
          
          for (let n of this.attendance){ 
=======
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
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c

                  if(n.attendance_check==false){

                       let att: absentInfo = new absentInfo();
                       att.attendance_check= "A"
                       att.date = n.date;
                       var dayOfWeek = new Date(att.date).getDay();    
<<<<<<< HEAD
                       att.day = isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'][dayOfWeek];
=======
                       att.day = isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
                       this.absent_info.push(att);
                  }
          }

<<<<<<< HEAD
         console.log(" I am failing2" + this.absent_info.length )

         this.no_absent_days = this.absent_info.length;

         this.attend_percentage=this.no_present_days-this.no_absent_days
     
         this.attendance_percentage = Math.round(this.attend_percentage/this.no_present_days*100)
    }

=======
         this.no_absent_days = this.absent_info.length;

        this.attend_percentage=this.no_present_days-this.no_absent_days
        this.attendance_percentage= this.attend_percentage/this.no_present_days*100
        console.log(this.attendance_percentage)
    }


>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
 }

