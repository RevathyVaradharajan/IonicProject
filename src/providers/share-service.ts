import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ShareService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ShareService {
  locationObj: any;
setLocationDetails(locationObj){
      this.locationObj = locationObj;
    }
    getLocationDetails(){
      return this.locationObj;
    }

  constructor(public http: Http) {
    console.log('Hello ShareService Provider');
  }

}
