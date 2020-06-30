import {Component} from '@angular/core';
import {CustomTimer} from './game-control/game-control.component';

@Component({selector: 'app-root', templateUrl: './app.component.html', styleUrls: ['./app.component.css']})
export class AppComponent {
    evenNumbers : number[] = [];
    oddNumbers : number[] = [];

    addNewComponent($event : CustomTimer) {
        if (this.isEven($event.count)) {
            this.evenNumbers.push($event.count)
        } else {
            this.oddNumbers.push($event.count)
        }
    }
    isEven(n) {
        return n % 2 == 0;
    }
}
