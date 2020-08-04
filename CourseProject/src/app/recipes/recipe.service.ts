import { Injectable, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.modal';
import { AddIngredients } from '../shopping-list/store/shopping-list.actions';
import { AppState } from '../app.reducer';

@Injectable({ providedIn: 'root' })
export class RecipeService implements OnInit {
    private fireBaseURL = 'https://courseproject-94bd2.firebaseio.com/';
    constructor(private httpclient: HttpClient, private store: Store<AppState>) { }

    ngOnInit(): void {

    }
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [];

    getRecipes() { return this.recipes };


    getRecipebyIndex(index: number) {
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    editRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }


    addIngredientsFromRecipe(ingredients: Ingredient[]) {
        this.store.dispatch(new AddIngredients(ingredients));
    }


    saveAllRecipes(recipes: Recipe[]) {
        this.httpclient.put(this.fireBaseURL + 'recipes.json', recipes)
            .subscribe((retData) => {
                console.log(retData);
            });
    }
    getRecipesFromServer() {
        return this.httpclient.get<Recipe[]>(this.fireBaseURL + 'recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                })
            })
            ).subscribe(retData => {
                this.recipes = retData;
                this.recipesChanged.next(this.recipes.slice());
            });
    }

}