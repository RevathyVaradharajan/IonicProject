import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Examtimetable} from '../../models/exam_timetable';
import {ExamtimetableProvider} from '../../providers/examtimetable-provider';
import { Resultview} from '../../pages/exam_selected/exam_selected';
import{ LoadingController} from 'ionic-angular';
import { AboutPage } from '../Home/home';
import { ToastController } from 'ionic-angular';
import { ItemSliding } from 'ionic-angular';
@Component({
    selector:'page-exam',
  templateUrl: 'exam_view.html'

})
export class examNew {

  show:boolean;
  exam_view: Examtimetable[]
  standard: any;
  school:number 
  exam_type:string;
  date:any;
  loader:any;
  id:number;
  parm_id:number;
    constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public examProvider:ExamtimetableProvider,
              public loadingController:LoadingController,
              public toastController: ToastController){

              this.school    =  navParams.get('parm_school')
              this.standard  =  navParams.get('parm_standard')
              this.exam_type =  navParams.get('parm_exam_type')
              this.id = navParams.get('parm_id')
              this.date      =  '09-03-2017'    
    }

  ngOnInit(){
      this.loading();
      console.log("coming in the view" + this.standard)
      this.examtimetableGet(this.standard,this.school,this.date)

  }

  loading(){
      this.loader = this.loadingController.create({
        content:"Please wait"
      });
      this.loader.present();
    }


  examtimetableGet(std:any,school:number,date:any) {
  
      this.examProvider
          .getExamtable(std,school,date)
          .subscribe(res => {this.exam_view = <Examtimetable[]>res,this.check(),this.loader.dismiss()},
                     err =>  {this.loader.dismiss(),this.errorToast1()}); 


  }
  home(){
         this.navCtrl.push(AboutPage);
        this.navCtrl.setRoot(AboutPage);
        }

  check() {

    console.log("coming to check the value")
    for(let x of this.exam_view) {

        console.log("value date" + x.date)
        console.log("value time" + x.from_time)
        console.log("value time" + x.end_time)
        console.log("value time" + x.id)
    }

  }

  edit(slidingItem:ItemSliding,n) {
  slidingItem.close();
       this.navCtrl.push(Resultview,{
                 parm_standard:  this.standard,
                 parm_school_id: this.school,               
                 parm_exam_type: n.exam_type,
                 parm_exam_date: n.date,
                 parm_from_time:n.from_time,
                 parm_to_time:n.end_time,
                 parm_subject:n.subject,
                 parm_syllabus:n.syllabus,
                 parm_id:n.id,
                 parm_update_type: "edit"});

  }
reload(){
this.examtimetableGet(this.standard,this.school,this.date);
}
  Examdelete( exam_view,id: number){
    console.log(id)
    this.examProvider
            .removeExamtable(id)
            .subscribe(res => {this.successToastDelete('Record deleted'),this.reload()},
                              err => this.errorToast('error removing'));
}

Delete(slidingItem:ItemSliding,x){
   slidingItem.close()
  this.Examdelete(this.exam_view, x.id)
  console.log("delete exam" + x.id)
}


 errorToast(msg: string) {
    let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }


  successToastDelete(msg:string){
  let toast = this.toastController.create({
        message: msg,
        duration: 1000,
        position: 'middle'
        });
        toast.present();

}
  
  errorToast1() {
  } 

   view(n){
    
    console.log("am coming to show");   
    if(!this.show){
        this.show=true;
    } else{
      this.show=false;

    }
   }
 
   }

