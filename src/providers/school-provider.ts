import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Constants} from '../utilities/Constants';

@Injectable()
export class SchoolProvider {

    constructor(public http: Http) {}

    getAllSubjectsForSchool(school_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/subjects`;
        
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getAllTeachersForSchool(school_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/teachers`;
        
        console.log("Calling getAllTeachersForSchool:" + url);
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

    getAllPeriodTypes(school_id: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/schools/${school_id}/periodtypes`;
        
        //console.log("Calling getAllTeachersForSchool:" + url);
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }

}

