import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute,
    private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipe = this.recipeService.getRecipebyIndex(+params['id'])
    });
  }
  loadShoppingList() { this.shoppingListService.addIngredientsFromRecipe(this.recipe.ingredients) }
}
