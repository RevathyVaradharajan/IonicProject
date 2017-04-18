  import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AboutPage } from '../Home/home';

@Component({
  templateUrl: 'quizadmin.html',
  selector:'my-quiz1'
})
export class QuizAdmin {
constructor(public navCtrl: NavController, public navParams: NavParams){

}
home(){
  this.navCtrl.push(AboutPage);
  this.navCtrl.setRoot(AboutPage);
}
}