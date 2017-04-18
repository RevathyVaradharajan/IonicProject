import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Dailydiary} from '../models/Dailydairy';
import {DailyDiary} from '../pages/dailydiary/dailydiary';
import {Constants} from '../utilities/Constants';


 @Injectable()
export class DailydiaryProvider {

    constructor(public http: Http) {}

     addDiary(prvdr_savenotification_dailydiary:Dailydiary,
              prvdr_savenotification_dailydiary_class_id:any,
              prvdr_savenotification_dailydiary_section:string)  
    {
        console.log(" the class id " +  prvdr_savenotification_dailydiary_class_id)
        console.log(" the class id " +  prvdr_savenotification_dailydiary_section)


        let url: string = `${Constants.servicesURLPrefix}/class_diary1/${prvdr_savenotification_dailydiary_class_id}/${prvdr_savenotification_dailydiary_section}`;
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_savenotification_dailydiary);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

     putDiary (prvdr_savenotification_dailydiary:Dailydiary, 
               prvdr_savenotification_dailydiary_id:number)  
    {

        let url: string = `${Constants.servicesURLPrefix}/class_diary1/${prvdr_savenotification_dailydiary_id}`;
  
        console.log("this is URL" + url);
  
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_savenotification_dailydiary);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

getDiary(prvdr_savenotification_dailydiary_class_id:any, 
         prvdr_savenotification_dailydiary_section:any, 
         prvdr_dailydiary_activity:string,
         prvdr_dailydiary_school_id:number, 
         prvdr_dailydiary_date:any)
    {
  
        let url: string = `${Constants.servicesURLPrefix}/class_diary1/${prvdr_dailydiary_school_id}/${prvdr_savenotification_dailydiary_class_id}/${prvdr_savenotification_dailydiary_section}/${prvdr_dailydiary_activity}/${prvdr_dailydiary_date}`;

        console.log("link" + url)
       
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    removeDiary( id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/class_diary1/${id}/delete`;
        console.log("link" + url)
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


    
}