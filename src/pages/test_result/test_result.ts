
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Resultmodel} from '../../models/Result';
import {ResultProvider} from '../../providers/Result-provider';
import { ToastController } from 'ionic-angular';
import { AboutPage } from '../Home/home';
import {LoadingController} from 'ionic-angular';

@Component({
  selector:'page-result',
  templateUrl: 'test_result.html'
})
export class Result {
  result_page:Resultmodel = new Resultmodel();
  selected_result_exam_type:any;
    selected_result_section:any;
  selected_result_roll_no: any;
  selected_result_subject: any;
    selected_result_standard:any;
  selected_result_mark: any;
  selected_result_out_of_mark: any;
  result_page_notification: Resultmodel[];
  loader:any;
  //selected_result_percentage:any;
  
    constructor(public navCtrl: NavController,navParams: NavParams,
                public loadingController:LoadingController,public resultprovider: ResultProvider, public toastController: ToastController){

            this.selected_result_exam_type= "model exam";
            this.selected_result_section="B";
            this.selected_result_roll_no= "Reena123";
            this.selected_result_subject= "science";
            this.selected_result_standard= 3;
            this.selected_result_mark= 85;
            this.selected_result_out_of_mark= 100;
            // this.selected_result_percentage= 8.5;

  
  this.result_page.exam_type = navParams.get('parm_exam_type');
  this.result_page.section = navParams.get('parm_section');
  this.result_page.roll_no = navParams.get('parm_roll_no');
  this.result_page.subject = navParams.get('parm_subject');
  this.result_page.standard = navParams.get('parm_standard');
  this.result_page.mark    = navParams.get('parm_mark');
  this.result_page.out_of_mark = navParams.get('parm.out_of_mark');
    //this.result_page.percentage = navParams.get('parm.percentage');

  this.result_page.exam_type= this.selected_result_exam_type
  this.result_page.section= this.selected_result_section
  this.result_page.roll_no = this.selected_result_roll_no
  this.result_page.subject = this.selected_result_subject
  this.result_page.standard=  this.selected_result_standard
  this.result_page.mark= this.selected_result_mark
  this.result_page.out_of_mark= this.selected_result_out_of_mark
  
  //this.result_page.percentage= this.selected_result_percentage

  
  console.log("passing message" + this.result_page.subject)

  this.resultPost(this.result_page, this.selected_result_roll_no)
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


   next(){
      console.log("i'm in view");
      this.dailydiaryGet (this.result_page.roll_no, this.result_page.exam_type);
      this.navCtrl.push(Result);
    }
    back(){
      
    }


resultPost (prvdr_result_page:Resultmodel,prvdr_result_page_roll_no:any) {
          this.resultprovider
            .addResult(prvdr_result_page,prvdr_result_page_roll_no) 
            .subscribe(res => {this.successToastreturn(),	this.loader.dismiss()},
                       err =>  {	this.loader.dismiss(),this.errorToast()}); 
  }

  dailydiaryGet(prvdr_result_page_roll_no:any, prvdr_result_page_exam_type:any) {
    
      console.log(prvdr_result_page_roll_no);
      this.resultprovider
            .getResult(prvdr_result_page_roll_no, prvdr_result_page_exam_type)
            .subscribe(res => {this. result_page_notification =<Resultmodel[]>res,this.check(),	this.loader.dismiss()},
                       err =>  {	this.loader.dismiss(),this.errorToast()}); 

  }

check(){
  for (let n of this.result_page_notification){
          console.log("Value of exam_type" + n.exam_type);
          console.log("Value of roll_no" + n.roll_no);
  }
}

 
 successToastreturn() {
        let toast = this.toastController.create({
        message: "Result updated to database",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

errorToast() {
    let toast = this.toastController.create({
        message: "Result not loaded, please try after sometime",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }
  home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}

}     