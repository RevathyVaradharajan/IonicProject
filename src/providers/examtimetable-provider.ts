import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Examtimetable} from '../models/exam_timetable';
import {Constants} from '../utilities/Constants';


 @Injectable()
export class ExamtimetableProvider {

    constructor(public http: Http) {}
     addExamtable(prvdr_examtimetable_notification:Examtimetable, 
                           class_id:any,
                           school_id: number)  
    {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${school_id}/${class_id}`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_examtimetable_notification);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getExamtable(std:any,school:number,date:any)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${school}/${std}/${date}`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

     updateExamtable(prvdr_examtimetable_notification:Examtimetable, id:number)
                            
        {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${id}`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_examtimetable_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeExamtable( id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/exam_timetable/${id}`;
        console.log("link" + url)
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


}