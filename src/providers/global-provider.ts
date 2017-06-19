import {Injectable} from '@angular/core';
import {Login} from '../models/login-model';



@Injectable()
export class GlobalVars {
myGlobalVar : Login[];
myGlobalVar_role_type:string;
  constructor() {
    this.myGlobalVar = []
  }

  setMyGlobalVar(login:Login[],role_type:string) {
    this.myGlobalVar = login;
    this.myGlobalVar_role_type = role_type;
     
 }

  getMyGlobalVar() {
    return this.myGlobalVar;
   
  }

  getMyGlobalrole() {
   
    return this.myGlobalVar_role_type;
  }
}