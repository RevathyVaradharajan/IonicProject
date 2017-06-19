import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {ClassSectionYear} from '../models/ClassSectionYear';
import {Subject} from '../models/Subject';
import {Teacher} from '../models/Teacher';
import {ClassReferenceTime} from '../models/ClassReferenceTime';
import {TimeTable} from '../models/TimeTable';
import {Attendance} from '../models/Attendance';

import {Constants} from '../utilities/Constants';

 @Injectable()
export class ClassProvider {

    constructor(public http: Http) {}

    createNewClass(school_id: number, csy: ClassSectionYear)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/classes`;
        console.log("Hello creating class url:" + url);
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(csy);        
        
        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
                    
    }

    getAllClassesForSchool(school_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/classes`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getAllSubjectsForClass(class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects`;
        console.log('we are in');
        return this.http.get(url)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));

    }

    getAllSectionForClass(school_id:any,standard: any)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/${standard}/section`;
        console.log('we are in section' + url);
        return this.http.get(url)
                .map(res => res.json())
                .catch(error => Observable.throw(new Error(error.status)));

    }

    
    /* If you want to use promise this is the way  - and in component we do:fetchSubjectsForClassOld    
    
    getAllSubjectsForClass(class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects`;
        console.log('we are in');
        return new Promise((resolve, reject) => 
        {
            this.http.get(url)
                    .map(res => res.json())
            .catch(error => Observable.throw(new Error(error)))
                    .subscribe(sub => {
                        resolve(sub);
                        },
                        err => {console.log(err.message); reject(err)}      
                              );
        });
    }
    */

    addSubjectToClass(class_id: number, sub: Subject)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(sub);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    

    removeSubjectFromClass(subject: Subject, class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects/${subject.school_subject_id}`;
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    getAllTeachersForSubjectClass(class_id: number, subject_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects/${subject_id}/teachers`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    

    getteacher(class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/class/${class_id}/teachers`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    
    addTeacherToSubjectClass(class_id: number, subject_id: number, t: Teacher)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects/${subject_id}/teachers`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(t);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    removeTeacherFromSubjectClass(t: Teacher, class_id: number, subject_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/subjects/${subject_id}/teachers/${t.teacher_id}`;
        
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    getAllRefTimes(class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/referencetimes`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    addRefTime(class_id: number, crt: ClassReferenceTime)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/referencetimes`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(crt);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    removeRefTime(crt: ClassReferenceTime, class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/referencetimes/${crt.id}`;
        
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    removeperiod(id:any)
    {
        let url: string = `${Constants.servicesURLPrefix}/period/${id}/delete`;
        
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    getTimeTableForDate(class_id: number, tt_date: string)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/timetable?date=${tt_date}`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    
    createTimeTable(class_id: number, tt_date: string)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/timetable?date=${tt_date}`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = ""; //JSON.stringify(crt);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    updateTimeTable(class_id: number, tt: TimeTable)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/timetable/${tt.id}`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(tt);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

     getStudentForClass(school_id:number,standard:any,section:string)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${standard}/${section}/student`;
        console.log("URL" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
        
    
    getStudentsForClass(class_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/students`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    

    getAttendanceForPeriod(class_id: number, tt_period_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/timetable/${tt_period_id}/attendance`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    getstudentForattendance(school_id: number, class_id: number, section:any, student_id:number)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${class_id}/${section}/${student_id}/studentattendance`;
        console.log("URL" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }    
    
    
    updateAttendance(class_id: number, tt_id: number, attendances: Attendance[])
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/timetable/${tt_id}/attendance`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(attendances);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }   
    
        addAttendance(attendance:Attendance[],school_id:number,standard:any,section:string)
    {
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${standard}/${section}/attendance`;
        
        console.log ("url for attendance" + url)        
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(attendance);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
}

