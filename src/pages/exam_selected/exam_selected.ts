import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Examtimetable} from '../../models/exam_timetable';
import {ExamtimetableProvider} from '../../providers/examtimetable-provider';
import {ToastController} from 'ionic-angular';
import {examNew} from '../../pages/exam_view/exam_view';
import {FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {UsernameValidator} from '../validator/username';
import {notifyValidator} from '../validator/notifyValidator';
import { Subject} from '../../models/Subject';
import { ClassProvider} from '../../providers/class-provider';
import { AboutPage } from '../Home/home';
import{LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'exam_selected.html',
  selector:'result-view',
  providers:[ExamtimetableProvider]
})


export class Resultview {

          exam_notification: Examtimetable = new Examtimetable();
          exam_timetable_notification: Examtimetable[];
          examtimetable: FormGroup;
          daily_diary_subject: Subject[];
          class_id:any;
          school_id:number;
          update_type:string;
          loader:any;          
          show:boolean;      
          selected_from_date:any=new Date().toISOString();     
        constructor(public navCtrl: NavController,
                    public navParams: NavParams,
                    public formBuilder: FormBuilder,
                    public examProvider:ExamtimetableProvider, 
                    public toastController: ToastController,
                    public classProvider: ClassProvider,
                    public loadingController:LoadingController)
      {

                    this.update_type                  =  navParams.get('parm_update_type')
                    this.exam_notification.standard   =  navParams.get('parm_standard');

                    
                    if(this.update_type=="edit") {
                        console.log("I am coming here to check the edit")
                        this.parmsForedit()  
                    } else {
                       this.parmsForadd()  
                    }   
                       

                    this.school_id   = 1
    
        }
             parmsForedit() {

            this.exam_notification.date               = this.navParams.get('parm_exam_date');
            this.exam_notification.exam_type          = this.navParams.get('parm_exam_type');
            this.exam_notification.subject            = this.navParams.get('parm_subject');
            this.exam_notification.from_time          = this.navParams.get('parm_from_time');
            this.exam_notification.end_time           = this.navParams.get('parm_to_time');
            this.exam_notification.standard           = this.navParams.get('parm_standard');
            this.exam_notification.syllabus           = this.navParams.get('parm_syllabus'); 
            this.exam_notification.id                 = this.navParams.get('parm_id');
          
            this.examtimetable = this.formBuilder.group({  
            selected_from_date: [this.exam_notification.date,UsernameValidator.checkToDate],
            selected_from_time: [this.exam_notification.from_time,Validators.required],
            selected_to_time:   [this.exam_notification.end_time,Validators.required],
            selected_subject:   [this.exam_notification.subject]
        })

    }

parmsForadd() {
           
            this.examtimetable = this.formBuilder.group({  
                selected_from_date: [this.selected_from_date,UsernameValidator.checkToDate],
                selected_from_time: ['',Validators.required],
                selected_to_time:   ['',Validators.required],
                selected_subject:   ['',UsernameValidator.checkSubject]
            })

}

     
ngOnInit() {
            this.show=false;
            this.loading();
            this.fetchsubject(this.exam_notification.standard);

}
        
        loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }

  showview(n){
    
    console.log("am coming to show");   
    if(!this.show){
        this.show=true;
    } else{
      this.show=false;

    }

  }
        home(){
         this.navCtrl.push(AboutPage);
        this.navCtrl.setRoot(AboutPage);
        }
         
        save() {

            this.exam_notification.date               = this.examtimetable.value.selected_from_date
            this.exam_notification.subject            = this.examtimetable.value.selected_subject
            this.exam_notification.from_time          = this.examtimetable.value.selected_from_time
            this.exam_notification.end_time           = this.examtimetable.value.selected_to_time 
            this.exam_notification.standard           = this.navParams.get('parm_standard');
            this.exam_notification.syllabus           = "Lesson 1-5"
            
            if(this.update_type=="edit") {
                 this.exam_notification.exam_type         = this.exam_notification.exam_type 
                 this.examtimetablePut (this.exam_notification,
                                        this.exam_notification.id)  
         } else {
                this.exam_notification.exam_type          = this.navParams.get('parm_exam_type')
                this.examtimetablePost (this.exam_notification,
                                        this.exam_notification.standard,this.school_id)  
           }    
                      
        }

        
        examtimetablePut(prvdr_examtimetable_notification:Examtimetable, 
                         id:number) {

                this.examProvider
                    .updateExamtable(prvdr_examtimetable_notification,id) 
                    .subscribe(res => {this.successToastreturn(),this.resetForm(),this.loader.dismiss()},
                                 err => {this.loader.dismiss(), this.errorToast()});               

        }
                            
        examtimetablePost (prvdr_examtimetable_notification:Examtimetable, 
                           class_id:any,
                           school_id: number) {
                  this.examProvider
                      .addExamtable(prvdr_examtimetable_notification,class_id,school_id) 
                      .subscribe(res => {this.successToastreturn(),this.resetForm(),this.loader.dismiss()},
                                 err =>  {this.loader.dismiss(),this.errorToast()}); 
        }

        successToastreturn() {

                let toast = this.toastController.create({
                message: "Exam updated to database",
                duration: 1000,
                position: 'middle'
                });
                toast.present();
             
         if (this.update_type == "edit") {
             this.navCtrl.pop();
        } 
   
     }

        errorToast() {

            let toast = this.toastController.create({
                message: "Problem in updating database. Please try again later",
                duration: 1000,
                position: 'middle'
                });
                toast.present();

        }

        view(){

              this.navCtrl.push(examNew,{
              parm_school: this.school_id,    
              parm_standard:  this.exam_notification.standard,
              parm_exam_type: this.exam_notification.exam_type});
        }  



fetchsubject(standard:any){
      
          this.classProvider
              .getAllSubjectsForClass(standard)
              .subscribe(res => {this.daily_diary_subject = <Subject[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss(),this.errorToast()}); 

}
  resetForm() {
      console.log('hello valid b4:' + this.examtimetable);
      this.examtimetable.reset();
  };


}
 
/*


View(){
 this.navCtrl.push(examNew);
console.log("i'm in view")
this.examtimetableGet (this.exam_notification.exam_type);
         
}


examtimetablePost (prvdr_examtimetable_notification:Examtimetable,prvdr_examtimetable_notification_exam_type:any) {
          this.examProvider
            .addExamtable(prvdr_examtimetable_notification,
                      prvdr_examtimetable_notification_exam_type) 
            .subscribe(res => {this.successToastreturn()},
                       err =>  this.errorToast()); 
  }

  examtimetableGet(prvdr_examtimetable_notification_exam_type:any) {
    
      console.log(prvdr_examtimetable_notification_exam_type);  
      this.examProvider
            .getExamtable(prvdr_examtimetable_notification_exam_type)
            .subscribe(res => {this.exam_timetable_notification= <Examtimetable[]>res,this.check()},
                       err =>  this.errorToast()); 

  }

check(){

for (let n of this.exam_timetable_notification){
console.log("Value of exam_type" + n.exam_type);
console.log("Value of subject" + n.subject);


}
}
  
 
*/
