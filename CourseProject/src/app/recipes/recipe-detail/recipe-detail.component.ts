import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map, switchMap } from 'rxjs/operators';
import { DeleteRecipes } from '../store/recipe.actions';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  recipeId: number;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      map(params => { return +params['id']; }
      ), switchMap(id => {
        this.recipeId = id;
        return this.store.select('recipes')
      }), map(recipesState => {
        return recipesState.recipes.find((recipes, index) => { return index === this.recipeId });
      })).subscribe(recipe => { this.recipe = recipe; })

  }
  loadShoppingList() {
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }
  deleteRecipe() {
    this.store.dispatch(new DeleteRecipes(this.recipeId));
  }
}
