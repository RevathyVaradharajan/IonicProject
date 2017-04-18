import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {Student} from '../models/Student';

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class StudentProvider {

    tempData: any = null;
    constructor(public http: Http) {}
    private studentsURL = 'https://api.github.com/users'; //https://api.github.com/users
    
    load()
    {
        if (this.tempData)
        {
            return Promise.resolve(this.tempData);
        }
        
        return new Promise(resolve => 
        {
            this.http.get(this.studentsURL)
                    .map(res => <Array<Student>>(res.json()))
                    .subscribe(users => {
                        this.tempData = users;
                        resolve(this.tempData);
                        });
                        
            /*
            this.http.get(this.studentsURL)
                .map(this.extractData)
                .subscribe(users => {
                this.data = users;
                resolve(this.data);
                })
            */
        });
        
    }
    
    private extractData(res: Response){
        let body = res.json();
        console.log("Hello:" + body);
        console.log("Hello data:" + body.data);
        return body.data || {};
    }
    
}

