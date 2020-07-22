import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.modal';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
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

    getRecipes() { return this.recipes.slice(); }

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
}