import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Quiz} from '../../models/Quiz-model';
import {Test} from '../quiz1/quiz1';
import{AboutPage} from '../Home/home';
/*
  Generated class for the Quiz2 page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-quiz2',
  templateUrl: 'quiz_result.html'
})


export class Quiz2Page {
  
  quiz_answers_quiz: Quiz[];
  score:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.quiz_answers_quiz = navParams.get('parm_quiz_data');
      this.calculate_score ();
      this.calculate_question();

  }
  submit(){
         this.navCtrl.push(Test);
         this.navCtrl.setRoot(Test);

  }
  home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
calculate_question(){
  if(this.quiz_answers_quiz.length){
    
  }
}
  calculate_score() {
        for(let num of this.quiz_answers_quiz) {

          if(num.checked == num.answer){
            this.score = this.score + 1;
          }
        }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad Quiz2Page');
  }

}
