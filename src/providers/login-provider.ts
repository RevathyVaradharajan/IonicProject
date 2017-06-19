import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import {Constants} from '../utilities/Constants';

 @Injectable()

export class LoginProvider {

    constructor(public http: Http) {}

        getLoginDetails(phone_number: number)
    {
        let url: string = `${Constants.servicesURLPrefix}/master_db/${phone_number}/phonenumber`;
        console.log("link" + url)
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(error => Observable.throw(new Error(error.status)));
    }


}
