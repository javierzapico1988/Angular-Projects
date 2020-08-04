import {
    Component, OnInit, OnDestroy
}
    from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';

@Component(
    {
        selector: 'app-header',
        templateUrl: 'header.component.html',
        styles: ['header.component.css']
    })

export class HeaderComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isAuthenticated = false;
    constructor(private recipeService: RecipeService, private store: Store<AppState>) { }
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
        this.recipeService.saveAllRecipes(this.recipeService.getRecipes())
    }


    onFetchData() { this.recipeService.getRecipesFromServer() }

    onLogOut() { this.store.dispatch(new Logout()) }
}
