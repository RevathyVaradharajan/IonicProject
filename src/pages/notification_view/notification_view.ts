import { Component } from '@angular/core';
import { NavController,AlertController,NavParams} from 'ionic-angular';
import{NotifybydatePage} from '../notification/notification';
import { ItemSliding } from 'ionic-angular';
import {NotifyProvider} from '../../providers/notify-provider';
import {Notification} from '../../models/Notification';
import { ToastController } from 'ionic-angular';
import { AboutPage } from '../Home/home';
import{LoadingController} from 'ionic-angular';
@Component({
  selector:'page-Notifynew',
  templateUrl: 'notification_view.html'
})

export class Notifynew {

selected_abt_page_date:any;
selected_school_id: number = 1;
abt_page_notification: Notification[];
loader:any;
avatar_ht:boolean=false;
id: number;
<<<<<<< HEAD
recep_ind:string;
segment:any;
selected_to_date:any  = new Date().toISOString();
=======

>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
 constructor(public navCtrl: NavController, public navParams: NavParams,
             public notifyProvider:NotifyProvider, public toastController: ToastController,
             public loadingController:LoadingController) {

<<<<<<< HEAD
                let today = new Date();
                let  dd: any    = today.getDate();
                let  mm: any    = today.getMonth()+1; //January is 0!
                let  yyyy: any  = today.getFullYear();
                let  month: string;
        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

             this.selected_abt_page_date = yyyy+'-'+mm+'-'+dd;         
             this.segment = "admin" 
             this.recep_ind = 'A'
             this.loading();    
             this.fetchNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);
}
 
loading() {

        this.loader = this.loadingController.create({
        content:"Please wait"
        });
        this.loader.present();
}

fetchNotify(prvdr_abt_page_date: string, prvdr_abt_page_school_id: any,recep_ind:string)
 {

        this.notifyProvider
        .getNotify(prvdr_abt_page_date, prvdr_abt_page_school_id,this.recep_ind)
        .subscribe(res => {this.abt_page_notification = <Notification[]>res,this.loader.dismiss()},
                       err => {this.loader.dismiss(), this.errorToast()}); 
 } 
 
 segselect_teacher(){

    switch(this.segment){
    
      case "admin": {
      this.recep_ind = "A" 
      this.fetchNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);
      break;  
    }

      case "noti": {
      this.recep_ind = "T" 
      this.fetchNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);
      break;  
      }
    }
 }


 
=======
                this.fetchNotify(this.selected_abt_page_date,this.selected_school_id);
  }
 
  ngOnInit() {
        this.loading();    
  }

  loading(){
        this.loader = this.loadingController.create({
        content:"Please wait"
        });
        this.loader.present();
    }
  fetchNotify(prvdr_abt_page_date: string, prvdr_abt_page_school_id: any) {
    
        console.log(prvdr_abt_page_date);
        this.notifyProvider
        .getNotify(prvdr_abt_page_date, prvdr_abt_page_school_id)
        .subscribe(res => {this.abt_page_notification = <Notification[]>res,this.loader.dismiss()},
                       err => {this.loader.dismiss(), this.errorToast()}); 

  }
  
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
  errorToast() {
         let toast = this.toastController.create({
          message: "Notification not loaded, please try after sometime",
          duration: 1000,
          position: 'middle'
          });
          toast.present();
  }

<<<<<<< HEAD

edit(slidingItem:ItemSliding,x){
=======
  edit(slidingItem:ItemSliding,x){
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    slidingItem.close()
    let index = this.abt_page_notification.indexOf(x);

     this.navCtrl.push(NotifybydatePage, {
      parm_from_date : x.from_date,
      parm_to_date : x.to_date,
      parm_title: x.title,
      parm_message: x.message,
      parm_id: x.id,
      parm_update_type : "edit",
      parm_recep_ind: x.recep 
  });
}

view (slidingItem: ItemSliding) {
      this.navCtrl.push(NotifybydatePage);
      slidingItem.close();
}

notifydelete(id:number){
    this.notifyProvider
            .deleteNotify(id)
            .subscribe(res => {this.successToastDelete('Record deleted'),this.reload()},
                              err => this.errorToast());
}

delete(slidingItem:ItemSliding,x){
   this.loading();
<<<<<<< HEAD
   this.notifydelete(x.id)
=======
    this.notifydelete(x.id)
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
    //console.log("Delete is working" + x.id);
}

  reload()
  {
<<<<<<< HEAD
   this.fetchNotify(this.selected_abt_page_date,this.selected_school_id,this.recep_ind);

    //this.fetchNotify(this.selected_abt_page_date,this.selected_school_id);
=======
    this.fetchNotify(this.selected_abt_page_date,this.selected_school_id);
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
  }

  successToastDelete(msg:string){
  let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: 'middle'
        });
        toast.present();

}
 

showrow(n){

    let idx = this.abt_page_notification.indexOf(n)
    
    console.log("the value of message length" +  n.message.length)
    if (n.message.length < 30) {
       this.avatar_ht =  false
    }
    else {   
       this.avatar_ht =  true
  }

    if(!n.expand){
        n.expand=true;
    } else {
        n.expand=false;
    }
 }

<<<<<<< HEAD
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
 

}
=======
}
>>>>>>> 89be561dea3b481878a98ad5b3e7a821abea1d8c
