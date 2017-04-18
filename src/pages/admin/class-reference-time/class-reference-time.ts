import { Component, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {SchoolProvider} from '../../../providers/school-provider';

import {ClassSectionYear} from '../../../models/ClassSectionYear';
import {ClassReferenceTime} from '../../../models/ClassReferenceTime';
import {PeriodTypes} from '../../../models/PeriodTypes';

import { ToastController } from 'ionic-angular';


@Component({
    templateUrl: 'class-reference-time.html',
    providers: [ClassProvider, SchoolProvider]
})

export class ClassReferenceTimePage {

    classRefTimes: ClassReferenceTime[];
    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;

    toastCtr: ToastController;

    selectedClass: any;  
    selectedClassID: number;
    selectedSchoolID: number;

    periodTypes: PeriodTypes[];

    a:any;
    b:any;
    c:any;
    d:any;

    private createSuccessToast()
    {
        /*
        let toast = this.toastCtr.create({
        message: 'Added',
        duration: 3000,
        position: 'bottom'
        });
    
        toast.present();   
        */
    }

    private successToastDelete()
    {
        /*
        let toast = this.toastCtr.create({
        message: 'Removed',
        duration: 3000,
        position: 'bottom'
        });
    
        toast.present();    
        */
    }

    private errorToast(msg: string)
    {
        let toast = this.toastCtr.create({
        message: msg,
        duration: 3000,
        position: 'middle'
        });
    
        toast.present();    
    }

    private fetchSchoolPeriodTypes()
    {
        this.schoolProvider.getAllPeriodTypes(this.selectedSchoolID)
        .subscribe(res => {this.periodTypes = <PeriodTypes[]>res},
                  err => this.errorToast('Error fetching period types')
                  );
    }

    fetchRefTimeForClass()
    {
      this.classProvider
        .getAllRefTimes(this.selectedClassID)
        .subscribe(res => {this.classRefTimes = <ClassReferenceTime[]>res},
                   err => this.errorToast('Error fetching reference time for class')
                  );  
    }

    addRefTimeToClass()
    {
        let p = new ClassReferenceTime();
        p.start_time = this.a;
        p.end_time = this.b;
        p.period_type = this.c;
        p.attendance_required = this.d;
        /*
        if (this.period != null && this.period.attendance_required == null)
        {
            this.period.attendance_required = false;
        }*/
        console.log(p);
        this.classProvider
        .addRefTime(this.selectedClassID, p)
        .subscribe(res => {this.fetchRefTimeForClass(); this.createSuccessToast(); this.updateTimes()},
                   err => this.errorToast('Error adding reference time to class')
                  );
    }

    updateTimes()
    {
        /*let st: string = this.a;
        let end: string = this.b;
        let d1: any;
        let d2: any;
        d1 = st.split(":");
        console.log((d1[0]*60) + d1[1])
        */
        this.a = this.b;
        
    }

    removeRefTimeFromClass(crt: ClassReferenceTime)
    {
        this.classProvider
        .removeRefTime(crt, this.selectedClassID)
        .subscribe(res => {this.successToastDelete();this.fetchRefTimeForClass();},
                   err => this.errorToast('Error removing reference time for class')
                  );
    }


    constructor(public navCtrl: NavController, 
                navParams: NavParams,  
                classProvider: ClassProvider,
                schoolProvider: SchoolProvider,
           toastCtrl: ToastController) {
    
    this.classProvider = classProvider;
        this.schoolProvider = schoolProvider;
    this.toastCtr = toastCtrl;
    this.selectedClass = navParams.get('selectedClass');
    this.selectedClassID = this.selectedClass.id;
    this.selectedSchoolID = navParams.get('selectedSchoolID');
    
    this.fetchRefTimeForClass();
    this.fetchSchoolPeriodTypes();
    this.d = false;
  }

}
