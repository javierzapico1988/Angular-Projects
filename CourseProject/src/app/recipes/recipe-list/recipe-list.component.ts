import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @Output() onRecipeSelected:EventEmitter<Recipe> =new EventEmitter();
  recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'This is Simply a test recipe',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/chorizo-mozarella-gnocchi-bake-cropped.jpg'
    ),
  ];
  constructor() {}

  loadRecipeDetails($event:Recipe){this.onRecipeSelected.emit($event)}
  ngOnInit(): void {}
}
