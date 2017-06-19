import { Component, OnInit,ViewChild} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ParentMeeting_selected} from '../../pages/parentmeeting_selected/parentmeeting_selected';
import{ AboutPage} from '../Home/home';
import {GlobalVars} from '../../providers/global-provider';
import {Login} from '../../models/login-model';
import { Select } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import {ParentMeetProvider} from '../../providers/parentmeet';
import {ClassProvider} from '../../providers/class-provider';
import {Parentmeet} from '../../models/ParentMeet';


@Component({
  selector: 'page-pta',
  templateUrl: 'parentview.html'
})
export class ParentView {

    selected_roll_no:any;
    abt_page_log_in: Login = new Login();   
    login: Login[]
    role_type:string;
    indx: number;
    selected_record:any;
    selected_school_id: any;
    myDate: String = new Date().toISOString();
    selected_student_message:any;
    selected_teacher_message:any;
    student_message:any;
    teacher_message:any;
    parm_school_id:any;
    parm_standard:any;
    parm_section:any;
    pt_rollno:Login[];
    parentmeeting:Parentmeet[];
    parm_record:any;
    roll_no:any;
    parm_roll_no:any;




 @ViewChild('sectionSelect') sectionSelect: Select;
constructor(public navCtrl:NavController,public globalVars:GlobalVars, public navParams: NavParams,
            public classProvider:ClassProvider, public toastController:ToastController,
              public parentprovider: ParentMeetProvider){
      
      this.login = this.globalVars.getMyGlobalVar()
      this.role_type = this.globalVars.getMyGlobalrole()
      this.parm_standard = navParams.get('parm_standard');
      this.parm_section  = navParams.get('parm_section');
      this.parm_school_id  = navParams.get('parm_school_id');
      this.parm_record  = navParams.get('parm_record');
      this.parm_roll_no  = navParams.get('roll_no');

      
      this.indx = 0 
      if(this.role_type=="P"){
         
             }   
      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
           
            this.selected_record = x.student_name
            //Screen Navigation Value from Login screen
            this.abt_page_log_in.first_name = x.first_name
            this.abt_page_log_in.last_name  = x.last_name
            this.abt_page_log_in.standard   = x.standard
            this.abt_page_log_in.section    = x.section
            this.selected_school_id=x.school_id

            this.abt_page_log_in.student_id = x.student_id
       }
}
}

home(){
    this.navCtrl.push(AboutPage);

      }

ngOnInit () {
            this.fetchStudent(this.parm_school_id,this.parm_standard,this.parm_section);
 
          }
    
fetchmessage(roll_no:any) {
        this.parentprovider
              .getmessage(roll_no)
              .subscribe(res =>  {this.parentmeeting = <Parentmeet[]>res,this.check()},
                        err =>  {this.errorToast("Subjects not loaded","middle")}); 
    }
    check(){
      for(let x of this.parentmeeting){
        this.roll_no= x.roll_no
      }
    }

fetchStudent(school_id:number,standard:any,section:string)  {
            
                this.classProvider
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {this.pt_rollno = <Login[]>res},
                          err =>   {this.errorToast("Records not updated","middle")}); 
  }  

errorToast(message:string,pos:string) { 

      let toast = this.toastController.create({
          message: "Dailydiary not loaded, please try after sometime",
          duration: 1000,
          position: 'middle'
          });
          toast.present();
    }
  
changeHeader(){
        console.log("checking the selection header")
        console.log("the selected roll_no" + this.selected_roll_no)
        console.log("am coming");
        this.selected_record=this.selected_roll_no;
        this.fetchmessage(this.selected_roll_no)
        
        this.teacher_message= this.selected_teacher_message;
        this.student_message= this.selected_student_message
        console.log(this.selected_roll_no + this.selected_teacher_message + this.selected_student_message)
              }

doFilter() {

		    this.sectionSelect.open();
        console.log("am coming"+this.selected_record);
         // this.fetchmessage(this.selected_roll_no);
//console.log("i'm in get student message" + this.selected_roll_no)
      

	  }

changerecord(x){

           this.selected_record=x.student_name 
           this.abt_page_log_in.first_name = x.first_name
           this.abt_page_log_in.last_name  = x.last_name
           this.abt_page_log_in.standard   = x.standard
           this.abt_page_log_in.section    = x.section   
            this.selected_school_id=x.school_id

 }

}

