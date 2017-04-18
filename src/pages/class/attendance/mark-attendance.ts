import { Component, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {SchoolProvider} from '../../../providers/school-provider';

import {ClassSectionYear} from '../../../models/ClassSectionYear';
import {Subject} from '../../../models/Subject';
import {Student} from '../../../models/Student';

import {PeriodTypes} from '../../../models/PeriodTypes';

import {TimeTable} from '../../../models/TimeTable';
import {Attendance} from '../../../models/Attendance';

import { ToastController } from 'ionic-angular';

//import { ClassSubjectTeacherPage } from '../class-subject-teacher/class-subject-teacher';

@Component({
    templateUrl: 'mark-attendance.html',
    providers: [ClassProvider, SchoolProvider]
})

export class MarkAttendancePage {}

/*
    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;
    toastCtr: ToastController;

    selectedClass: any;  
    selectedClassID: number;
    selectedSchoolID: number;
    selectedClassPeriodTT: TimeTable;

    periodTypes: PeriodTypes[];
    timeTables: TimeTable[];
    ttDate: string;
    classSubjects: Subject[];
    attendances: Attendance[];
    students: Student[];
    attendanceMarked: Boolean;

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

//HELLO - Do we need to handle a case of new student joining class? In that case for an old day, the student won't exist - shouldn't we make a record saying he was absent? Or should it be left because student anyway wasn't part of school and when we calculate attendance rate we shouldn't penalize student.
    public fetchAttendance()
    {
        this.classProvider.getAttendanceForPeriod(this.selectedClassID, this.selectedClassPeriodTT.id)
        .subscribe(res => {this.attendances = <Attendance[]>res; this.successFetchAttendance()},
                   err => this.errorToast('Error fetching attendance')
                  );
    }

    successFetchAttendance()
    {
        if (this.attendances == null || this.attendances.length == 0)
        {
            this.fetchStudentsForClass();
        }
        else{
        this.attendanceMarked = true;
        }
    }

    fetchStudentsForClass()
    {
        this.classProvider.getStudentsForClass(this.selectedClassID)
        .subscribe(res => {this.students = <Student[]>res; this.buildAttendanceList();},
                  err => this.errorToast('Error fetching students for class')
                  );
    }

    buildAttendanceList()
    {
        this.attendances = new Array<Attendance>();
        for (let st of this.students)
        {
            let att: Attendance;
            att = new Attendance();
            att.tt_id = this.selectedClassPeriodTT.id;
            att.student_id = st.id;
            att.student_name = st.name;
            att.attendance = false;
            att.modified_by = 1;  //HELLO need logged in user id
            att.modified_by_name = "SS";
            att.modified_timestamp = "";
            
            this.attendances.push(att);
        }
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

    saveTimeTableChange(i)
    {
        this.classProvider.updateTimeTable(this.selectedClassID,i)
            .subscribe(res => {this.createSuccessToast();},
            err => this.errorToast('Error saving time table')
                  );     
    }

    updateAttendance()
    {
        this.classProvider.updateAttendance(this.selectedClassID, this.selectedClassPeriodTT.id, this.attendances).subscribe(res => {this.createSuccessToast();},
              err => this.errorToast('Error updating attendance')
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
    this.selectedClassPeriodTT = navParams.get('selectedClassPeriodTT');        
        
    this.attendanceMarked = false;
    this.fetchAttendance();
        
  }


*/