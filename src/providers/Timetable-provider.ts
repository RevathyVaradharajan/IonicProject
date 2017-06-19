import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {TimeTable} from '../models/TimeTable';

import {Constants} from '../utilities/Constants';


 @Injectable()
export class TimetableProvider {

    constructor(public http: Http) {}
     addtimetable(prvdr_timetable_notification:TimeTable[], class_id:any, section: any, tt_date:any)  
    {
       //console.log("im" + prvdr_timetable_notification_class_id);
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/${tt_date}/timetable`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_timetable_notification);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    addtime(prvdr_timetable_notification:TimeTable[], class_id:any, section: any, day:any)  
    {
       //console.log("im" + prvdr_timetable_notification_class_id);
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/${day}`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_timetable_notification);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

<<<<<<< HEAD
    getTimetable(class_id:any,section: any,day: any, tt_date:any)
=======
    getTimetable(class_id:any,section: any,day: any, tt_date)
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/${day}/${tt_date}/timetable`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

<<<<<<< HEAD
    getTeacherTimetable(class_id:any,teacher_id: any,day: any, tt_date:any)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/${class_id}/${teacher_id}/${day}/${tt_date}/timetable`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    putTimetable(prvdr_timetable_notification:TimeTable,school_id: any,  section: any, class_id:any, day:any)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${section}/${class_id}/${day}/timetable`;
        console.log("link" + url)

         let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
           let body = JSON.stringify(prvdr_timetable_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status))); 
    }

    puttable(prvdr_timetable_notification:TimeTable,school_id: any,  section: any, class_id:any, tt_date:any)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${section}/${class_id}/${tt_date}`;
=======
    putTimetable(prvdr_timetable_notification:TimeTable,school_id: any,  section: any, class_id:any, day:any)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/classes/${school_id}/${section}/${class_id}/${day}/timetable`;
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
        console.log("link" + url)

         let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_timetable_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));        
    }

    timetimepost(prvdr_timetable:TimeTable, class_id:any, section: any, day:any)  
    {
       //console.log("im" + prvdr_timetable_notification_class_id);
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/${day}/timetableperiod`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_timetable);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removetimetable(id: any)
    {
        console.log("value in provider" +id)
        let url: string = `${Constants.servicesURLPrefix}/timetable/${id}/delete`;
        console.log("link" + url)         
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }



}