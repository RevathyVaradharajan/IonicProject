import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Quiz1} from '../../pages/quiz_selected/quiz_selected';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import {Subject} from '../../models/Subject';
import {LoadingController} from 'ionic-angular';


@Component({
  templateUrl: 'quiz1.html',
  selector:'page-quiz1'
})
export class Test {
  selected_subject:any;
  selected_standard:any;
  selected_section:any;
  parm_school_id:any;
  parm_standard:any;
  parm_class_id:any;
  class: ClassSectionYear[];
  sec: ClassSectionYear[];
  daily_diary_subject: Subject[];
  loader:any;

    constructor(public navCtrl: NavController,navParams: NavParams,
                public loadingController:LoadingController,public quiz: ClassProvider, public toastController: ToastController){
      //this.selected_section="A"
      //this.selected_standard="standard I"
      //this.selected_subject="Maths"
          this.parm_school_id= 1;
          this.parm_class_id=1;

    }
    
  submit(){
 
        //console.log("length check" + this.selected_standard.length + this.selected_section.length + this.selected_subject.length);
       console.log("length of standard" + this.selected_standard.length + this.selected_subject.length)
      if(this.selected_standard && this.selected_section && this.selected_subject >0 ){

      }
       this.navCtrl.push(Quiz1,{
        parm_standard: this.selected_standard,
        parm_section: this.selected_section,
        parm_subject: this.selected_subject
  });
  }




ngOnInit() {
  this.loading();
  console.log("i'm coming to quiz screen")
  this.fetchstandard(this.parm_school_id);
  this.fetchsubject(this.parm_class_id);

}

loading() {
     
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }

fetchsection(school_id:number,standard:string) {
  console.log("i'm coming with section")
     this.quiz
    .getAllSectionForClass(school_id, standard)
            .subscribe(res => {this.sec = <ClassSectionYear[]>res, this.check(),this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast()}); 

}

fetchstandard(school_id: number){
  console.log("i'm coming in standard")
     this.quiz
    .getAllClassesForSchool(school_id)
            .subscribe(res => {this.class = <ClassSectionYear[]>res,this.loader.dismiss()},
                       err =>  {this.loader.dismiss(),this.errorToast()}); 

}

class_selected(){

  console.log("i'm coming in sec")
  //this.sec = []
  console.log(this.selected_standard)
  console.log("standard before trim" + this.selected_standard.length)
  let std = this.selected_standard.replace(/\s/g,'')

  console.log("standard after trim" + this.selected_standard.length)

  this.fetchsection(this.parm_school_id,std) 
  
}

check(){
for( let n of this.sec){
  console.log(" my section" + n.section)
}
}

fetchsubject(class_id:number){
  console.log(class_id);
      this.quiz
    .getAllSubjectsForClass(class_id)
            .subscribe(res => {this.daily_diary_subject = <Subject[]>res,this.check1(),this.loader.dismiss()},
                       err => {this.loader.dismiss(),this.errorToast()}); 

}
check1() {
          for (let n of this.daily_diary_subject){
          console.log("Value of subject" + n.subject_name);
          console.log("Value of id" + n.school_subject_id);

        }
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




}
