import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ContactPage} from '../../pages/dailydiary_selected/dailydiary_selected';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import{LoadingController} from 'ionic-angular';
import {AttendanceReport} from '../../pages/attendance-report/attendancereport';
import {Login} from '../../models/login-model';

export class studentDetail {
          student_name: string;
          student_id: any;
          checked:boolean   
}

@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance-report_selected.html'
})
export class AttendanceReportSelected {

      selected_standard:any;
      selected_section: string;
      student_id:any;
      student_name:string;
      parm_school_id:number = 1 ;
      class: ClassSectionYear[];
      sec: ClassSectionYear[];
      loader:any;
      student_details: studentDetail[] 
      student_det: studentDetail = new studentDetail()  


      constructor(public navCtrl: NavController, public navParams: NavParams,
                  public dailydiary: ClassProvider, public toastController: ToastController,
                  public loadingController:LoadingController) {}

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
    fetchsection(school_id:number,standard:string) {
        this.dailydiary
        .getAllSectionForClass(school_id, standard)
                .subscribe(res => {this.sec = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss(),this.errorToast()}); 

    }

    fetchstandard(school_id: number){
        this.dailydiary
        .getAllClassesForSchool(school_id)
                .subscribe(res => {this.class = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss(),this.errorToast()}); 

    }

    class_selected(){
      
      //let std = this.selected_standard.replace(/\s/g,'')
      this.loading()
      this.fetchsection(this.parm_school_id,this.selected_standard.length) 
      
    }


    successToastreturn() {
            let toast = this.toastController.create({
            message: "Dailydiary updated to database",
            duration: 1000,
            position: 'middle'
            });
            toast.present();
      }

    errorToast() {
        let toast = this.toastController.create({
            message: "Dailydiary not loaded, please try after sometime",
            duration: 1000,
            position: 'middle'
            });
            toast.present();

      }


    Submit() {
    
      this.navCtrl.push(AttendanceReport,{
      parm_standard: this.selected_standard,
      parm_section:  this.selected_section,
      parm_school_id: this.parm_school_id}); 
    }

}

