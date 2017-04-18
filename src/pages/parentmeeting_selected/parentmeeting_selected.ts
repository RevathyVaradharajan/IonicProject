import { Component, ViewChild } from '@angular/core';
import { NavController,AlertController,NavParams} from 'ionic-angular';
import {Login} from '../../models/login-model';
import {ClassProvider} from '../../providers/class-provider';
import { ToastController } from 'ionic-angular';
import { Select } from 'ionic-angular';
import{ AboutPage} from '../Home/home';

@Component({
  selector: 'page-pta',
  templateUrl: 'ParentMeeting_selected.html'
})
export class ParentMeeting_selected {

parm_school_id:any;
parm_standard:any;
parm_section:any;
pt_rollno:Login[];
selected_record:any;
selected_rollno:any;


@ViewChild('sectionSelect') sectionSelect: Select;
constructor(public navCtrl:NavController, public navParams: NavParams,public classProvider:ClassProvider,public toastController:ToastController ){


                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_school_id  = navParams.get('parm_school_id');
               // this.selected_section='1';

}    

    ngOnInit () {
      
    //  this.fetchperiod(this.parm_standard);
      this.fetchStudent(this.parm_school_id,this.parm_standard,this.parm_section);
      
    }
      
    fetchStudent(school_id:number,standard:any,section:string)  {
            
    
            this.classProvider
              . getStudentForClass(school_id,standard,section)
              . subscribe(res =>  {this.pt_rollno = <Login[]>res,this.check()},
                          err =>   this.errorToast()); 

      }  



 check() {
  
   for (let x of this.pt_rollno) {
        let i = 0
        i = i + 1 

        if (i==1) {
           this.selected_record = x.student_id;
        }   
        console.log("Value of the first name" + x.student_name)    

   }
 }
 errorToast() {
    let toast = this.toastController.create({
        message: "Questions not loaded this time. Please try again later",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }
changeHeader(){
  console.log("am coming");
    this.selected_record=this.selected_rollno;
  }
doFilter() {
		 this.sectionSelect.open();
     console.log("am coming"+this.selected_record);
	}
  home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
}


