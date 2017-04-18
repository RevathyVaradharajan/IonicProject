import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Notification} from '../models/Notification';
import {Constants} from '../utilities/Constants';


 @Injectable()

export class Student_Provider {

    constructor(public http: Http) {}

    getNotify(school_id:number,standard: any,section:string) {

        let url: string = `${Constants.servicesURLPrefix}/students/${school_id}/${standard}/${section}`;
        
        console.log("this is URL" + url);
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}
