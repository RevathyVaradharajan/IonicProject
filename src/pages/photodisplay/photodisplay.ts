import { Component } from '@angular/core';
import { Photo} from '../photo/photo';
import { Camera} from 'ionic-native';
@Component({
  selector: 'page-photodisplay',
  templateUrl: 'photodisplay.html',
})
export class PhotodisplayPage {
 public base64Image: string;

  constructor() {

  }

  takePhoto(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        
        correctOrientation:true,
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
}