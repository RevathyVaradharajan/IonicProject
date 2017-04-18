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
     addtimetable(prvdr_timetable_notification:TimeTable, class_id:any, section: any)  
    {
       //console.log("im" + prvdr_timetable_notification_class_id);
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/timetable`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_timetable_notification);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    getTimetable(class_id:any,section: any,day: any, tt_date)
    {
        console.log(" i'm coming in timetable provider")
        let url: string = `${Constants.servicesURLPrefix}/classes/${class_id}/${section}/${day}/${tt_date}/timetable`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


}