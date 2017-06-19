import { ViewChild,Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HalfyearlyPage } from '../halfyearly/halfyearly';
import {AnnualdayPage} from '../annualday/annualday';
import {AttendancePage} from '../attendance/attendance';
import {Login} from '../../models/login-model';
import {NotifyProvider} from '../../providers/notify-provider';
import {Notification} from '../../models/Notification';
import { ToastController } from 'ionic-angular';
import {Dailydiary} from '../../models/Dailydairy';
import {DailydiaryProvider} from '../../providers/dailydiary-provider';
import {ClassProvider} from '../../providers/class-provider';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import{ LoadingController } from 'ionic-angular';
import {GlobalVars} from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import{GalleryPage} from '../gallery/gallery';
import {TimeTable} from '../../models/TimeTable';
import {TimetableProvider} from '../../providers/Timetable-provider';


@Component({

  templateUrl: 'home.html',
  selector:'page-home',
  providers:[NotifyProvider, DailydiaryProvider]

})


export class AboutPage {
  segment:any;
  show:boolean;
  abt_page_log_in: Login = new Login();
  login: Login[]
  abt_page_roll_type: string;
  selected_abt_page_date:string;
  selected_school_id: any;
  parm_school_id:number;
  selected_record:any;
  daily_diary_activity: string;
  selected_roll_no:any;

  abt_page_notification: Notification[];
  daily_diary_notification: Dailydiary[];
  activity_diary_notification: Dailydiary[];

  teacher_notification: Notification[];
  time_table_notification: TimeTable[];
  loader:any;
  avatar_ht: boolean;
  today:any;
  showheader:boolean=false;
  indx: number;
  role_type:string;
  showHeader:boolean;
  shownoti:boolean;
  id: any; 
  day: string;
  recep_ind: string;
  teacher_id:any


 @ViewChild('sectionSelect') sectionSelect: Select;
 
 constructor(public navCtrl: NavController, public navParams: NavParams, public diaryProvider: DailydiaryProvider,
              public notifyProvider:NotifyProvider, public toastController: ToastController,
              public loadingController:LoadingController, public globalVars:GlobalVars,
              public timetableProvider:TimetableProvider) {
    
        this.today = new Date();
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

      this.today = dd+'/'+mm+'/'+yyyy; 
      this.selected_abt_page_date = yyyy+'-'+mm+'-'+dd;
      this.day = this.getDayOfWeek(this.selected_abt_page_date)

      this.segment = "admin"
      this.login = this.globalVars.getMyGlobalVar()
      this.role_type = this.globalVars.getMyGlobalrole()
      
      this.indx = 0 
      if(this.role_type=="P"){
         this.segment="noti";   
         this.showHeader=true;
      }   
      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
             this.shownoti=true;
            this.selected_record = x.student_name
            //Screen Navigation Value from Login screen
            this.abt_page_log_in.first_name = x.first_name
            this.abt_page_log_in.last_name  = x.last_name
            this.abt_page_log_in.standard   = x.standard
            this.abt_page_log_in.section    = x.section
            this.selected_school_id=x.school_id

            this.abt_page_log_in.student_id = x.student_id
            this.abt_page_log_in.teacher_id = x.teacher_id
       }
         
        }
       this.recep_ind = "A"

        console.log("value of role type " + this.role_type)        
        if(this.role_type=="T"){
            for(let x of this.login) {
                console.log("Value of the roll" + x.roll)
                if (x.roll==1) {
                    console.log("teacher id is" + x.teacher_id)
                    this.teacher_id=x.teacher_id
                }
            }    
        }

       console.log("Value of the teacher id " + this.teacher_id) 
       this.loadNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);

       this.show=false;


}

getDayOfWeek(date) {
          var dayOfWeek = new Date(date).getDay();    
          return isNaN(dayOfWeek) ? null : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];

}


ngOnInit() {
          
      this.loading()
      
}


loading(){
      
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
}

loadNotify(prvdr_abt_page_date: string, prvdr_abt_page_school_id: any, recep_ind:string) {
    
      this.notifyProvider
            .getNotify(prvdr_abt_page_date, prvdr_abt_page_school_id,recep_ind)
            .subscribe(res => {this.abt_page_notification = <Notification[]>res,this.successToastreturn("Records loaded","bottom"),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast("Records not loaded","bottom")}); 

}


doFilter() {

		this.sectionSelect.open();
}
	  
changeHeader(){

        this.selected_record=this.selected_roll_no;

}	  

about(){
    
    this.navCtrl.push(GalleryPage);

} 	      

