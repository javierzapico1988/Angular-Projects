import {
    Component, OnInit, Inject, PLATFORM_ID
}
    from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { AutoLogin } from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
    constructor(private store: Store<AppState>, @Inject(PLATFORM_ID) private platformId) { }
    title: string = "Course Project";
    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.store.dispatch(new AutoLogin());
        }
    }
}
