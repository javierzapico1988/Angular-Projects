import {
    Component, OnInit
}
    from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AutoLogin } from './auth/store/auth.actions';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>) { }
    title: string = "Course Project";
    ngOnInit(): void {
        this.store.dispatch(new AutoLogin());
    }
}
