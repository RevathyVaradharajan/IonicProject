import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {Student} from '../models/Student';
import {Constants} from '../utilities/Constants';

/*
  Generated class for the StudentProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ParentProvider {

    //tempData: any = null;
    constructor(public http: Http) {}
    private getStudentsForParentURL = Constants.servicesURLPrefix +  
    '/getStudentsForParent?id='; 
    
    load(p_id)
    {
        
        let parent_url: string = this.getStudentsForParentURL + p_id;
        
        /*
        if (this.tempData)
        {
            return Promise.resolve(this.tempData);
        }*/
        
        
        return new Promise(resolve => 
        {
            /*this.http.get(parent_url)
                    .map(res => <Array<Student>>(res.json()))
                    .subscribe(users => {
                        this.tempData = users;
                        resolve(this.tempData);
                        });
                        */
            this.http.get(parent_url)
                    .map(res => <Array<Student>>(res.json()))
                    .subscribe(users => {
                        resolve(users);
                        });
            /*this.http.get(parent_url)
                .map(res => res)
                    .subscribe(users => {
                        resolve(users);
                        });            */
        });
        
    }
    
    private extractData(res: Response){
        let body = res.json();
        console.log("Hello:" + body);
        console.log("Hello data:" + body.data);
        return body.data || {};
    }
    
}

