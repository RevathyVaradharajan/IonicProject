import { Component, ViewChild } from '@angular/core';
import { NavController,AlertController,NavParams} from 'ionic-angular';
import {Login} from '../../models/login-model';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { Select } from 'ionic-angular';
import{ AboutPage} from '../Home/home';
import{LoadingController} from 'ionic-angular';
import {ParentMeetProvider} from '../../providers/parentmeet';
import {Parentmeet} from '../../models/ParentMeet';

@Component({
  selector: 'page-pta',
  templateUrl: 'ParentMeeting_selected.html'
})
export class ParentMeeting_selected {

parm_school_id:any;
parm_standard:any;
parm_section:any;
pt_rollno:Login[];
selected_record:any;
selected_roll_no:any;
parentmeeting:Parentmeet[];
teacherparentmeeting:Parentmeet= new Parentmeet();
loader:any;
roll_no:any;
selected_student_message:any;
selected_teacher_message:any;
student_message:any;
teacher_message:any;

@ViewChild('sectionSelect') sectionSelect: Select;

        constructor(public loadingController:LoadingController,
                    public navCtrl:NavController, 
                    public navParams: NavParams,
                    public classProvider:ClassProvider,
                    public toastController:ToastController,
                    public parentprovider: ParentMeetProvider ){


                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_school_id  = navParams.get('parm_school_id');
               // this.roll_no= 18;
               // this.selected_section='1';

        }    
    loading(){
            
            this.loader = this.loadingController.create({
            content:"Please wait"
            });
            this.loader.present();
          }
          
    ngOnInit () {
            this.loading();
    //  this.fetchperiod(this.parm_standard);
            this.fetchStudent(this.parm_school_id,this.parm_standard,this.parm_section);
            //this.fetchmessage(this.roll_no);
            console.log("roll_no is" + this.roll_no)
 
          }
      
    fetchStudent(school_id:number,standard:any,section:string)  {
            
                this.classProvider
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {this.pt_rollno = <Login[]>res,this.check(),this.loader.dismiss()},
                          err =>   {this.loader.dismiss(),this.errorToast("Records not updated","middle")}); 

      }  

    parentPost (prvdr_parentmeet:Parentmeet, school_id,class_id:any, section:any) {
    this.parentprovider
              .addmessage(prvdr_parentmeet,school_id, class_id,section) 
              .subscribe(res => {this.successToastreturn("Records updated","middle"),this.loader.dismiss()},
                        err =>  {this.loader.dismiss(),this.errorToast("Records not updated","middle")}); 
    }

    fetchmessage(roll_no:any) {
        this.parentprovider
              .getmessage(roll_no)
              .subscribe(res =>  {this.parentmeeting = <Parentmeet[]>res, this.check1()},
                        err =>  {this.loader.dismiss(),this.errorToast("Subjects not loaded","middle")}); 
    }

    check1(){
        for(let x of this.parentmeeting){
          this.roll_no= x.roll_no
          console.log("roll_no is" + x.roll_no)
        }
    }

   check() {
  
      for (let x of this.pt_rollno) {
        let i = 0
        i = i + 1 

        if (i==1) {
           this.selected_record = x.student_id;
        }   
        console.log("Value of the first name" + x.student_name)    
   }
      }
    changeHeader(){
        console.log("checking the selection header")
        console.log("the selected roll_no" + this.selected_roll_no)
        console.log("am coming");
        this.selected_record=this.selected_roll_no;
        this.teacher_message= this.selected_teacher_message;
        this.student_message= this.selected_student_message
        this.fetchmessage(this.selected_roll_no)
        console.log(this.selected_roll_no + this.selected_teacher_message + this.selected_student_message)
      }

    doFilter() {

		    this.sectionSelect.open();
        console.log("am coming"+this.selected_record);
        //this.fetchmessage(this.roll_no);

	  }

    home(){

        this.navCtrl.push(AboutPage);
        this.navCtrl.setRoot(AboutPage);
    }
    successToastreturn(message:string,pos:string) {
          let toast = this.toastController.create({
          message: message,
          duration: 1000,
          position: pos
          });
          toast.present();
  }

  errorToast(message:string,pos:string) { 

      let toast = this.toastController.create({
          message: "Dailydiary not loaded, please try after sometime",
          duration: 1000,
          position: 'middle'
          });
          toast.present();

  }
  save(){
       
       this.teacherparentmeeting.teacher_message= this.selected_teacher_message 
       this.teacherparentmeeting.student_message = this.selected_student_message 
       this.teacherparentmeeting.roll_no = this.selected_roll_no         

        this.parentPost(this.teacherparentmeeting,this.parm_school_id,this.parm_standard,this.parm_section);
        console.log(this.selected_roll_no + this.selected_teacher_message + this.selected_student_message)
      this.selected_teacher_message=''
      this.selected_student_message=''
  }

}


