import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import { notifyPage} from '../notification_selected/notification_selected';
import {Notifynew} from '../notification_view/notification_view';
import {UsernameValidator} from '../validator/username';
import {Notification} from '../../models/Notification';
import { AboutPage } from '../Home/home';
import{LoadingController} from 'ionic-angular';

@Component({
  selector: 'page-notifybydate',
  templateUrl: 'notification.html'
})

export class NotifybydatePage {
   
  selected_notify: Notification= new Notification();
   
  notifyForm: FormGroup;

   //Updated when the values are for Edit.
   
    parm_notify_from_date:any;
    parm_notify_to_date:any;
    parm_notify_title: any;
    parm_notify_message: any;
    parm_notify_activity:any;
    parm_update_type: any;
    parm_notify_id:number;
    loader:any;
    current_date:any
    title_message: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public loadingCOntroller:LoadingController) {

        this.current_date = new Date();
        let  dd: any    = this.current_date.getDate();
        let  mm: any    = this.current_date.getMonth()+1; //January is 0!
        let  yyyy: any  = this.current_date.getFullYear();
        let  month: string;
        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        this.current_date = dd+'/'+mm+'/'+yyyy; 
        this.current_date = yyyy+'-'+mm+'-'+dd; 

        console.log("Value of the current Date" + this.current_date)

        this.parm_notify_from_date = navParams.get('parm_from_date');
        this.parm_notify_to_date   = navParams.get('parm_to_date');
        this.parm_notify_title     = navParams.get('parm_title');
        this.parm_notify_message   = navParams.get('parm_message'); 
        this.parm_update_type      = navParams.get('parm_update_type');
        this.parm_notify_id        = navParams.get('parm_id');
        this.parm_notify_activity  = navParams.get('parm_recep_ind');


        if(this.parm_update_type == "edit"){
           this.notifyForm = formBuilder.group({  
           selected_from_date: [this.parm_notify_from_date,UsernameValidator.checkFromDate],
           selected_to_date:   [this.parm_notify_to_date,Validators.required],
           selected_title:     [this.parm_notify_title,Validators.required],
           selected_message:   [this.parm_notify_message,Validators.required],
           selected_activity:  [this.parm_notify_activity]
          }, {validator:UsernameValidator.checkTooDate})
        } 
          else {
          
          this.notifyForm = formBuilder.group({  
           selected_from_date: [this.current_date,UsernameValidator.checkFromDate],
           selected_to_date:   [this.current_date,Validators.required],
           selected_title:     ['',Validators.required],
           selected_message:   ['',Validators.required],
           selected_activity: ['A']
          },{validator:this.checkTooDate})
        }   
  }

//          },{validator:UsernameValidator.checkTooDate})

  checkTooDate
     (g:FormGroup): any {
    
       console.log ("Checktoodate main module" ) 
      
       let  from_dt = g.get('selected_from_date').value 
       let  to_dt   = g.get('selected_to_date').value 

       let  activity = g.get('selected_activity').value 

      console.log("i'm coming in activity" + activity)    
   //    if (activity=="A") {
     //         selected_title = "General Scool Notification"
      // }else {
  //    //     this.title_message = "Notification for teachers"
     //  }



        if ( to_dt < from_dt) {
            console.log("succesful in IF loop") 
            return {
                  "Less than": true
            }
        }  
            return null;
}

  notifythanks() {
    
  console.log("recep indicator" + this.notifyForm.value.selected_activity)
   this.navCtrl.push(notifyPage, {
                     parm_from_date: this.notifyForm.value.selected_from_date,    
                     parm_to_date: this.notifyForm.value.selected_to_date,
                     parm_title: this.notifyForm.value.selected_title,
                     parm_message: this.notifyForm.value.selected_message,
                     parm_update_type: this.parm_update_type, 
                     parm_recep_ind:this.notifyForm.value.selected_activity,
                     parm_id: this.parm_notify_id});
                                                                     
 }
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
view(){
    this.navCtrl.push(Notifynew);
    console.log("am coming");
}
resetForm() {
      console.log('hello valid b4:' + this.notifyForm.valid);
      this.notifyForm.reset();
      
    }

  

}
