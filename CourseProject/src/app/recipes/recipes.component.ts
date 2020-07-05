import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  recipeDetails: Recipe
  constructor(private RecipeService: RecipeService) { }

  ngOnInit(): void {
    this.RecipeService.recipeSelected.subscribe((recipe: Recipe) => { this.recipeDetails = recipe });
  }
  loadRecipeDetails($event: Recipe) { this.recipeDetails = $event; }
}
