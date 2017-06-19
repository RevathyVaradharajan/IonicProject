import{Component } from '@angular/core';
import {NavController, NavParams } from 'ionic-angular';
import {Attendance2Page} from '../../pages/attendance_selected/attendance_selected';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import{LoadingController} from 'ionic-angular';
import{AttendanceReport} from '../../pages/attendance-report/attendancereport';
@Component({
  selector: 'page-attendance',
  templateUrl: 'attendance.html'
})

export class AttendancePage {
      
      parm_school_id:number;
      parm_standard:any;
      parm_class_id:any;
      class: ClassSectionYear[];
      sec: ClassSectionYear[];

      selected_standard:any;
      selected_section: string; 
      loader:any;      

      constructor(public navCtrl: NavController, public navParams: NavParams,
                  public classProvider: ClassProvider, public toastController: ToastController,
                  public loadingController:LoadingController) {
                  
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

    fetchsection(school_id:number,standard:string) {
        this.classProvider
            .getAllSectionForClass(school_id, standard)
            .subscribe(res => {this.sec = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err =>  {this.loader.dismiss(),this.errorToast()}); 

    }

    fetchstandard(school_id: number){
          this.classProvider
            .getAllClassesForSchool(school_id)
              .subscribe(res => {this.class = <ClassSectionYear[]>res,this.loader.dismiss()},
                          err => {this.loader.dismiss(), this.errorToast()}); 

    }

    class_selected(){

      this.fetchsection(this.parm_school_id,this.selected_standard) 
      
    }

    private errorToast() {
        let toast = this.toastController.create({
            message: "Dailydiary not loaded, please try after sometime",
            duration: 1000,
            position: 'middle'
            });
            toast.present();

    }

    attendance2(){
         
      this.navCtrl.push(Attendance2Page, {
           parm_standard: this.selected_standard,
           parm_section:  this.selected_section,
           parm_school_id: this.parm_school_id});  
  
   }
   attendance2report(){
     
        this.navCtrl.push(AttendanceReport, {
           parm_standard: this.selected_standard,
           parm_section:  this.selected_section,
           parm_school_id: this.parm_school_id});

   }

}

