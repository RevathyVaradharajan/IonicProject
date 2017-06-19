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
import {ContactPage} from '../../pages/dailydiary_selected/dailydiary_selected';
import { AboutPage } from '../Home/home';
import{LoadingController} from 'ionic-angular';
import{ Diaryview} from '../dailydiary2/dailydiary2';
import { ItemSliding } from 'ionic-angular';

@Component({

  templateUrl: 'diaryview.html',
  selector:'page-diaryview',
  providers:[DailydiaryProvider]

})


export class DiaryviewPage {
prvdr_savenotification_dailydiary:Dailydiary;
  segment:any;
  loader:any;
  daily_diary_activity: string;
  selected_school_id: number = 1;
  daily_diary_notification: Dailydiary[];
  activity_diary_notification: Dailydiary[];
  selected_date: any;
//parm screen Values 
  parm_school_id: number;
  parm_standard: any;
  parm_section: any;
  parm_id:number;
  viewTitle: any;
  viewMessage:any;
  viewDate:any;
  viewSubject:any;
  show:boolean ;
  selected_id: number;
  id:number;
  today:any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public diaryProvider: DailydiaryProvider,
              public notifyProvider:NotifyProvider, 
              public toastController: ToastController,
              public loadingController:LoadingController) {
        
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
      this.selected_date=yyyy+'-'+mm+'-'+dd;
          this.segment="Daily";          
          this.parm_standard          = this.navParams.get('parm_standard');
          this.parm_section           = this.navParams.get('parm_section'); 
          this.parm_school_id         = this.navParams.get('parm_school_id');
          this.parm_id                = this.navParams.get('parm_id');
 //         this.selected_date          = "2017-03-30";
 //          this.segselected()
          this.selected_id=60;
}

ngOnInit() {
     this.loading(); 
     this.show=false;
     console.log("i'm coming to daily diary screen")
}

loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
}

ionViewDidEnter(){
  
  this.segselected()
  console.log("am coming");

}

segselected(){

    switch(this.segment){
    
      case "Daily": {
            
            this.daily_diary_activity = "H"              
            this.fetchDailydiary(this.parm_standard, this.parm_section, 
                                 this.daily_diary_activity,this.parm_school_id,
                                 this.selected_date) 
             break
      }
      case "Activity": {
        
          this.daily_diary_activity = "A"
          this.fetchDiaryActivity(this.parm_standard, this.parm_section, 
                                  this.daily_diary_activity,this.parm_school_id,
                                  this.selected_date)                     
          break
      }

    } 
}
 
 showrow(n){ 
     console.log("Hi am coming");
     this.navCtrl.push(Diaryview, {
        parm_title: n.title,
        parm_message:  n.message,
        parm_subject: n.subject,              
        parm_due_date: n.end_date});
 }
   
edit_activity( slidingItem:ItemSliding,n) {
     slidingItem.close();
     if (this.segment == "Daily") {
        let index = this.daily_diary_notification.indexOf(n);
     }  else {
        let index = this.activity_diary_notification.indexOf(n);
     }   
      
    this.navCtrl.push(ContactPage,{
         parm_standard: n.class_id,
         parm_section:  n.section,
         parm_end_date: n.end_date,
         parm_title: n.title,
         parm_subject: n.subject,
         parm_message: n.message,
         parm_created_by: n.created_by,
         parm_school_id:this.parm_school_id,
         parm_activity:n.activity,
         parm_id:n.id,
         parm_update:"edit"});                  
  
  }     
    
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);

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
                       err =>  {this.loader.dismiss(),this.errorToast("Records not loaded")}); 

}

fetchDiaryActivity (prvdr_savenotification_dailydiary_class_id:any, 
                    prvdr_savenotification_dailydiary_section:any,
                    prvdr_dailydiary_activity:string,
                    prvdr_dailydiary_school_id:number, 
                    prvdr_dailydiary_date:any) {
    
       this.diaryProvider
            .getDiary(prvdr_savenotification_dailydiary_class_id,prvdr_savenotification_dailydiary_section, 
                      prvdr_dailydiary_activity,prvdr_dailydiary_school_id,
                      prvdr_dailydiary_date)
            .subscribe(res => {this.activity_diary_notification = <Dailydiary[]>res,this.successToastreturn("Records loaded","bottom"),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast("Records not loaded")}); 

}

reload()
{
    this.fetchDailydiary(this.parm_standard, this.parm_section, 
                                 this.daily_diary_activity,this.parm_school_id,
                                 this.selected_date) ;
    this.fetchDiaryActivity(this.parm_standard, this.parm_section, 
                            this.daily_diary_activity,this.parm_school_id,
                            this.selected_date)                     
                 
}
diarydelete(id: number){
    
    this.diaryProvider
            .removeDiary(id)
            .subscribe(res => {this.reload()},
                              err => this.errorToast('error removing')
            );
}

  delete(slidingItem:ItemSliding,z){
    slidingItem.close();
    this.diarydelete(z.id)
    console.log("i'm in delete" + z.id)
    
  }
  

private successToastreturn(msg:string,pos:string ) {
 
    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: pos
        });
        toast.present(); 
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
  
}

