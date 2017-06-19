import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import{Period} from '../../period/period';
import{NotifybydatePage} from '../../notification/notification';
import {ClassYear} from '../../admin/class-year/class-year';
import{StudentDetails} from'../../studentDetails/sd';
/*
  Generated class for the StudentProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    templateUrl: 'adminmain.html'
})
export class adminmain {
constructor(public navCtrl: NavController){
    console.log("am coming in page one")
}
Submit_peroid(){
     this.navCtrl.push(Period);
}
Submit_teacher(){
  
     this.navCtrl.push(NotifybydatePage);
}
Submit_student(){

     this.navCtrl.push(StudentDetails);
}
Submit_Fees(){

     this.navCtrl.push(ClassYear);
}

}