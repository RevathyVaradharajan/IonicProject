import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {SchoolProvider} from '../../../providers/school-provider';

import {ClassSectionYear} from '../../../models/ClassSectionYear';
import {Subject} from '../../../models/Subject';

import { ToastController } from 'ionic-angular';

import { ClassSubjectTeacherPage } from '../class-subject-teacher/class-subject-teacher';

@Component({
    templateUrl: 'class-subject.html',
    providers: [ClassProvider, SchoolProvider]
})
export class ClassSubject {

    //classSectionYears: ClassSectionYear[];
    schoolSubjects: Subject[];
    classSubjects: Subject[];
    classProvider: ClassProvider;
    schoolProvider: SchoolProvider;

    toastCtr: ToastController;
    schoolID: number = 1;

    selectedClass: any;  
    selectedClassID: number;

    private createSuccessToast()
    {
        let toast = this.toastCtr.create({
        message: 'Subject added to class',
        duration: 3000,
        position: 'bottom'
        });
    
        toast.present();    
    }

    private successToastDelete()
    {
        let toast = this.toastCtr.create({
        message: 'Subject removed from class',
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


    private fetchSubjectsForSchool(sid)
    {
      this.schoolProvider
        .getAllSubjectsForSchool(sid)
        .subscribe(res => this.schoolSubjects = <Subject[]>res,
                  err => this.errorToast('Error fetching subjects for school')
                  );  
    }

    private fetchSubjectsForClass(cid)
    {
      this.classProvider
        .getAllSubjectsForClass(cid)
        .subscribe(res => {this.classSubjects = <Subject[]>res},
                   err => this.errorToast('Error fetching subjects for class')
                  );  
    }

    /* This is just for reference for how to use promise when promise returned from provider...
    private fetchSubjectsForClassOld(cid)
    {
      this.classProvider
        .getAllSubjectsForClass(cid)
        .then(res => {this.classSubjects = <Subject[]>res; console.log('got it:', res)}, err => console.log('finally hello'))
      ;  
    }
    */

    addSubjectToClass(school_subject_id: number)
    {
        let sub = new Subject();
        sub.school_subject_id = school_subject_id;
        //console.log("Hello" + school_subject_id + this.selectedClassID);
        this.classProvider
        .addSubjectToClass(this.selectedClassID, sub)
        .subscribe(res => {this.refreshClassSubjectList(); this.createSuccessToast()},
                  err => this.errorToast('Error adding subject to class')                  
                  );  
    }

    removeSubjectFromClass(subject: Subject)
    {
        this.classProvider
        .removeSubjectFromClass(subject, this.selectedClassID)
        .subscribe(res => {this.refreshClassSubjectList(); this.successToastDelete()},
                   err => this.errorToast('Error removing subject from class')
                  );
    }

    assignTeachers(subject: Subject)
    {
     this.navCtrl.push(ClassSubjectTeacherPage, {selectedSubject: subject, selectedClass: this.selectedClass});   
    }

    refreshClassSubjectList()
    {
        this.fetchSubjectsForClass(this.selectedClassID);
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
    this.fetchSubjectsForClass(this.selectedClassID);
        
    this.fetchSubjectsForSchool(this.schoolID);
        
  }

}
