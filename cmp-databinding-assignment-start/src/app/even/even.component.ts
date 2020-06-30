import { Component, OnInit, Input } from '@angular/core';
import { CustomTimer } from '../game-control/game-control.component';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit {
  @Input('numberEvent') numberEvent : CustomTimer
  constructor() { }

  ngOnInit(): void {
  }

}
