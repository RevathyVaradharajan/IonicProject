import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ClassProvider} from '../../../providers/class-provider';
import {ClassSectionYear} from '../../../models/ClassSectionYear';

import { ToastController } from 'ionic-angular';

import { ClassSubject } from '../class-subject/class-subject';
import { ClassMenuPage } from '../class-menu/class-menu-page';

@Component({
    templateUrl: 'class-year.html',
    providers: [ClassProvider]
})
export class ClassYear {

    classSectionYears: ClassSectionYear[];
    classProvider: ClassProvider;
    toastCtr: ToastController;
    schoolID: number = 1;
    listnew: string;
    

    private fetch_classSectionYear(schoolID)
    {
        
      this.classProvider
        .getAllClassesForSchool(schoolID)
        .subscribe(res => this.classSectionYears = <ClassSectionYear[]>res,
                  err => this.errorToast('Error fetching classes for school')
                  );
    }

    private createSuccessToast()
    {
        let toast = this.toastCtr.create({
        message: 'Entry created',
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

    createNew(std: string, section: string, year: number)
    {   
        let csy = new ClassSectionYear();
        csy.standard = std;
        csy.section = section;
        csy.academic_year = year;
        this.classProvider
        .createNewClass(this.schoolID, csy)
        .subscribe(res => {this.refreshList();this.createSuccessToast()},
                  err => this.errorToast('Error creating new class')
                  );
    }

    refreshList()
    {
        this.fetch_classSectionYear(this.schoolID);
    }

    constructor(public navCtrl: NavController, classProvider: ClassProvider, 
           toastCtrl: ToastController) {
    
    this.classProvider = classProvider;
    this.toastCtr = toastCtrl;
    console.log("hello: hit class year constructor");
    this.fetch_classSectionYear(this.schoolID);
    this.listnew = "list";
        
  }

switchToPeriodTimings(classid: number)
{
    alert(classid);
}

switchToTeachers(classid: number)
{
    alert(classid);
}

switchToSubjects(sltClass)
{
    this.navCtrl.push(ClassSubject, {selectedClass: sltClass });
}

switchToClassMenu(sltClass)
{
    this.navCtrl.push(ClassMenuPage, {selectedClass: sltClass, selectedSchoolID: this.schoolID });
}


}
