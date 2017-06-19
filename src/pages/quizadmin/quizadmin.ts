  import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../Home/home';
import {Quiz} from '../../models/Quiz-model';
import {QuizProvider} from '../../providers/quiz-provider';
import { ToastController } from 'ionic-angular';


@Component({
  templateUrl: 'quizadmin.html',
  selector:'my-quiz1'
})
export class QuizAdmin {
  
  quiz_admin: Quiz = new Quiz();
  classes:number;
  subject:String;
  parm_standard:number;
  parm_subject:string;
  question:any;
  option1:string;
  option2:string;
  option3:string;
  option4:string;
  Answer:string;
  school_id:any;


          constructor(public navCtrl: NavController, 
                      public navParams: NavParams,
                      public quizProvider:QuizProvider,
                      public toastController: ToastController){

                this.parm_standard = navParams.get('parm_standard');
                this.parm_subject  = navParams.get('parm_subject');
                this.school_id=1
}
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}

quizadd (prvdr_quiz_admin_quiz:Quiz, classes:number, subject:string) {

          this.quizProvider
            .addQuiz(prvdr_quiz_admin_quiz, classes, subject) 
            .subscribe(res => {this.successToastreturn(), this.check()},
                       err =>  this.errorToast()); 
  }
  check(){

  }
  successToastreturn() {

        let toast = this.toastController.create({
        message: "Timetable updated to database",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

errorToast() {
    let toast = this.toastController.create({
        message: "Timetable not loaded, please try after sometime",
        duration: 1000,
        position: 'middle'
        });
        toast.present();

  }
  add(){

       this.quiz_admin.questions = this.question
       this.quiz_admin.option1 = this.option1
       this.quiz_admin.option2 = this.option2
       this.quiz_admin.option3 = this.option3
       this.quiz_admin.option4 = this.option4
       this.quiz_admin.answer = this.Answer
       this.quiz_admin.school_id = this.school_id


      this.quizadd(this.quiz_admin, this.parm_standard,this.parm_subject)
      console.log("class" + this.parm_standard + this.parm_subject)
  }


}