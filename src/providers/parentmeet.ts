import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Constants} from '../utilities/Constants';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Parentmeet} from '../models/ParentMeet';


@Injectable()
export class ParentMeetProvider {

    constructor(public http: Http) {}

     addmessage(prvdr_parentmeet:Parentmeet, school_id:any,class_id:any, section:string)  
    {   let url: string = `${Constants.servicesURLPrefix}/parent_teacher_meeting/${school_id}/${class_id}/${section}`;
    
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_parentmeet);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getmessage(roll_no:any){
            let url: string = `${Constants.servicesURLPrefix}/parent_teacher_meeting/${roll_no}`;

        console.log("link" + url)
       
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}
 