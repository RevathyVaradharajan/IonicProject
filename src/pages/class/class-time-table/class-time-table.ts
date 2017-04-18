import { Component, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {SchoolProvider} from '../../../providers/school-provider';

import {ClassSectionYear} from '../../../models/ClassSectionYear';
import {Subject} from '../../../models/Subject';

import {PeriodTypes} from '../../../models/PeriodTypes';

import {TimeTable} from '../../../models/TimeTable';

import { ToastController } from 'ionic-angular';

import { MarkAttendancePage } from '../attendance/mark-attendance';

@Component({
    templateUrl: 'class-time-table.html',
    providers: [ClassProvider, SchoolProvider]
})

export class ClassTimeTablePage {

    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;
    toastCtr: ToastController;

    selectedClass: any;  
    selectedClassID: number;
    selectedSchoolID: number;
    periodTypes: PeriodTypes[];
    timeTables: TimeTable[];
    ttDate: string;
    classSubjects: Subject[];


    private createSuccessToast()
    {
        let toast = this.toastCtr.create({
        message: 'Added',
        duration: 3000,
        position: 'bottom'
        });
    
        toast.present();    
    }

    private successToastDelete()
    {
        let toast = this.toastCtr.create({
        message: 'Removed',
        duration: 3000,
        position: 'bottom'
        });
    
        toast.present();    
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
                   err => this.errorToast('Error fetching school period types')
                  );
    }

    fetchSubjectsForClass()
    {
        this.classProvider.getAllSubjectsForClass(this.selectedClassID)
        .subscribe(res => {this.classSubjects = <Subject[]>res;},
                  err => this.errorToast('Error fetching subjects for class')
                  );   
    }

    fetchTimeTable()
    {
        this.classProvider.getTimeTableForDate(this.selectedClassID, this.ttDate)
        .subscribe(res => {this.timeTables = <TimeTable[]>res; console.log(this.timeTables);},
                  err => this.errorToast('Error fetching time table')
                  );   
    }

    createTimeTable()
    {   
        this.classProvider.createTimeTable(this.selectedClassID, this.ttDate)
            .subscribe(res => {this.createSuccessToast(); this.fetchTimeTable();},
                      err => this.errorToast('Error creating time table')
                  );
    }

    //HELLO Ideally need to check if there really is a change and then do this call
    saveTimeTableChange(i)
    {
        this.classProvider.updateTimeTable(this.selectedClassID,i)
            .subscribe(res => {this.createSuccessToast();},
                      err => this.errorToast('Error saving timetable')
                  );
    }

switchToAttendance(tt: TimeTable)
{
    this.navCtrl.push(MarkAttendancePage, {selectedClass: this.selectedClass, selectedSchoolID: this.selectedSchoolID, selectedClassPeriodTT: tt });
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
    
    this.fetchSchoolPeriodTypes();
    this.fetchSubjectsForClass();
        
  }

}
