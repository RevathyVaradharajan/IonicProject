import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the Photo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-photo',
  templateUrl: 'photo.html'
})
export class Photo {
  src:string;
  likes:number;
  constructor(src:string,likes:number) {
    this.src=src;
    this.likes=likes;
  }

  ionViewDidLoad() {
    console.log('Hello PhotoPage Page');
  }

}
