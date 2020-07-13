import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.modal';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe(
            'A Test Recipe',
            'This is Simply a test recipe',
            'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg',
            [new Ingredient('Burger', 1), new Ingredient('Fries', 20)]
        ),
        new Recipe(
            'A Test Recipe',
            'This is Simply a test recipe',
            'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2019/04/quiche.jpg',
            [new Ingredient('Meat', 1), new Ingredient('Dressing', 1)]
        )
    ];

    //Slice will return a new copy of the array, otherwise we will get the original due to an array being
    // reference type.
    getRecipes() { return this.recipes.slice(); }

    getRecipebyIndex(index: number) {
        return this.recipes[index];
    }
}