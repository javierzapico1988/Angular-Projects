import { Component, OnInit, Input } from '@angular/core';
import { CustomTimer } from '../game-control/game-control.component';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {
  @Input('numberEvent') numberEvent: CustomTimer
  constructor() { }

  ngOnInit(): void {
  }

}
