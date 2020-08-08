import { Recipe } from '../recipe.model';
import * as RecipesAction from './recipe.actions'
import { STATE_PROVIDERS } from '@ngrx/store/src/state';
export interface State {
    recipes: Recipe[];
}

const initialState: State =
{
    recipes: []
}
export function recipeReducer(state = initialState, action: RecipesAction.RecipesAction) {
    switch (action.type) {
        case RecipesAction.SET_RECIPES:
            return { ...state, recipes: [...action.payload] }

        case RecipesAction.ADD_RECIPES:
            return { ...state, recipes: [...state.recipes, action.payload] }

        case RecipesAction.UPDATE_RECIPES:
            const updatedRecipe = {
                ...state.recipes[action.payload.index],
                ...action.payload.Recipe
            };

            const updatedRecipes = [...state.recipes];
            updatedRecipes[action.payload.index] = updatedRecipe;
            return { ...state, recipes: updatedRecipes }

        case RecipesAction.DELETE_RECIPES:
            return {
                ...state, recipes: state.recipes.filter((recipe, index) => { index !== action.payload }
                )
            }
        default:
            return state;
    }

}