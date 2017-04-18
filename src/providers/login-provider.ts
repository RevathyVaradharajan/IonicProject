import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Constants} from '../utilities/Constants';

 @Injectable()
export class LoginProvider {

    constructor(public http: Http) {}

        getLoginDetails(p_login_id: string)
    {
        let url: string = `${Constants.servicesURLPrefix}/login/${p_login_id}`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


}
