import { Component, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ClassProvider} from '../../providers/class-provider';
import {SchoolProvider} from '../../providers/school-provider';

import {ClassSectionYear} from '../../models/ClassSectionYear';
import {ClassReferenceTime} from '../../models/ClassReferenceTime';
import {PeriodTypes} from '../../models/PeriodTypes';
import{LoadingController} from 'ionic-angular';

import { ToastController } from 'ionic-angular';



@Component({
    selector:'Periodone-page',
    templateUrl: 'period.html',
        providers: [ClassProvider, SchoolProvider]


})
export class Period {
    a:any;
    b:any;
    c:any;
    d:any;
    start_time: string;
    end_time: string;
    periods: string;
    attendance: boolean
    classRefTimes: ClassReferenceTime[];
    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;
    toastCtr: ToastController;
    selectedClass: any;  
    selectedClassID: number;
    loader:any;
    class_id: number;
    periodTypes: PeriodTypes[];
    period: ClassReferenceTime = new ClassReferenceTime();

            constructor(public navCtrl: NavController, navParams: NavParams, classProvider: ClassProvider,
                         public loadingController:LoadingController,schoolProvider: SchoolProvider, toastCtrl: ToastController,public toastController: ToastController) {
    
                        this.classProvider = classProvider;
                        this.schoolProvider = schoolProvider;
                        this.toastCtr = toastCtrl;
                        this.class_id = 3;
                        this.attendance= true
    }


ngOninit() {
     this.loading();
 
}
    
 loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
 
    }

save(){

        this.period.class_id = this.class_id
        this.period.start_time = this.a
        this.period.end_time = this.b
        this.period.period_type = this.c
        this.period.description = this.d
        this.period.attendance_required = this.attendance

        this.loading();
        this.addperiod(this.class_id, this.period)
        this.loading();
        this.getperiod(this.class_id)
        
        console.log(this.c, this.a, this.b, this.attendance)
}

resetForm() {

    this.a = ''
    this.b = ''
    this.c = ''
    this.d = ''
    this.attendance=true
    
}

addperiod(class_id: number, crt: ClassReferenceTime){
this.classProvider
        .addRefTime(class_id, crt)
        .subscribe(res => {this.getperiod(class_id), this.resetForm(),this.loader.dismiss()},
                   err => this.errorToast()
                  );
}

getperiod(class_id)
    {
      this.classProvider
        .getAllRefTimes(class_id)
        .subscribe(res => {this.classRefTimes = <ClassReferenceTime[]>res, this.check();this.loader.dismiss()},
                   err => {this.errorToast();this.loader.dismiss()}
                  );  
    }

    check(){
          for(let n of this.classRefTimes){
              console.log("my id" + n.id)
          }
}

remove(id:any)
    {
        this.classProvider
        .removeperiod(id)
        .subscribe(res => {this.successToastreturn(),this.loader.dismiss()},
                   err => this.errorToast()
                  );
    }

removeperiod(y){
        this.loading();
        this.remove(y.id)

    }

  successToastreturn() {

        let toast = this.toastController.create({
        message: "Timetable updated to database",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

errorToast() {
    let toast = this.toastController.create({
        message: "Timetable not loaded, please try after sometime",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }


updateTimes()
    {
        this.a = this.b;
    }
}

