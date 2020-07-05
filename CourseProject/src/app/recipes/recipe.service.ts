import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is Simply a test recipe',
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'
        ),
    ];

    //Slice will return a new copy of the array, otherwise we will get the original due to an array being
    // reference type.
    getRecipes() { return this.recipes.slice(); }

}