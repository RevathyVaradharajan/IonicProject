import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular'; 
import {DiaryviewPage} from '../../pages/diaryview/diaryview';
import { Dailydiary} from '../../models/Dailydairy';
import { DailydiaryProvider} from '../../providers/dailydiary-provider';
import { ToastController } from 'ionic-angular';
import { ClassProvider} from '../../providers/class-provider';
import { Subject} from '../../models/Subject';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { DailydiaryValidator} from '../validator/dailydiary';
import{LoadingController} from 'ionic-angular';
import { AboutPage } from '../Home/home';

@Component({
  selector: 'page-contact',
  templateUrl: 'dailydiary_selected.html',
  providers:[DailydiaryProvider]
})

export class ContactPage {

  dairy_page_dailydiary: Dailydiary = new Dailydiary();

  daily_diary_notification: Dailydiary[];

  daily_diary_subject: Subject[];
  dialydiary_update: string;

  dailyForm: FormGroup;
  submitAttempt: boolean;
  loader:any;

  constructor(public navCtrl: NavController, 
                public platform: Platform, 
                public alertCtrl: AlertController, 
                public navParams: NavParams, 
                public dailydiary: ClassProvider,
                public diaryProvider:DailydiaryProvider, 
                public toastController: ToastController,  
                public formBuilder: FormBuilder,
                public loadingController:LoadingController) {
    


                this.dairy_page_dailydiary.class_id  =   navParams.get('parm_standard');
                this.dairy_page_dailydiary.section   =   navParams.get('parm_section');
                this.dairy_page_dailydiary.school_id =   navParams.get('parm_school_id');
                this.dairy_page_dailydiary.title     =   navParams.get('parm_title');
                this.dairy_page_dailydiary.subject   =   navParams.get('parm_subject');
                this.dairy_page_dailydiary.message   =   navParams.get('parm_message');
                this.dairy_page_dailydiary.created_by =  navParams.get('parm_created_by');
                this.dairy_page_dailydiary.activity   =  navParams.get('parm_activity');
                this.dairy_page_dailydiary.id         =  navParams.get('parm_id');
                this.dairy_page_dailydiary.end_date   =  navParams.get('parm_end_date');
                this.dialydiary_update                =  navParams.get('parm_update');
                  if (this.dialydiary_update == "edit") {
                    this.dailyForm = formBuilder.group({
                    selected_title:     [this.dairy_page_dailydiary.title,Validators.required],
                    selected_message:   [this.dairy_page_dailydiary.message,Validators.required],
                    selected_to_date:   [this.dairy_page_dailydiary.end_date,DailydiaryValidator.checkToDate],
                    selected_subject:   [this.dairy_page_dailydiary.subject],
                    selected_activity:  [this.dairy_page_dailydiary.activity]})
                    console.log('hello in edit');
                } else {
                  this.dailyForm = formBuilder.group({  
                      selected_title:     ['',Validators.required],
                      selected_message:   ['',Validators.required],
                      selected_to_date:   ['',DailydiaryValidator.checkToDate],
                      selected_subject:   ['',DailydiaryValidator.checkSubject],
                      selected_activity:  ['H']});
                      console.log('hello:' + this.dialydiary_update);
                }  
    
    }
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}

  ngOnInit() {
        this.loading();
        this.fetchsubject(this.dairy_page_dailydiary.school_id);
    
  }  
 loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }

  fetchsubject(school_id:number) {
        this.dailydiary
              .getAllSubjectsForClass(school_id)
              .subscribe(res =>  {this.daily_diary_subject = <Subject[]>res,this.loader.dismiss()},
                        err =>  {this.loader.dismiss(),this.errorToast("Subjects not loaded","middle")}); 

  }



  Submit() {
  
  this.submitAttempt = true
  
      this.dairy_page_dailydiary.message    =  this.dailyForm.value.selected_message
      this.dairy_page_dailydiary.title      =  this.dailyForm.value.selected_title
      this.dairy_page_dailydiary.end_date   =  this.dailyForm.value.selected_to_date
      this.dairy_page_dailydiary.subject    =  this.dailyForm.value.selected_subject
      this.dairy_page_dailydiary.activity   =  this.dailyForm.value.selected_activity  
          

  if (this.dialydiary_update == "edit") {
      this.dailydiaryUpdate (this.dairy_page_dailydiary,
                             this.dairy_page_dailydiary.id);
  
  }else {
      this.dailydiaryPost (this.dairy_page_dailydiary,
                           this.dairy_page_dailydiary.class_id,
                           this.dairy_page_dailydiary.section);
    }
  }

    //this.dailydiaryGet (this.dairy_page_dailydiary.standard, this.dairy_page_dailydiary.section);

              
  dailydiaryPost (prvdr_savenotification_dailydiary:Dailydiary, 
                  prvdr_savenotification_dailydiary_class_id:any,
                  prvdr_savenotification_dailydiary_section:any) {

 
    this.diaryProvider
              .addDiary(prvdr_savenotification_dailydiary,
                        prvdr_savenotification_dailydiary_class_id,
                        prvdr_savenotification_dailydiary_section) 
              .subscribe(res => {this.successToastreturn("Records updated","middle"),this.resetForm(),this.loader.dismiss()},
                        err =>  {this.loader.dismiss(),this.errorToast("Records not updated","middle")}); 
    }

  dailydiaryUpdate (prvdr_savenotification_dailydiary:Dailydiary, 
                    prvdr_savenotification_dailydiary_id:number) {

    this.diaryProvider
              .putDiary(prvdr_savenotification_dailydiary,
                        this.dairy_page_dailydiary.id)
                                .subscribe(res => {this.successToastreturn("Records updated","middle"),this.resetForm(),this.loader.dismiss()},
                        err =>  {this.loader.dismiss(),this.errorToast("Records not updated","middle")}); 
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

  viewDiary() {
    
    //this.dairy_page_dailydiary.section.replace(/\s/g,'')

    this.navCtrl.push(DiaryviewPage,{
        parm_standard: this.dairy_page_dailydiary.class_id,
        parm_section:  this.dairy_page_dailydiary.section,
        parm_school_id: this.dairy_page_dailydiary.school_id});                  


    }

 
  resetForm() {
      console.log('hello valid b4:' + this.dailyForm.valid);
      this.dailyForm.reset({selected_activity:'H'});
      console.log('hello valid after:' + this.dailyForm.valid + ':' +
      this.dailyForm.value.selected_activity +';'
      );
    
  }

}

