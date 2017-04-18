import { Component, Input } from '@angular/core';
import {AngularFire} from 'angularfire2';
 
@Component({
  selector: 'flash-card',
  templateUrl: 'flash-card.html'
})
export class FlashCardComponent {
 
  @Input('isFlipped') flipCard: boolean;
 
  constructor() {
 
  }
 
}