import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import {ClassSectionYear} from '../models/ClassSectionYear';

@Injectable()
export class SubjectProvider {

    constructor(public http: Http) {}
    
}

