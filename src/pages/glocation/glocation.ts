import { Component,ViewChild,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationTracker } from '../../providers/location-tracker';
import {GlobalVars} from '../../providers/global-provider';
import { Select } from 'ionic-angular';
import {Login} from '../../models/login-model'; 
@Component({
  selector: 'page-glocation',
  templateUrl: 'glocation.html'
})
export class glocationPage {
 
  selected_record:any;
  selected_roll_no:any;
  login:Login[]
  indx:number;
  role_type:string;
  @ViewChild('sectionSelect') sectionSelect: Select;
  constructor(public navCtrl: NavController,public globalVars:GlobalVars,
   public locationTracker: LocationTracker) {
     this.login = this.globalVars.getMyGlobalVar()
     this.role_type = this.globalVars.getMyGlobalrole()
      this.indx = 0 
if(this.role_type=="P")
      for(let x of this.login) {
         this.indx = this.indx + 1   
         
         if (this.indx == 1) {
            console.log("hi am name of header" + x.student_name)
            this.selected_record = x.student_name
            

         }
         
      }

 
  }
 
ngOnInit() {
this.login = this.globalVars.getMyGlobalVar()

      for(let x of this.login) {

          console.log("Value  " + x.email)
          console.log("Value  " + x.roll)   
            
      }
}
 doFilter() {

		    this.sectionSelect.open();
        console.log("am coming"+this.selected_record);
        //this.fetchmessage(this.roll_no);

	  }

 changerecord(x){
                 this.selected_record=x.student_name  
     }	  	  
   
  	  
 changeHeader(){
        console.log("checking the selection header")
        console.log("the selected roll_no" + this.selected_roll_no)
        console.log("am coming");
        this.selected_record=this.selected_roll_no;
        
        console.log(this.selected_roll_no)
      }	  	  

  start(){
    this.locationTracker.startTracking();
  }
 
  stop(){
    this.locationTracker.stopTracking();
  }
 
}