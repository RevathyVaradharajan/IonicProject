import { Component,OnInit } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular'; 
import { LocalNotifications} from 'ionic-native';
import { Notification} from '../../models/Notification';
import { NotifyProvider} from '../../providers/notify-provider';
import { ToastController} from 'ionic-angular';
import { NotifybydatePage} from '../notification/notification';
import {Notifynew} from '../notification_view/notification_view';
import {LoadingController} from 'ionic-angular';
import * as moment from 'moment';

@Component({

  selector: 'page-notify',
  templateUrl: 'notification_selected.html',
  providers:[NotifyProvider]

})

export class notifyPage {


 //below fields will be used to enter in database.
    notify_page_notification: Notification = new Notification();
    parm_update_type: string;

//data from the screen
    selected_days: any[];
    loader:any;
constructor(public navCtrl: NavController, public platform: Platform, 
            public alertCtrl: AlertController, public navParams: NavParams,
            public notifyProvider:NotifyProvider, public toastController: ToastController,
            public loadingController:LoadingController) {
                
            this.selected_days = [
            {title: 'Monday',    dayCode: 1, checked:true},
            {title: 'Tuesday',   dayCode: 2, checked:true},
            {title: 'Wednesday', dayCode: 3, checked:true},
            {title: 'Thursday',  dayCode: 4, checked:true},
            {title: 'Friday',    dayCode: 5, checked:true},
            {title: 'Saturday',  dayCode: 6, checked:true},
            {title: 'Sunday',    dayCode: 0, checked:true}
        ];                     
 
}

ngOninit() {
     this.loading();
 
}
    
 loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }
   
addNotifications(){

          this.notify_page_notification.from_date     = this.navParams.get('parm_from_date');
          this.notify_page_notification.to_date       = this.navParams.get('parm_to_date'); 
          this.notify_page_notification.title         = this.navParams.get('parm_title');
          this.notify_page_notification.message       = this.navParams.get('parm_message');        
          this.notify_page_notification.id            = this.navParams.get('parm_id');
          this.parm_update_type                       = this.navParams.get('parm_update_type');  

          //Get the vvalue from Parm 
          this.notify_page_notification.school_id     = 1
          //Get the vvalue from Parm 
          this.notify_page_notification.created_by    = "Udhay"
          //Get the vvalue from Parm 
          this.notify_page_notification.weekday1         = " "  
          this.notify_page_notification.weekday2         = " "  
          this.notify_page_notification.weekday3         = " "  
          this.notify_page_notification.weekday4         = " "  
          this.notify_page_notification.weekday5         = " "  
          this.notify_page_notification.weekday6         = " "  
          this.notify_page_notification.weekday7         = " "  
 

          for (let i of this.selected_days) {
                 
                 if(i.checked) {
                     
                    switch(i.title) {

                        case 'Monday':
                            this.notify_page_notification.weekday1         = i.title
                            break;

                        case 'Tuesday':
                            this.notify_page_notification.weekday2         = i.title
                            break;

                        case 'Wednesday':
                            this.notify_page_notification.weekday3        = i.title
                            break;

                        case 'Thursday':
                            this.notify_page_notification.weekday4         = i.title
                            break;

                        case 'Friday':
                            this.notify_page_notification.weekday5         = i.title
                            break;

                        case 'Saturday':
                            this.notify_page_notification.weekday6         = i.title
                            break;

                        case 'Sunday':
                            this.notify_page_notification.weekday7         = i.title
                            break;

                    }
                 }
             }     
     
    if (this.parm_update_type == "edit") {
         this.notificationUpdt(this.notify_page_notification, this.notify_page_notification.id)
     } else {
    
       this.notificationPost(this.notify_page_notification);
    }
         
}


notificationPost (prvdr_notify_page_notification:Notification) {
     
          this.notifyProvider
              .addNotify(prvdr_notify_page_notification)
              .subscribe(res => {this.successToastreturn("Notification updated to Database", "middle"),this.nextPage(),this.loader.dismiss()},
                        err =>  {this.loader.dismiss(),this.errorToast("Notification not updated to Database", "middle")}); 

}

notificationUpdt(prvdr_notify_page_notification:Notification,prvdr_notify_page_id:number) {
              console.log("I am coming to update the notification")  
              this.notifyProvider
              .putNotify(prvdr_notify_page_notification,prvdr_notify_page_id)
              .subscribe(res => {this.successToastreturn("Notification updated to Database", "middle"),this.nextPage(),this.loader.dismiss()},
                         err =>  {this.loader.dismiss(),this.errorToast("Notification not updated to Database", "middle")}); 

}

successToastreturn(msg:string,pos:string) {

        let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: pos
        });
        toast.present();
}

errorToast(msg:string,pos:string) {
    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: pos
        });
        toast.present();

}
 
nextPage() {

     if (this.parm_update_type == "edit") {  
         this.navCtrl.push(Notifynew);
         this.navCtrl.setRoot(Notifynew)
     } else {
         this.navCtrl.push(NotifybydatePage)
         this.navCtrl.setRoot(NotifybydatePage)
     }    
}

}


  



