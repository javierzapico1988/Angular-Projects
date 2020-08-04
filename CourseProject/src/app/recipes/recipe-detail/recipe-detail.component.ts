import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  recipeId: number;
  constructor(private recipeService: RecipeService, private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.recipe = this.recipeService.getRecipebyIndex(this.recipeId)
    });
  }
  loadShoppingList() {
    this.recipeService.addIngredientsFromRecipe(this.recipe.ingredients)
  }
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['/recipes'])
  }
}
