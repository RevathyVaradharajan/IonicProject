import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Constants} from '../utilities/Constants';
import {Master} from '../models/master';


 @Injectable()

export class MasterProvider {

    constructor(public http: Http) {}

        getMaster(school_id: number, cyf:any)
    {
        let url: string = `${Constants.servicesURLPrefix}/master_db/${school_id}/${cyf}/classyear`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

updateTimeTable(student_id: number, master: Master[])
    {
        let url: string = `${Constants.servicesURLPrefix}/master_db/${student_id}`;
        
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(master);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}
