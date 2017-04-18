import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {SchoolProvider} from '../../../providers/school-provider';

import {Subject} from '../../../models/Subject';
import {Teacher} from '../../../models/Teacher';

import { ToastController } from 'ionic-angular';

@Component({
    templateUrl: 'class-subject-teacher.html',
    providers: [ClassProvider, SchoolProvider]
})

export class ClassSubjectTeacherPage {

    subjectClassTeachers: Teacher[];
    schoolTeachers: Teacher[];

    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;

    toastCtr: ToastController;
    schoolID: number = 1;

    selectedClass: any;  
    selectedClassID: number;

    selectedSubject: any;
    selectedSubjectID: number;

    dummy: any;

    private createSuccessToast()
    {
        let toast = this.toastCtr.create({
        message: 'Teacher assigned',
        duration: 3000,
        position: 'bottom'
        });
        toast.present();    
    }

    private successToastDelete()
    {
        let toast = this.toastCtr.create({
        message: 'Teacher assignment removed',
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


    private fetchTeachersForSchool(sid)
    {
      this.schoolProvider
        .getAllTeachersForSchool(sid)
        .subscribe(res => {this.schoolTeachers = <Teacher[]>res},
                   err => this.errorToast('Error fetching subjects for class')
                  );          
    }

private testFunc(d)
{
    console.log("testFunc");
    console.log(d);
    console.log(<Teacher[]>d);
    let v: Teacher[] = <Teacher[]>d;
    console.log(v[0].name);
    console.log("End");
}

    private fetchTeachersForSubjectClass(cid, sid)
    {
      this.classProvider
        .getAllTeachersForSubjectClass(cid, sid)
        .subscribe(res => this.subjectClassTeachers = <Teacher[]>res,
                   err => this.errorToast('Error fetching subjects for class'));  
    }

    addTeacherToSubjectClass(t: Teacher)
    {   
        this.classProvider
        .addTeacherToSubjectClass(this.selectedClassID, this.selectedSubjectID, t)
        .subscribe(res => {this.refreshClassTeacherList(); this.createSuccessToast()},
                   err => this.errorToast('Error adding teacher to subject/class')
                  );
    }

    removeTeacherFromSubjectClass(t: Teacher)
    {
        this.classProvider
        .removeTeacherFromSubjectClass(t, this.selectedClassID, this.selectedSubjectID)
        .subscribe(res => {this.refreshClassTeacherList(); this.successToastDelete()},
                  err => this.errorToast('Error fetching teacher for subject per class')
                  );
    }

    refreshClassTeacherList()
    {
        this.fetchTeachersForSubjectClass(this.selectedClassID, this.selectedSubjectID);
    }

    constructor(public navCtrl: NavController, 
                navParams: NavParams,  
                classProvider: ClassProvider,
                schoolProvider: SchoolProvider,
           toastCtrl: ToastController) 
    {
    
    console.log("Got in");
    this.classProvider = classProvider;
    this.schoolProvider = schoolProvider;
    this.toastCtr = toastCtrl;
    
    this.selectedClass = navParams.get('selectedClass');
    this.selectedSubject = navParams.get('selectedSubject');
        
    this.selectedClassID = this.selectedClass.id;
    this.selectedSubjectID = this.selectedSubject.school_subject_id;
        
    this.fetchTeachersForSubjectClass(this.selectedClassID, this.selectedSubjectID);
        
    this.fetchTeachersForSchool(this.schoolID);
        
  }

}
