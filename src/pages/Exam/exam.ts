import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Resultview} from '../../pages/exam_selected/exam_selected';
import { ToastController } from 'ionic-angular';
import {ClassProvider} from '../../providers/class-provider';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import {Subject} from '../../models/Subject';
import{LoadingController} from 'ionic-angular';
@Component({
  templateUrl: 'exam.html',
  selector:'exam-view'
})
export class Exam {

selected_standard: any;
selected_exam_type: any;

parm_school_id: any;
class: ClassSectionYear[];

subject: Subject[];
loader:any;
constructor(public navCtrl: NavController,navParams: NavParams,
            public classProvider: ClassProvider, 
            public toastController: ToastController,
            public loadingController:LoadingController){
            
            this.parm_school_id= 1;
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