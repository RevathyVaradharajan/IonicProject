import { Component, OnInit } from '@angular/core';
import {Attendance} from '../../models/Attendance';
import {ClassReferenceTime} from '../../models/ClassReferenceTime';
import { NavController, NavParams } from 'ionic-angular';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {Login} from '../../models/login-model';

export class studentDetail {
          student_name: string;
          student_id: any;
          checked:boolean   
}

@Component({
  selector: 'page-attendance2',
  templateUrl: 'attendance_selected.html',
  providers:[ClassProvider]

})

export class Attendance2Page {
  
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
                  this.student_details        = new Array<studentDetail>();
                  this. selected_attendance   = new Array<Attendance>(); 
      }

    
      ngOnInit () {
    
      this.fetchperiod(this.parm_standard);
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
         if (n.checked == false) {            
           let s_attnd: Attendance = new Attendance();
           s_attnd.student_id = n.student_id
           s_attnd.attendance = false
           s_attnd.modified_by = 1
           s_attnd.student_name=n.student_name    
           s_attnd.class_id=this.parm_standard
           s_attnd.school_id=this.parm_school_id
           s_attnd.section=this.parm_section
           s_attnd.date=this.today
           s_attnd.period="All"
           s_attnd.tt_id = 8
           this.selected_attendance.push(s_attnd)  
           console.log("Checking the value" + n.student_name + n.checked)
        }      
     }
        this.updateAttendance(this.selected_attendance,this.parm_school_id,this.parm_standard,this.parm_section)
      
  }

        updateAttendance(attendance:Attendance[],school_id:number,standard:any,section:string)
        
        {
            console.log("coming to update attendance")
            this.classProvider
                .addAttendance(attendance,school_id,standard,section)
                .subscribe(res => {this.successToast("Period not loaded","middle");},
                           err =>  this.errorToast("Error Updating dataset","middle"));
    
        }


}

