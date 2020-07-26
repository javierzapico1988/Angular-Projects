import {
    Component, OnInit, OnDestroy
}
    from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component(
    {
        selector: 'app-header',
        templateUrl: 'header.component.html',
        styles: ['header.component.css']
    })

export class HeaderComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    isAuthenticated = false;
    constructor(private recipeService: RecipeService, private authservice: AuthService) { }
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
    ngOnInit(): void {
        this.subscription = this.authservice.user.subscribe(user => {
            this.isAuthenticated = !!user;
        })
    }
    public collapszed = true;

    onSaveData() {
        this.recipeService.saveAllRecipes(this.recipeService.getRecipes())
    }


    onFetchData() { this.recipeService.getRecipesFromServer() }


}
