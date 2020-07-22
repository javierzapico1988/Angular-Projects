import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.modal';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 6),
    ];

    getIngredients() { return this.ingredients.slice() }
    addIngredientsFromRecipe(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())

    }
    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice())
    }
    getIngredient(index: number) { return this.ingredients[index]; }
    editIngredient(index: number, updatedIngredient: Ingredient) {
        this.ingredients[index] = updatedIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}