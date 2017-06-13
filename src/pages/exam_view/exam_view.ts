import {Component, OnInit,ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Examtimetable} from '../../models/exam_timetable';
import {ExamtimetableProvider} from '../../providers/examtimetable-provider';
import { Resultview} from '../../pages/exam_selected/exam_selected';
import{ LoadingController} from 'ionic-angular';
import { AboutPage } from '../Home/home';
import { ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
import {GlobalVars} from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import {Login} from '../../models/login-model';

@Component({
    selector:'page-exam',
  templateUrl: 'exam_view.html'

})
export class examNew {
  abt_page_log_in: Login = new Login();
  login:Login[]
  show:boolean;
  exam_view: Examtimetable[]
  standard: any;
  school:number 
  exam_type:string;
  date:any;
  loader:any;
  id:number;
  selected_school_id
  parm_id:number;
  header_exam_type:string;
  selected_roll_no:any;
  selected_record:any;
  indx:number;
  block:boolean=false;
  role_type:string;
  showheader:boolean;
  @ViewChild('sectionSelect') sectionSelect: Select;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public examProvider:ExamtimetableProvider,
              public loadingController:LoadingController,
              public toastController: ToastController,
              public globalVars:GlobalVars){

              this.show=false;  

              this.login = this.globalVars.getMyGlobalVar()
              this.role_type = this.globalVars.getMyGlobalrole()
              this.indx = 0 
              
              this.date = new Date();
              let  dd: any    = this.date.getDate();
              let  mm: any    = this.date.getMonth()+1; //January is 0!
              let  yyyy: any  = this.date.getFullYear();
              let  month: string;
            
            if(dd<10) {
                dd='0'+dd
            } 
            if(mm<10) {
               mm='0'+mm
            } 

           this.date = dd+'/'+mm+'/'+yyyy; 
           this.date = yyyy+'-'+mm+'-'+dd; 

    if(this.role_type=="P") {
              
              this.showheader=true;
              for(let x of this.login) {
              this.indx = this.indx + 1   
         
         if (this.indx == 1) {        
             this.selected_record = x.student_name
             this.standard= x.standard
             this.school = x.school_id
 
            }
         
    }

  } else {
              this.school    =  navParams.get('parm_school')
              this.standard  =  navParams.get('parm_standard')
              this.exam_type =  navParams.get('parm_exam_type')
              this.id = navParams.get('parm_id')
    }

             this.loading();
      //       this.examtimetableGet(this.standard,this.school,this.date)
 
  }

  ionViewDidEnter(){
  
      this.examtimetableGet(this.standard,this.school,this.date)
  
  }

  loading(){

      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
  }

  doFilter() {

		    this.sectionSelect.open();
            
	  }
  	  
 changerecord(x){
     
    this.selected_record = x.student_name
    this.standard= x.standard
    this.school = x.school_id
    this.loading();
    this.examtimetableGet(this.standard,this.school,this.date)
                           
 }	  	  


examtimetableGet(std:any,school:number,date:any) {
  
      this.examProvider
          .getExamtable(std,school,date)
          .subscribe(res => {this.exam_view = <Examtimetable[]>res,this.exam_type_header(),this.loader.dismiss()},
                     err =>  {this.loader.dismiss(),this.errorToast("Records not loaded")}); 

}



exam_type_header() {

  if (this.exam_view.length > 0) {
    for(let x of this.exam_view) {
        this.header_exam_type = x.exam_type;
    }
}else{
      this.header_exam_type = "No Exam data found!"
  }
}

edit(slidingItem:ItemSliding,n) {
  slidingItem.close();
       this.navCtrl.push(Resultview,{
                
                 parm_standard:  this.standard,
                 parm_school_id: this.school,               
                 parm_exam_type: n.exam_type,
                 parm_exam_date: n.date,
                 parm_from_time:n.from_time,
                 parm_to_time:n.end_time,
                 parm_subject:n.subject,
                 parm_syllabus:n.syllabus,
                 parm_id:n.id,
                 parm_update_type: "edit"});

  }
reload(){
    this.examtimetableGet(this.standard,this.school,this.date);
}

Examdelete( exam_view,id: number){

    this.examProvider
            .removeExamtable(id)
            .subscribe(res => {this.successToastDelete('Record deleted'),this.reload()},
                              err => this.errorToast('error removing'));
}


Delete(slidingItem:ItemSliding,x){
  slidingItem.close()
  this.Examdelete(this.exam_view, x.id)
  
}

errorToast(msg: string) {
    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: 'middle'
        });
        toast.present();
}


successToastDelete(msg:string){
  let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: 'middle'
        });
        toast.present();

}
  

view(n){
    
    if(!n.expand){
        n.expand=true;
    } else {
        n.expand=false;
    }
   }
 


home(){
    this.navCtrl.push(AboutPage);
    this.navCtrl.setRoot(AboutPage);
}



}

