import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HalfyearlyPage } from '../halfyearly/halfyearly';
import {AnnualdayPage} from '../annualday/annualday';
import {AttendancePage} from '../attendance/attendance';
import {Login} from '../../models/login-model';
import {NotifyProvider} from '../../providers/notify-provider';
import {Notification} from '../../models/Notification';
import { ToastController } from 'ionic-angular';
import {Dailydiary} from '../../models/Dailydairy';
import {DailydiaryProvider} from '../../providers/dailydiary-provider';
import {ClassProvider} from '../../providers/class-provider';
import {ClassSectionYear} from '../../models/ClassSectionYear';
import {ContactPage} from '../../pages/dailydiary_selected/dailydiary_selected';
import { AboutPage } from '../Home/home';
import{LoadingController} from 'ionic-angular';

@Component({

  templateUrl: 'dailydiary2.html',
  selector:'page-dailydiary2',
  providers:[DailydiaryProvider]

})


export class Diaryview {

parm_title: any;          
parm_message: any;          
parm_subject:any   
parm_due_date:any

constructor( public navCtrl: NavController, public navParams: NavParams){
         
          this.parm_title          = this.navParams.get('parm_title');
          this.parm_message        = this.navParams.get('parm_message'); 
          this.parm_subject        = this.navParams.get('parm_subject');
          this.parm_due_date       = this.navParams.get('parm_due_date');
   
}

home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
}