import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Notification} from '../models/Notification';
import {Constants} from '../utilities/Constants';


 @Injectable()

export class NotifyProvider {

    constructor(public http: Http) {}


    addNotify(notifydat: Notification)  
    {
        let url: string = `${Constants.servicesURLPrefix}/notifications/1`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(notifydat);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

      putNotify(prvdr_notify_page_notification:Notification,prvdr_notify_page_id:number)  
    {
        console.log("put notify");
        let url: string = `${Constants.servicesURLPrefix}/notifications/${prvdr_notify_page_id}`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_notify_page_notification);        

        return this.http.put(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getNotify(prvdr_abt_page_date: string, prvdr_abt_page_school_id: any) {

        console.log("Value in provider " + prvdr_abt_page_date )
        let url: string = `${Constants.servicesURLPrefix}/notifications/${prvdr_abt_page_school_id}/${prvdr_abt_page_date}`;
        
        console.log("this is URL" + url);
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    deleteNotify( id: number){
        console.log("Value in provider " + id)
        let url: string = `${Constants.servicesURLPrefix}/notifications/${id}`;

         console.log("this is URL" + url);
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));


    }

}
