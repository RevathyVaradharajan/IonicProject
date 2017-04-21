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
    parm_update_type: any;
    parm_notify_id:number;
    loader:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,public loadingCOntroller:LoadingController) {

        this.parm_notify_from_date = navParams.get('parm_from_date');
        this.parm_notify_to_date   = navParams.get('parm_to_date');
        this.parm_notify_title     = navParams.get('parm_title');
        this.parm_notify_message   = navParams.get('parm_message'); 
        this.parm_update_type      = navParams.get('parm_update_type');
        this.parm_notify_id        = navParams.get('parm_id');

        console.log("value of parm date" + this.parm_notify_from_date)


       
        if(this.parm_update_type == "edit"){
           this.notifyForm = formBuilder.group({  
           selected_from_date: [this.parm_notify_from_date,UsernameValidator.checkFromDate],
           selected_to_date:   [this.parm_notify_to_date,Validators.required],
           selected_title:     [this.parm_notify_title,Validators.required],
           selected_message:   [this.parm_notify_message,Validators.required]
           }, {validator:UsernameValidator.checkTooDate})
        } 
          else {
           this.notifyForm = formBuilder.group({  
           selected_from_date: ['',UsernameValidator.checkFromDate],
           selected_to_date:   ['',Validators.required],
           selected_title:     ['',Validators.required],
           selected_message:   ['',Validators.required]
          }, {validator:UsernameValidator.checkTooDate})
        }   


  }

  notifythanks() {

   this.navCtrl.push(notifyPage, {
                     parm_from_date: this.notifyForm.value.selected_from_date,    
                     parm_to_date: this.notifyForm.value.selected_to_date,
                     parm_title: this.notifyForm.value.selected_title,
                     parm_message: this.notifyForm.value.selected_message,
                     parm_update_type: this.parm_update_type, 
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
