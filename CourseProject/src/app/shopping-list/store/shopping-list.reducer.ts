import { Ingredient } from '../../shared/ingredient.modal';
import { ADD_INGREDIENT, ADD_INGREDIENTS, ShoppingListActions, UPDATE_INGREDIENT, DELETE_INGREDIENT, START_EDIT, STOP_EDIT } from './shopping-list.actions';

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}
const initialState: State =
{
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomato', 6),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
}
export function shoppingListReducer(state: State = initialState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }
        case UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = { ...ingredient, ...action.payload.ingredient };
            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state, ingredients: updatedIngredients, editedIngredientIndex: -1,
                editedIngredient: null
            };

        case DELETE_INGREDIENT:
            return {
                ...state, ingredients: state.ingredients.filter((x, index) => {
                    return index != state.editedIngredientIndex;
                }),
                editedIngredientIndex: -1,
                editedIngredient: null
            };
        case START_EDIT:
            return {
                ...state,
                editedIngredientIndex: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            }
        case STOP_EDIT:
            return {
                ...state,
                editedIngredientIndex: -1,
                editedIngredient: null
            }
        default:
            return state;
    }
}