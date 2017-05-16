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

selected_abt_page_date:string = "2017-03-04"
selected_school_id: number = 1;
abt_page_notification: Notification[];
loader:any;
avatar_ht:boolean=false;
id: number;

 constructor(public navCtrl: NavController, public navParams: NavParams,
             public notifyProvider:NotifyProvider, public toastController: ToastController,
             public loadingController:LoadingController) {

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
  
  errorToast() {
         let toast = this.toastController.create({
          message: "Notification not loaded, please try after sometime",
          duration: 1000,
          position: 'middle'
          });
          toast.present();
  }

  edit(slidingItem:ItemSliding,x){
    slidingItem.close()
    let index = this.abt_page_notification.indexOf(x);
    console.log("index" + index)
    console.log("title in edit" + x.title)
    console.log("title in message" + x.message)
    console.log("title in id" + x.id)
    console.log("from_date"   + x.from_date)
    console.log("to_date"     + x.to_date)

     this.navCtrl.push(NotifybydatePage, {
      parm_from_date : x.from_date,
      parm_to_date : x.to_date,
      parm_title: x.title,
      parm_message: x.message,
      parm_id: x.id,
      parm_update_type : "edit"
    });
}
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
view (slidingItem: ItemSliding) {
      this.navCtrl.push(NotifybydatePage);
      console.log("I am comming when view is clicked")  ;
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
    this.notifydelete(x.id)
    //console.log("Delete is working" + x.id);
}

  reload()
  {
    this.fetchNotify(this.selected_abt_page_date,this.selected_school_id);
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

    console.log("am coming to show" + n.expand);
    if(!n.expand){
        n.expand=true;
        console.log("am coming to show end" + n.expand);
    } else {
        n.expand=false;
    }
 }
 

}