segselected(){

    switch(this.segment){
  
      case  "notify" : { 
            this.recep_ind = "A" 
            this.loadNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);
            break
      }
  
      case "Daily": {
          console.log("I am in th Diary segment" + this.segment)
          this.daily_diary_activity = "H"
        
          this.loading()

          this.fetchDailydiary(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                               this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
          
          break
            
      }

      case "Activity": {
        
          console.log("I am in th Diary segment" + this.segment)
          this.daily_diary_activity = "A"
          this.loading()

           this.fetchDiaryActivity(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                                this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
        
          break
      
      }


    } 
}

segselect_teacher(){

    switch(this.segment){
  
      case  "admin" : {    
            this.recep_ind = "A"
            this.loadNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);
            break
      }
  
      case "noti": {
        
          this.recep_ind = "T"
          this.loading()
          this.loadNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);

          break
            
      }

      case "ttable": {         
         // this.selected_abt_page_date = "2017-05-20"
          this.loading()
          this.ttimetableGet (this.selected_school_id,this.teacher_id , this.day, this.selected_abt_page_date);
          break
            
      }
    } 
}

ttimetableGet(school_id: number, teacher_id:any, day: any, tt_date:any) {
    
      this.timetableProvider
            .getTeacherTimetable(school_id, teacher_id, day, tt_date)
            .subscribe(res => {this.time_table_notification= <TimeTable[]>res,this.loader.dismiss()},
                       err => {this.loader.dismiss(),this.errorToast("Records not loaded","bottom")});   

}

fetchDailydiary (prvdr_savenotification_dailydiary_class_id:any, 
                 prvdr_savenotification_dailydiary_section:any,
                 prvdr_dailydiary_activity:string,
                 prvdr_dailydiary_school_id:number, 
                 prvdr_dailydiary_date:any) {

       this.diaryProvider
            .getDiary(prvdr_savenotification_dailydiary_class_id, prvdr_savenotification_dailydiary_section, 
                      prvdr_dailydiary_activity,prvdr_dailydiary_school_id,
                      prvdr_dailydiary_date)
            .subscribe(res => {this.daily_diary_notification = <Dailydiary[]>res,this.successToastreturn("Records loaded","bottom"),this.loader.dismiss()},
                       err => {this.loader.dismiss(), this.errorToast("Records not loaded","bottom")}); 

}

fetchDiaryActivity (prvdr_savenotification_dailydiary_class_id:any, 
                    prvdr_savenotification_dailydiary_section:any,
                    prvdr_dailydiary_activity:string,
                    prvdr_dailydiary_school_id:number, 
                    prvdr_dailydiary_date:any) {
    
       this.diaryProvider
            .getDiary(prvdr_savenotification_dailydiary_class_id, prvdr_savenotification_dailydiary_section, 
                      prvdr_dailydiary_activity,prvdr_dailydiary_school_id,
                      prvdr_dailydiary_date)
            .subscribe(res => {this.activity_diary_notification = <Dailydiary[]>res,this.successToastreturn("Records loaded","bottom"),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast("Records not loaded","bottom")}); 

}

successToastreturn(msg:string,pos:string ) {
 
    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: pos
        });
        toast.present(); 


  }

errorToast(msg:string,pos:string) {

    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position:pos 
        });
        toast.present();

  }

 changerecord(x){

           this.selected_record=x.student_name 
           this.abt_page_log_in.first_name = x.first_name
           this.abt_page_log_in.last_name  = x.last_name
           this.abt_page_log_in.standard   = x.standard
           this.abt_page_log_in.section    = x.section   
            this.selected_school_id=x.school_id
           this.loading();
            this.fetchDailydiary(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                               this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
            
            this.fetchDiaryActivity(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                                this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
                   

}
showrow(n){

    let idx = this.abt_page_notification.indexOf(n)
    
    console.log("the value of message length" +  n.message.length)
    if (n.message.length < 30) {
       this.avatar_ht =  false
    }
    else {   
       this.avatar_ht =  true
  }
  

    console.log("am coming to show" + n.expand);
    if(!n.expand){
        n.expand=true;
        console.log("am coming to show end" + n.expand);
    } else {
        n.expand=false;
    }
 }
 showact(l){

    let fx=this.activity_diary_notification.indexOf(l)  
    console.log("am coming to show");   
  if(!l.expand){
        l.expand=true;
        console.log("am coming to show end" + l.expand);
    } else {
        l.expand=false;
    }
 
 }

 view(n){
    
     console.log("am coming to show" + n.expand);
    if(!n.expand){
        n.expand=true;
        console.log("am coming to show end" + n.expand);
    } else {
        n.expand=false;
    }
   }

}
