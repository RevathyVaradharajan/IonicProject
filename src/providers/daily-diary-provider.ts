import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Notification} from '../models/Notification';
import {Constants} from '../utilities/Constants';


 @Injectable()

export class DailydiaryProvider {

    constructor(public http: Http) {}

    addNotify(notifydat: Notification)  
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/1/notifications`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(notifydat);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getNotify(prvdr_abt_page_date: string) {

        let url: string = `${Constants.servicesURLPrefix}/schools/1/notifications`;
        
        console.log("this is URL" + url);
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }
    removeDiary(id: number)
    {
        console.log("value in provider" +id)
        let url: string = `${Constants.servicesURLPrefix}/class_diary1/${id}`;
        console.log("link" + url)         
        return this.http.delete(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}
 