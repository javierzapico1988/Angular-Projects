import {
    Component, OnInit, OnDestroy
}
    from '@angular/core';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import { FetchRecipes, StoreRecipes } from '../recipes/store/recipe.actions';

@Component(
    {
        selector: 'app-header',
        templateUrl: 'header.component.html',
        styles: ['header.component.css']
    })

export class HeaderComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isAuthenticated = false;
    constructor(private store: Store<AppState>) { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit(): void {
        this.subscription = this.store.select('auth')
            .pipe(
                map(authState => authState.user)).subscribe(user => {
                    this.isAuthenticated = !!user;
                })
    }
    public collapszed = true;

    onSaveData() {
        this.store.dispatch(new StoreRecipes());
    }


    onFetchData() {
        this.store.dispatch(new FetchRecipes());
    }

    onLogOut() { this.store.dispatch(new Logout()) }
}
