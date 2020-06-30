import {
    Component,
    Output,
    ViewChild,
    ElementRef,
    AfterViewInit,
    EventEmitter
} from '@angular/core';

@Component({selector: 'app-game-control', templateUrl: './game-control.component.html', styleUrls: ['./game-control.component.css']})

export class GameControlComponent implements AfterViewInit {
    @Output('timerEvent')timerEvent = new EventEmitter<CustomTimer>();
    currentTimerValue = 1;
    timer;
    gameStarted : boolean = false;
    ngAfterViewInit(): void {}
    startGame(counter : HTMLInputElement) {
        this.gameStarted = true;
        this.timer = setInterval(() => {
            this.currentTimerValue = this.currentTimerValue + 1;
            this.timerEvent.emit({count: this.currentTimerValue, intervalId: this.timer});
        }, 1000)


    }

    stopGame() {
        this.gameStarted = false;
        clearInterval(this.timer);
    }
}
export interface CustomTimer {
    count: number;
    intervalId: number
}
