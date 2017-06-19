import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Master} from '../../models/master'

/*
  Generated class for the StudentProfilePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector:'page-pageone',
    templateUrl: 'pageone.html'
})
export class Page1 {
    master:Master;
    selected_name:any;
    selected_fname:any;
    selected_address:any;
    selected_dob:any;
    selected_contact:any
        constructor(public navCtrl: NavController, public navParams: NavParams){

            this.master = navParams.get("parm_master")
            this.selected_name= this.master.student_name;
            this.selected_fname= this.master.father_name;
            this.selected_address= this.master.address;
            this.selected_dob= this.master.dob;
            this.selected_contact= this.master.phone_number;


            console.log("am coming in page one" + this.master.student_id);
}
}