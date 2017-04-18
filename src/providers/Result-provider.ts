import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Resultmodel} from '../models/Result';
import {DailyDiary} from '../pages/dailydiary/dailydiary';
import {Constants} from '../utilities/Constants';


 @Injectable()
export class ResultProvider {

    constructor(public http: Http) {}
     addResult(prvdr_result_page:Resultmodel,prvdr_result_page_roll_no:any)  
    {

       console.log("im" + prvdr_result_page_roll_no);
        let url: string = `${Constants.servicesURLPrefix}/result/Reena123`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_result_page);        

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getResult(prvdr_result_page_roll_no:any, prvdr_result_page_exam_type:any)
    {
        let url: string = `${Constants.servicesURLPrefix}/result/${prvdr_result_page_roll_no}/${prvdr_result_page_exam_type}`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}