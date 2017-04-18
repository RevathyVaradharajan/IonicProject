import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import {ClassSectionYear} from '../../../models/ClassSectionYear';
import { ClassSubject } from '../class-subject/class-subject';

import { ClassSubjectTeacherPage } from '../class-subject-teacher/class-subject-teacher';

import { ClassReferenceTimePage } from '../class-reference-time/class-reference-time';

import { ClassTimeTablePage } from '../../class/class-time-table/class-time-table';

import {Subject} from '../../../models/Subject';

@Component({
    templateUrl: 'class-menu-page.html'
})
export class ClassMenuPage {

    //classProvider: ClassProvider;
 school_subject_id: number;
    selectedClass: any;  
    selectedClassID: number;
    selectedSchoolID: number;

    constructor(public navCtrl: NavController, 
                navParams: NavParams) {
    
    this.selectedClass = navParams.get('selectedClass');
    this.selectedClassID = this.selectedClass.id;
    this.selectedSchoolID = navParams.get('selectedSchoolID');
        
  }

switchToSubjects(sltClass)
{
    this.navCtrl.push(ClassSubject, {selectedClass: this.selectedClass });
}

switchToSubjectsTeacher()
{
    this.navCtrl.push(ClassSubjectTeacherPage, {selectedClass: this.selectedClass });
}

switchToClassReferenceTiming()
{
    this.navCtrl.push(ClassReferenceTimePage, {selectedClass: this.selectedClass, selectedSchoolID: this.selectedSchoolID });
}

switchToTimeTable()
{
    this.navCtrl.push(ClassTimeTablePage, {selectedClass: this.selectedClass, selectedSchoolID: this.selectedSchoolID });
}

}
