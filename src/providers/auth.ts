import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Auth {

  constructor(public http: Http) {
    console.log('Hello Auth Provider');
  }
login(){
  return new Promise((resolve)=>{
  setTimeout(()=> {
    resolve(true);
  },3000);
  }); 
}
}
