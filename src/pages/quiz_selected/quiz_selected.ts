import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular'; 
import { Quiz} from '../../models/Quiz-model';
import { QuizProvider} from '../../providers/quiz-provider';
import { Quiz2Page } from '../quiz_result/quiz_result';
import { ToastController } from 'ionic-angular';
import { LocalNotifications } from 'ionic-native';

@Component({
   templateUrl: 'quiz_selected.html',
   selector:'page-quiz0',
   providers:[QuizProvider]

})

export class Quiz1 {

parm_standard:number
parm_section:any
parm_subject:any
question_no: number = 0;



quiz_studnt_quiz: Quiz[];
quiz1_studnt_quiz: Quiz[];
studnt_quiz: Quiz;

    constructor(public navCtrl: NavController, 
                public navParams: NavParams,
                public quizProvider:QuizProvider, public toastController: ToastController,
                public alertCtrl: AlertController) {
                
                this.quiz_studnt_quiz = new Array<Quiz>();

                this.parm_standard = navParams.get('parm_standard');
                this.parm_section  = navParams.get('parm_section');
                this.parm_subject  = navParams.get('parm_subject');

                //this.parm_standard = 10
                

                this.fetchquestions(this.parm_standard, this.parm_subject);  


     }

    
fetchquestions( prvdr_quiz_page_class: number, prvdr_quiz_page_subject: string) {

  
      this.quizProvider
            .getQuestions( prvdr_quiz_page_class, prvdr_quiz_page_subject)
            .subscribe(res => {this.quiz1_studnt_quiz = <Quiz[]>res,this.successToastreturn()},
                       err =>  this.errorToast());

}

successToastreturn() {

    

        for(let num of this.quiz1_studnt_quiz) {

                this.studnt_quiz = new Quiz();
                
                this.question_no = this.question_no + 1
                this.studnt_quiz.answer = num.answer
                this.studnt_quiz.questions = num.questions
                this.studnt_quiz.option1 = num.option1
                this.studnt_quiz.option2 = num.option2
                this.studnt_quiz.option3 = num.option3
                this.studnt_quiz.option4 = num.option4
                this.studnt_quiz.q_no = this.question_no;
                this.studnt_quiz.subject = num.subject
                this.studnt_quiz.checked = num.checked
                this.studnt_quiz.classes = num.classes
                this.quiz_studnt_quiz.push(this.studnt_quiz);

            
        }

        let toast = this.toastController.create({
        message: "Questions loaded",
        duration: 1000,
        position: 'bottom'
        });
        toast.present();
  }

  errorToast() {
    let toast = this.toastController.create({
        message: "Questions not loaded this time. Please try again later",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }
  submit(){
     this.navCtrl.push(Quiz2Page, {
          parm_quiz_data :  this.quiz_studnt_quiz
     });
  }
   

}













/*

    ionViewDidLoad(){

    }


    subselect(){
        console.log("I am coming for subject" + this.selected_subject)
        this.fetchquestions(this.selected_subject,this.selected_class);  
   }

   fetchquestions(prvdr_quiz_page_subject: string, prvdr_quiz_page_class: number) {
     
      this.quizProvider
            .getQuestions(prvdr_quiz_page_subject, prvdr_quiz_page_class)
            .subscribe(res => {this.quiz_studnt_quiz = <Quiz[]>res,this.successToastreturn()},
                       err =>  this.errorToast());

   }

    successToastreturn() {

        let toast = this.toastController.create({
        message: "Questions loaded",
        duration: 1000,
        position: 'bottom'
        });
        toast.present();
  }

  errorToast() {
    let toast = this.toastController.create({
        message: "Questions not loaded this time. Please try again later",
        duration: 1000,
        position: 'middle'
        });
        toast.present();
  }

  
  
   submit(){

     console.log("I am coming for subject")
     this.navCtrl.push(Quiz2Page)
     this.navCtrl.setRoot(Quiz2Page, {
          parm_quiz_data :  this.quiz_studnt_quiz
     });

 //     for (let x of this.quiz_studnt_quiz) {
//            console.log("I am getting the array value"  + x.questions)
//            console.log("I am getting the array value"  + x.checked)
//       }
   }

}
*/