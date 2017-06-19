import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Resultview} from '../../pages/exam_selected/exam_selected';
import { ToastController } from 'ionic-angular';
import {ClassProvider} from '../../providers/class-provider';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import {Subject} from '../../models/Subject';
import{LoadingController} from 'ionic-angular';
import {Login} from '../../models/login-model';
import {GlobalVars} from '../../providers/global-provider';
import {examNew} from '../../pages/exam_view/exam_view';
@Component({
  templateUrl: 'exam.html',
  selector:'exam-view'
})
export class Exam {

selected_standard: any;
selected_exam_type: any;

parm_school_id: any;
class: ClassSectionYear[];
login:Login[];
subject: Subject[];
loader:any;
indx:number;
selected_record:any;
school_id:any;
role_type:string;
today: any;
selected_date:any;

constructor(public navCtrl: NavController,navParams: NavParams,
            public classProvider: ClassProvider, 
            public toastController: ToastController,
            public loadingController:LoadingController,
            public globalVars:GlobalVars){
            
            this.parm_school_id= 1;

            this.login = this.globalVars.getMyGlobalVar()
            this.role_type=this.globalVars.getMyGlobalrole()
   
     if(this.role_type=="P"){
     
      for(let x of this.login){
  
     this.indx = 0 

              for(let x of this.login) {
              this.indx = this.indx + 1   
         
         if (this.indx == 1) {
            this.selected_record = x.student_name
             
            this.navCtrl.setRoot(examNew,{
              
              parm_school: x.school_id,    
              parm_standard:  x.standard,
              parm_exam_type: " "})      
          }
      
      }
    }   

  }

}
    ngOnInit() {
       this.loading(); 
      this.fetchstandard(this.parm_school_id);

    }

    loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }

    fetchstandard(school_id: number){
        
        this.classProvider
        .getAllClassesForSchool(school_id)
        .subscribe(res => {this.class = <ClassSectionYear[]>res,this.loader.dismiss()},
                    err => {this.loader.dismiss(), this.errorToast()}); 

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

    submit(){
    
    console.log("Value of standard" + this.selected_standard)
    console.log("Value of standard" + this.selected_exam_type)
    
    this.navCtrl.push(Resultview,{
                 parm_standard:  this.selected_standard,
                 parm_exam_type: this.selected_exam_type});

    }

}