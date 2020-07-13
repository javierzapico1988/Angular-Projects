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
        new Recipe(
            'Another one',
            'Different Recipe',
            'https://cdn.vox-cdn.com/thumbor/J1ap801pIkP2IehiUyTPFgxKljc=/0x260:1440x1440/1200x800/filters:focal(632x830:862x1060)/cdn.vox-cdn.com/uploads/chorus_image/image/63960957/BK_ImpossibleWhopper_Post1.0.jpg'
        ),
    ];

    //Slice will return a new copy of the array, otherwise we will get the original due to an array being
    // reference type.
    getRecipes() { return this.recipes.slice(); }

    getRecipebyIndex(index: number) {
        return this.recipes[index];
    }
}