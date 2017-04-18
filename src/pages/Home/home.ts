import { Component, OnInit } from '@angular/core';
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

@Component({

  templateUrl: 'home.html',
  selector:'page-home',
  providers:[NotifyProvider, DailydiaryProvider]

})


export class AboutPage {
segment:any;
//parm screen Values 
  show:boolean;
  abt_page_log_in: Login = new Login();
  abt_page_roll_type: string;
  selected_abt_page_date:string;
  selected_school_id: any;
  parm_school_id:number;

  daily_diary_activity: string;

  abt_page_notification: Notification[];
  daily_diary_notification: Dailydiary[];
  activity_diary_notification: Dailydiary[];
  loader:any;
  avatar_ht: boolean;
  today:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public diaryProvider: DailydiaryProvider,
              public notifyProvider:NotifyProvider, public toastController: ToastController,public loadingController:LoadingController) {
    
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
      let tdy=yyyy+'-'+mm+'-'+dd;
    this.segment="noti";

//Passing the value from today's  date
  this.selected_abt_page_date = tdy 
  this.selected_school_id = '1'
  this.parm_school_id= 1;


//Screen Navigation Value from Login screen
    this.abt_page_log_in.first_name = navParams.get('parm_login_firstname');
    this.abt_page_log_in.last_name  = navParams.get('parm_login_lastname');
    this.abt_page_log_in.standard   = navParams.get('parm_login_standard');
    this.abt_page_log_in.section    = navParams.get('parm_login_section');
    this.abt_page_roll_type         = navParams.get('parm_login_roll_no'); 
    this.Loadnotify(this.selected_abt_page_date,this.selected_school_id);
//    this.LoadAbout_daily_diary(this.selected_abt_page_date);
      
  }

  ngOnInit() {
      this.show=false;
      this.loading()
       console.log("i'm coming to daily diary screen")
     // this.Loadnotify(this.selected_abt_page_date,this.selected_school_id);

}

loading(){
      
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
}

Loadnotify(prvdr_abt_page_date: string, prvdr_abt_page_school_id: any) {
    
      this.notifyProvider
            .getNotify(prvdr_abt_page_date, prvdr_abt_page_school_id)
            .subscribe(res => {this.abt_page_notification = <Notification[]>res,this.successToastreturn("Records loaded","bottom"),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast("Records not loaded","bottom")}); 

  }


segselected(){

    switch(this.segment){
  
      case  "notify" : {    
            this.Loadnotify(this.selected_abt_page_date,this.selected_school_id);
            break
      }
  
      case "Daily": {
          console.log("I am in th Diary segment" + this.segment)
          this.daily_diary_activity = "H"
          this.abt_page_log_in.standard = "I"
          this.abt_page_log_in.section  = "A"
          this.loading()

          this.fetchDailydiary(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                               this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
          
          break
            
      }

      case "Activity": {
        
          console.log("I am in th Diary segment" + this.segment)
          this.daily_diary_activity = "A"
          this.abt_page_log_in.standard = "I"
          this.abt_page_log_in.section  = "A"
          this.loading()

           this.fetchDiaryActivity(this.abt_page_log_in.standard, this.abt_page_log_in.section, 
                                this.daily_diary_activity,this.selected_school_id,this.selected_abt_page_date) 
        
          break
      
      }


    } 
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
 


}
