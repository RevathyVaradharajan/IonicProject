import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Quiz} from '../models/Quiz-model';
import {Constants} from '../utilities/Constants';


 @Injectable()
export class QuizProvider {

    constructor(public http: Http) {}

    addQuiz(prvdr_quiz_admin_quiz:Quiz)  
    {
       // let url: string = `${Constants.servicesURLPrefix}/quiz/classes/subject`;
        let url: string = `${Constants.servicesURLPrefix}/quiz/10/English`;
        console.log("this is URL" + url);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
        let body = JSON.stringify(prvdr_quiz_admin_quiz);        
       console.log("i'm coming in quiz provider") 

        return this.http.post(url,body, options)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getQuestions( prvdr_quiz_page_class: number, prvdr_quiz_page_subject: string) 
    
    {
        console.log("Value in provider " + prvdr_quiz_page_subject)
        let url: string = `${Constants.servicesURLPrefix}/quiz/${prvdr_quiz_page_class}/${prvdr_quiz_page_subject}`;
       console.log("i'm coming in quiz provider") 
        console.log("this is URL" + url);
 
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }



}
