import { Component, OnInit } from '@angular/core';
import {Attendance} from '../../models/Attendance';
import {ClassReferenceTime} from '../../models/ClassReferenceTime';
import { NavController, NavParams } from 'ionic-angular';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {Login} from '../../models/login-model';
import{AboutPage} from '../Home/home';
import{LoadingController} from 'ionic-angular';

export class studentDetail {
          student_name: string;
          student_id: any;
          checked:boolean   
}

@Component({
  selector: 'page-attendanceview',
  templateUrl: 'attendanceview.html',
  providers:[ClassProvider]

})

export class AttendanceView {
  
      show: boolean=false;
      parm_period_type:string;
      attendance_period: ClassReferenceTime[];
      
      selected_attendance: Attendance[]; 
      
      parm_standard: any;
      parm_section: any;
      parm_school_id: number;
      student_details: studentDetail[] 
      student_det: studentDetail = new studentDetail()  
      today:any 
      parm_tt_id: number = 8; 
      parm_period:any   
      parm_subject:any   
      parm_start_time:any   
      parm_end_time:any 
      parm_teacher:any


      constructor(public navCtrl: NavController, 
                  public navParams: NavParams,
                  public classProvider: ClassProvider, 
                  public toastController: ToastController) {

                      this.today      = new Date();
                      let  dd: any    = this.today.getDate();
                      let  mm: any    = this.today.getMonth()+1; //January is 0!
                      let  yyyy: any  = this.today.getFullYear();
                      let  month: string;
                      if(dd<10) {
                            dd='0'+dd
                        } 

                        if(mm<10) {
                            mm='0'+mm
                        } 

                        this.today = yyyy+'-'+mm+'-'+dd;
    

                  this.parm_standard          = this.navParams.get('parm_standard');
                  this.parm_section           = this.navParams.get('parm_section'); 
                  this.parm_school_id         = this.navParams.get('parm_school_id');
                  this.parm_period            = this.navParams.get('parm_period')
                  this.parm_subject           = this.navParams.get('parm_subject') 
                  this.parm_start_time        = this.navParams.get('parm_start_time')  
                  this.parm_end_time          = this.navParams.get('parm_end_time')
                  this.parm_teacher           = this.navParams.get('parm_teacher') 
           
                  if (this.parm_period.length == 0) {
                      this.parm_period = "All"
                  }
                 
                  this.student_details        = new Array<studentDetail>();
                  this.selected_attendance   = new Array<Attendance>(); 
      }

    
      ngOnInit () {
    
    //  this.fetchperiod(this.parm_standard);
      this.fetchStudent(this.parm_school_id,this.parm_standard,this.parm_section);
      
    }
      
    fetchStudent(school_id:number,standard:any,section:string)  {
            
            let x: Login[]

            this.classProvider
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {x = <Login[]>res,this.loadData(x)},
                         err =>   this.errorToast("Student not loaded","middle")); 


    }  

    loadData(y:Login[]){

         for (let n of y){
               this.student_det = new studentDetail()  
               this.student_det.student_id = n.student_id
               this.student_det.student_name = n.student_name
               this.student_det.checked = true
               this.student_details.push(this.student_det)
     }       


}


    fetchperiod(class_id:number) {
              this.classProvider
              .getAllRefTimes(class_id)
                .subscribe(res => {this.attendance_period = <ClassReferenceTime[]>res},
                           err =>   this.errorToast("Period not loaded","middle")); 

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

  clicked() {

      this.show = !this.show;
  }

  submit() {

    for (let n of this.student_details){      
    //     if (n.checked == false) {            
           let s_attnd: Attendance = new Attendance();
           s_attnd.student_id = n.student_id
           s_attnd.attendance = false
           s_attnd.modified_by = 1
           s_attnd.student_name=n.student_name    
           s_attnd.class_id=this.parm_standard
           s_attnd.school_id=this.parm_school_id
           s_attnd.section=this.parm_section
           s_attnd.date=this.today
           s_attnd.period=this.parm_period
           s_attnd.tt_id = this.parm_tt_id
           this.selected_attendance.push(s_attnd)  
           console.log("Checking the value" + n.student_name + n.checked)
     }
        this.updateAttendance(this.parm_standard,this.parm_tt_id, this.selected_attendance)
      
  }

        updateAttendance(standard:number ,tt_id:number, attendance:Attendance[])
        
        {
            console.log("coming to update attendance")
   
            this.classProvider
                .updateAttendance(standard,tt_id, attendance)
                .subscribe(res => {this.successToast("Attendance updated successfully","middle");},
                           err =>  this.errorToast("Error Updating dataset","middle"));
        }
}

